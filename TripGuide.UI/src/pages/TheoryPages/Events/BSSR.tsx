import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const BSSRPage = () => {
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
              Провозглашение БССР
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1919 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Становление белорусской государственности на советской основе происходило в чрезвычайно
              сложных геополитических условиях. Решающим шагом на пути национально-государственного
              самоопределения Беларуси на советской основе явились решения конференции белорусских
              секций РКП(б), состоявшейся 21‑23 декабря 1918 г. в Москве. Конференция признала необходимым
              создание Временного рабоче-крестьянского правительства Беларуси. 30 декабря в Смоленске начала
              работу VI Северо-Западная областная конференция РКП(б), провозгласившая себя I съездом
              Коммунистической партии (большевиков) Беларуси.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Вечером 1 января 1919 г. было сформировано Временное рабоче-крестьянское правительство
              Беларуси во главе с Дмитрием Жилуновичем (Тишка Гартный). В тот же день по радио был
              обнародован Манифест Временного рабоче-крестьянского советского правительства, в котором
              Беларусь провозглашалась свободной независимой Социалистической Республикой, закреплялись
              основные положения ее общественного и политического строя, права и свободы граждан, ставших
              реальными хозяевами своей судьбы. Преодолевая многочисленные трудности и испытания, в конечном
              итоге удалось обеспечить реальное решение вопроса о самоопределении белорусов.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              БССР заложила основы современной белорусской государственности, стала одной из стран ‑ основательниц СССР. 
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { BSSRPage };