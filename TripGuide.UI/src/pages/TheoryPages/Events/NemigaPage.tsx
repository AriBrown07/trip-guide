import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';

const NemigaPage = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const timelineEvents = [
    {
      year: '862',
        events: [
        {
            title: "Первое упоминание Полоцка",
            link: "/polock",
        },
        ],
    },
    {
      year: '980',
        events: [
        {
            title: "Первое упоминание Турова",
            link: "/none",
        },
        ],
    },
    {
        year: "988",
        events: [
        {
            title: "Крещение Руси",
            link: "/none",
        },
        ],
    },
    {
      year: '1067',
        events: [
        {
            title: "Битва на Немиге",
            link: "/nemiga",
        },
        {
            title: "Первое упоминание Менска",
            link: "/none",
        },
        ],
    },
    {
      year: '1102',
        events: [
        {
            title: "Основание Борисова",
            link: "/none",
        },
        ],
    },
    {
      year: '1385',
        events: [
        {
            title: "Кревская уния",
            link: "/none",
        },
        ],
    },
    {
      year: '1410',
        events: [
        {
            title: "Грюнвальдская битва",
            link: "/none",
        },
        ],
    },
    {
      year: '1411',
        events: [
        {
            title: "Торуньский мир",
            link: "/none",
        },
        ],
    },
    {
      year: '1529',
        events: [
        {
            title: "Принятие I Статута ВКЛ",
            link: "/none",
        },
        ],
    },
    {
      year: '1566',
        events: [
        {
            title: "Принятие II Статута ВКЛ",
            link: "/none",
        },
        ],
    },
    {
      year: '1569',
        events: [
        {
            title: "Люблинская уния",
            link: "/none",
        },
        ],
    },
    {
      year: '1588',
        events: [
        {
            title: "Принятие III Статута ВКЛ",
            link: "/none",
        },
        ],
    },
    {
      year: '1596',
        events: [
        {
            title: "Берестейская церковная уния",
            link: "/none",
        },
        ],
    },
    {
      year: '1772',
        events: [
        {
            title: "Первый раздел Речи Посполитой",
            link: "/none",
        },
        ],
    },
    {
      year: '1791',
        events: [
        {
            title: "Принятие Конституции Речи Посполитой",
            link: "/none",
        },
        ],
    },
    {
      year: '1793',
        events: [
        {
            title: "Второй раздел Речи Посполитой",
            link: "/none",
        },
        ],
    },
    {
      year: '1794',
        events: [
        {
            title: "Восстание под руководством Т. Костюшко",
            link: "/none",
        },
        ],
    },
    {
      year: '1795',
        events: [
        {
            title: "Третий раздел Речи Посполитой",
            link: "/none",
        },
        ],
    },
    {
      year: '1812',
        events: [
        {
            title: "Вторжение армии Наполеона",
            link: "/none",
        },
        ],
    },
    {
      year: '1863',
        events: [
        {
            title: "Восстание под руководством К. Калиновского",
            link: "/none",
        },
        ],
    },
    {
      year: '1903',
        events: [
        {
            title: "Формирование 'Громады'",
            link: "/none",
        },
        ],
    },
    {
      year: '1906',
        events: [
        {
            title: "Столыпинская аграрная реформа",
            link: "/none",
        },
        ],
    },
    {
      year: '1917',
        events: [
        {
            title: "Отречение Николая II от престола",
            link: "/none",
        },
        {
            title: "Октябрьская революция",
            link: "/none",
        },
        ],
    },
    {
      year: '1918',
        events: [
        {
            title: "Брест-Литовский договор",
            link: "/none",
        },
        {
            title: "Провозглашение БНР",
            link: "/none",
        },
        ],
    },
    {
      year: '1919',
        events: [
        {
            title: "Провозглашение БССР",
            link: "/none",
        },
        ],
    },
    {
      year: '1921',
        events: [
        {
            title: "Рижский мирный договор",
            link: "/none",
        },
        ],
    },
    {
      year: '1939',
        events: [
        {
            title: "Присоединение Западной Беларуси",
            link: "/none",
        },
        ],
    },
    {
      year: '1941',
        events: [
        {
            title: "Великая Отечественная война",
            link: "/none",
        },
        ],
    },
    {
      year: '1945',
        events: [
        {
            title: "Вступление в ООН",
            link: "/none",
        },
        ],
    },
    {
      year: '1954',
        events: [
        {
            title: "Вступление в ЮНЕСКО",
            link: "/none",
        },
        ],
    },
    {
      year: '1986',
        events: [
        {
            title: "Авария на Чернобыльской АЭС",
            link: "/none",
        },
        ],
    },
    {
      year: '1991',
        events: [
        {
            title: "Независимость БССР",
            link: "/none",
        },
        ],
    },
  ];

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
        <IconButton className={styles.homeButton} aria-label="На главную">
          <img src={homeIcon} alt="На главную" className={styles.homeIcon} />
        </IconButton>
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
              Битва на Немиге
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (3 марта 1067 г.)
            </Typography>
            
              <Typography variant="body1" className={styles.paragraph}>
                Битва на реке Немиге 3 марта 1067 года — сражение между войсками полоцкого князя Всеслава
                Чародея из династии Рогволодовичей с войсками Ярославовичей (киевским, черниговским и переяславским князьями).
              </Typography>
              
              <Typography variant="body1" className={styles.paragraph}>
                Причиной столкновения послужили попытки Всеслава захватить Псков и Новгород. Князь Всеслав Чародей
                в 1065 году держал в осаде Псков, а через год напал на Новгород и вывез из Софийского собора колокола
                и многую другую церковную утварь, а часть города сжег. В ответ Ярославичи вторглись в Полоцкое
                княжество и напали на Минск. На вече горожане решили оборонять город. Они укрылись за городскими
                укреплениями, но Ярославичи захватили Минск. Город был разрушен, население взято в плен и частично уничтожено.
              </Typography>
              
              <Typography variant="body1" className={styles.paragraph}>
                Всеслав с дружиной спешил на помощь осажденному Минску, но опоздал. Его войска встретились с войсками
                Ярославичей на берегах Немиги. Войска сошлись возле реки Немиги и 7 дней стояли друг против друга в
                глубоком снегу. Наконец Всеслав Полоцкий начал атаку, и много воинов пало с обеих сторон. О битве на Немиге
                с осуждением высказался автор "Слова о полку Игореве", который описал ее как жестокое побоище: "...на Немиге
                снопы стелют из голов, бьют цепами булатными, на току жизнь кладут, веют душу из тела...". Вместе с
                этими событиями Минск в "Повести временных лет" упоминается четыре раза.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                По итогам битвы летом киевляне пригласили Всеслава Чародея на переговоры в Оршу, гарантировав
                неприкосновенность, но киевский князь Изяслав нарушил клятву, захватил в плен Всеслава и двоих его
                сыновей. В результате восстания киевлян Всеслав был освобожден, и избран на великокняжеский киевский
                престол. Он правил в Киеве всего лишь 7 месяцев, а потом внезапно вернулся в Полоцк.
              </Typography>
            </div>
        </div>
      </main>
    </div>
  );
};

export { NemigaPage };