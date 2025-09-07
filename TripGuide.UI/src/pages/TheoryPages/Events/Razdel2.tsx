import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Razdel2Page = () => {
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
              Второй раздел Речи Посполитой
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1793 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Осуществлён в 1793 г. Российской империей и Пруссией в сговоре с консервативной аристократией Речи
              Посполитой, недовольной реформами Четырёхлетнего сейма 1788-1792 гг. и Конституцией 3 мая 1791 г.
              Оппозиция создала Тарговицкую конфедерацию (1792 г.) и просила у Екатерины II помощи в восстановлении
              предсеймовой системы кардинальных прав.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              11 мая 1792 г. Екатерина II ввела на территорию Беларуси и Украины 73-тысячное войско. 23 января
              1793 г. Россия и Пруссия заключили в Петербурге тайную конвенцию о ликвидации Конституции 3 мая и
              о совместном подавлении вооружённого сопротивления со стороны Речи Посполитой, провозгласив 27 марта
              1793 г. акты о разделе. Пруссия аннексировала часть Мазовии, Краковское воеводство, почти всю Великую
              Польшу, города Гданьск, Торунь, Россия – Правобережную Украину, части Полоцкого, Минского воеводств,
              Оршанского повета, часть Новогрудского, Брестского и Виленского воеводств с Борисовом, Минском, Слуцком,
              Несвижем, Туровом, Пинском.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Король польский и великий князь Великого Княжества Литовского Станислав Понятовский был вынужден
              поддержать Генеральную конфедерацию и созвать Гродненский сейм 1793 г., который ратифицировал
              трактаты с Россией и Пруссией.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Razdel2Page };