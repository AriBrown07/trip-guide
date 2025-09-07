import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const OctoberPage = () => {
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
              Октябрьская революция
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1917 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Октябрьская революция  1917 года - одно из крупнейших политических событий XX века,
              повлиявшее на дальнейший ход всемирной истории. К власти при­шли боль­ше­ви­ки, ста­вив­шие
              в пер­спек­ти­ве за­да­чу по­строе­ния со­циа­ли­стического об­ще­ст­ва, а за­тем его даль­ней­ше­го
              пре­об­ра­зо­ва­ния на ком­му­ни­стических на­ча­лах. Революция явилась глубоким переворотом в
              идеологии, экономике и устройстве государства в целом, что повлияло не только на ход
              истории России, но и всего мира. Победе большевиков способствовали такие факторы, как
              умело налаженная агитация, проводимая ими политика по дискредитации Временного правительства,
              радикализация масс, возрастание авторитета большевиков. Все эти факторы позволили им использовать
              наиболее благоприятную ситуацию для захвата власти. Основная масса населения поддержала новую
              власть, так как первыми шагами стало объявление о немедленной передаче земли в пользование
              крестьянам, о прекращении войны и созыве Учредительного собрания.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В ноябре (декабре) 1917 г. в Минске был создан Областной исполнительный комитет Советов рабочих,
              солдатских и крестьянских депутатов Западной области и фронта как высший орган Советской власти
              на территории Беларуси. Под руководством советских и партийных организаций осуществлялись
              революционные преобразования: проводилась национализация банков и промышленности, устанавливался
              рабочий контроль над производством и распределением продуктов, вводился 8-часовой рабочий день,
              конфисковывались помещичьи земли и создавались первые коллективные хозяйства крестьян, расширялась
              сеть школьных учреждений, вводилось бесплатное образование, разворачивалась работа по ликвидации
              безграмотности среди взрослого населения.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { OctoberPage };