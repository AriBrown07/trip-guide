import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';

const PolockPage = () => {
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
              Первое упоминание Полоцка в письменных источниках
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (862 г.)
            </Typography>
            
              <Typography variant="body1" className={styles.paragraph}>
                Впервые Полоцк упоминается в «Повести временных лет» под 862 годом — с названиями Полтеск,
                Полотьск, Полотеск — «Рюрик раздал мужем свои грады, овому Полоцк». Площадь территории
                города составляла более 8 га и включала городище, повторно заселенное кривичами в VIII веке,
                и неукреплённые поселения на левом и правом берегах Полоты. От гидронима Полота произошло
                название города, которое в переводе с балтских наречий означает «тёмная вода», «болото».
              </Typography>
              
              <Typography variant="body1" className={styles.paragraph}>
                Во второй половине Х в. Полоцк стал столицей первого государственного образования на
                территории современной Беларуси. Во главе Полоцкого княжества стоял князь Рогволод. Его
                внук Изяслав, сын полоцкой княжны Рогнеды и киевского князя Владимира Святославича, стал
                родоначальником полоцкой княжеской династии. С именами Изяслава и Рогнеды связано и
                начало распространения христианства на территории Полоцкого княжества.
              </Typography>
              
              <Typography variant="body1" className={styles.paragraph}>
                Основными занятиями населения города, составлявшего порядка 4-5 тыс. человек, было ремесло
                и торговля. Из ремесел наиболее давние традиции в Полоцке имели кузнечное и литейное дело,
                а также ювелирное мастерство: к концу XI в. насчитывалось около 60 ремесленных специальностей.
                Главной торговой магистралью региона была Западная Двина. Полоцк имел торговые связи со
                Скандинавией, северными и южными княжествами Руси, а также городами Северного Причерноморья.
              </Typography>
            </div>
        </div>
      </main>
    </div>
  );
};

export { PolockPage };