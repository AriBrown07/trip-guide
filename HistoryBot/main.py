import os
import sqlite3
import logging
from datetime import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from g4f.client import Client
from fastapi.responses import JSONResponse

# Подготовка путей к папкам
base_dir = os.path.dirname(__file__)
db_dir = os.path.abspath(os.path.join(base_dir, "../Databases"))
log_dir = os.path.abspath(os.path.join(base_dir, "../Logs"))

os.makedirs(db_dir, exist_ok=True)
os.makedirs(log_dir, exist_ok=True)

# Пути к файлам
DB_PATH = os.path.join(db_dir, "history_bot.db")
LOG_PATH = os.path.join(log_dir, "history_bot.log")

# 📝 Настройка логгера
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOG_PATH, mode='a', encoding='utf-8'),
        logging.StreamHandler()
    ]
)
log = logging.getLogger(__name__)

# Инициализация FastAPI и g4f-клиента
app = FastAPI()
client = Client()

# Системный prompt
HISTORICAL_PROMPT = """
Ты — высококвалифицированный историк и рассказчик с глубокими знаниями в области мировой истории. Твоя задача — подробно и понятно рассказывать об исторических событиях, эпохах, важных личностях и местах, где эти события происходили. Ты работаешь в режиме бесконечного диалога: каждый новый вопрос пользователя ты воспринимаешь как продолжение предыдущего общения, учитывая контекст истории.

Твои ответы должны отвечать следующим требованиям:

1. Точность и достоверность. Используй только проверенные исторические факты и данные, избегай домыслов.
2. Полнота и структура. Сначала кратко вводи в тему, обозначай ключевые моменты, затем подробно раскрывай детали — даты, причины, следствия, ключевых участников и места.
3. Исторический контекст. Объясняй значимость события для своего времени и последствия.
4. Описание мест. Если речь о месте, опиши географию, историческую значимость и современное состояние.
5. Доступность и интерес. Пиши простым, понятным языком для широкой аудитории.
6. Объективность. Не выражай личных мнений или предположений.
7. Если вопрос общий или неясный, проси уточнить тему, период или регион.
8. Добавляй интересные факты и культурные аспекты, чтобы лучше понять эпоху.
9. Поддерживай структуру и избегай длинных списков.
10. Всегда учитывай контекст предыдущих сообщений, если они есть, и продолжай диалог логично и последовательно.
"""

# Pydantic-модель запроса
class ChatRequest(BaseModel):
    user_id: str
    prompt: str

# Инициализация базы данных
def init_db():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                role TEXT CHECK(role IN ('user', 'assistant')) NOT NULL,
                content TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        conn.close()
        log.info("База данных успешно инициализирована: %s", DB_PATH)
    except Exception as e:
        log.exception("Ошибка при инициализации базы данных")

# Сохранение сообщения
def save_message(user_id: str, role: str, content: str):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO messages (user_id, role, content, timestamp)
            VALUES (?, ?, ?, ?)
        ''', (user_id, role, content, datetime.now()))
        conn.commit()
        conn.close()
        log.info("Сохранено сообщение [%s] от пользователя '%s'", role, user_id)
    except Exception as e:
        log.exception("Ошибка при сохранении сообщения [%s] от '%s'", role, user_id)

# Загрузка истории сообщений
def load_messages(user_id: str):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('SELECT role, content FROM messages WHERE user_id = ? ORDER BY timestamp', (user_id,))
        rows = cursor.fetchall()
        conn.close()
        log.info("Загружен контекст общения с пользователем '%s', сообщений: %d", user_id, len(rows))
        messages = [{"role": "system", "content": HISTORICAL_PROMPT}]
        for role, content in rows:
            messages.append({"role": role, "content": content})
        return messages
    except Exception as e:
        log.exception("Ошибка при загрузке истории для '%s'", user_id)
        return [{"role": "system", "content": HISTORICAL_PROMPT}]

# POST /chat
@app.post("/chat")
async def chat(request: ChatRequest):
    user_id = request.user_id.strip()
    prompt = request.prompt.strip()

    if not user_id or not prompt:
        log.warning("Некорректный запрос: отсутствует user_id или prompt")
        raise HTTPException(status_code=400, detail="Missing user_id or prompt")

    try:
        log.info("Получен запрос от '%s': %s", user_id, prompt)

        save_message(user_id, "user", prompt)
        messages = load_messages(user_id)

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            web_search=False
        )

        reply = response.choices[0].message.content
        log.info("Ответ модели для '%s': %s", user_id, reply.strip()[:100] + "..." if len(reply) > 100 else reply)

        save_message(user_id, "assistant", reply)
        return JSONResponse(content={"reply": reply})

    except Exception as e:
        log.exception("Ошибка при обработке запроса от '%s'", user_id)
        return JSONResponse(status_code=500, content={"error": str(e)})

# Инициализация БД при запуске
init_db()
