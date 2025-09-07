import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Nikolay2Page = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const scrollTimeline = (direction: 'left' | 'right') => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* Шапка */}
      <header className={styles.header}>
        <Link to="/home">
          <IconButton className={styles.homeButton} aria-label="На главную">
            <img src={homeIcon} alt="На главную" className={styles.homeIcon} />
          </IconButton>
        </Link>
        <Typography variant="h1" className={styles.headerTitle}>
          События в истории Беларуси
        </Typography>
      </header>

      {/* Основное содержимое */}
      <main className={styles.mainContent}>
        {/* Горизонтальная лента времени */}
        <div className={styles.timelineContainer}>
          <IconButton
            className={styles.timelineArrow}
            onClick={() => scrollTimeline('left')}
          >
            <ChevronLeft />
          </IconButton>

          <div className={styles.timelineWrapper} ref={timelineRef}>
            <div className={styles.timeline}>
              {timelineEvents.map((event, index) => (
                <Tooltip
                  key={index}
                  title={
                    <Box sx={{ p: 1 }}>
                      {event.events.map((item, itemIndex) => (
                        <Box
                          key={itemIndex}
                          sx={{
                            mb: 1,
                            cursor: item.link ? "pointer" : "default",
                            "&:hover": {
                              backgroundColor: item.link ? "rgba(0, 0, 0, 0.05)" : "transparent"
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation(); // Чтобы не срабатывал клик по маркеру
                            if (item.link) navigate(item.link);
                          }}
                        >
                          <Typography variant="body2" sx={{ fontFamily: "Huninn", fontWeight: "bold", color: "#5c3a21" }}>
                            {item.title}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  }
                  placement="bottom"
                  arrow
                >
                  <div className={styles.timelineMarker}>
                    {event.year}
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>

          <IconButton
            className={styles.timelineArrow}
            onClick={() => scrollTimeline('right')}
          >
            <ChevronRight />
          </IconButton>
        </div>

        <div className={styles.textBlock}>
          <div className={styles.scrollableContent}>
            <Typography variant="h2" className={styles.figureName}>
              Отречение Николая II от престола
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1917 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Николай II взошёл на престол после смерти своего отца императора Александра III 20 октября
              (1 ноября) 1894 г. Царствование Николая II проходило в обстановке нараставшего революционного
              движения. В начале 1905 г. в России вспыхнула революция, вынудившая императора провести ряд реформ.
              17 (30) октября 1905 г. царь подписал Манифест «Об усовершенствовании государственного порядка»,
              даровавший народу свободы слова, печати, личности, совести, собраний, союзов. 23 апреля (6 мая)
              1906 г. императором была утверждена новая редакция «Основных государственных законов Российской
              империи», которые в преддверии созыва Государственной думы, являлись фундаментальным законодательным
              актом, регулирующим разделение полномочий между императорской властью и организованным по Манифесту
              17 октября 1905 г. парламентом (Государственным советом и Государственной думой).
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В 1914 г. Россия вступила в Первую мировую войну. Неудачи на фронтах, экономическая разруха,
              порождённая войной, обострение нужды и бедствий народных масс, рост антивоенных настроений и 
              всеобщее недовольство самодержавием, привели к массовым выступлениям против правительства и
              династии. 23 февраля (8 марта) 1917 г. работницы Петрограда вышли на демонстрацию с требованиями
              хлеба и прекращения войны. Через несколько дней массовые забастовки на столичных заводах переросли
              во всеобщую политическую стачку, а затем в стихийное вооружённое восстание (Февральская революция 1917).
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              25 февраля (10 марта) 1917 г. Николай II отправил генералу С. С. Хабалову телеграмму с
              требованием пресечь беспорядки военной силой, а 27 февраля (12 марта) направил в Петроград
              для подавления восстания генерала Н. И. Иванова. 1 (14) марта, после неудачной попытки
              проехать в Царское Село, император прибыл в Псков в штаб Северного фронта.
            </Typography>

             <Typography variant="body1" className={styles.paragraph}>
              Утром 2 (15) марта генерал Н. В. Рузский доложил Николаю II, что миссия Н. И. Иванова
              не удалась. В это же время, Председатель Государственной Думы М. В. Родзянко заявил по
              телеграфу, что сохранение династии Романовых возможно при условии передачи трона наследнику
              Алексею при регентстве младшего брата Николая II — Михаила.  На вопрос о желательности отречения
              Николая II положительно ответили все командующие фронтами, за исключением командующего Черноморским
              флотом адмирала А. В. Колчака. Получив ответы главнокомандующих, около 15 часов 2 (15) марта
              Николай II принял решение отречься от престола в пользу сына при регентстве брата великого князя
              Михаила Александровича.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Однако после разговора с лечащим врачом наследника С. П. Фёдоровым, который подтвердил,
              что болезнь Алексея неизлечима, опасаясь за здоровье сына, император изменил решение.
              Вечером 2 (15) марта, когда из Петрограда приехали представители Временного Комитета
              Государственной Думы А. И. Гучков и В. В. Шульгин, Николай II заявил, что «...во имя блага
              и спасения России я был готов отречься от престола в пользу своего сына, но... пришёл к
              заключению, что ввиду его болезненности мне следует отречься одновременно и за себя и за него».
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В манифесте об отречении, переданном А. И. Гучкову, было написано «…Заповедуем Брату Нашему
              (Михаилу Александровичу) править делами государственными в полном и ненарушимом единении с
              представителями народа в законодательных учреждениях на тех началах, кои будут ими установлены,
              принеся в том ненарушимую присягу».
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              На следующий день, 3 (16) марта 1917 г., Михаил Александрович отрёкся от престола, передав
              решение вопроса об образе правления Учредительному собранию.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Nikolay2Page };