import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const PolockPage = () => {
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