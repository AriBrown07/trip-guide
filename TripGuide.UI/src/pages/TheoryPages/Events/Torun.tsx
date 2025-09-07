import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const TorunPage = () => {
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
              Первый Торуньский мир
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1 февраля 1411 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              1 февраля 1411 года в городе Торунь на севере Польши был подписан мирный договор между Тевтонским
              орденом с одной стороны и Королевством Польским и Великим княжеством Литовским — с другой. Первый
              Торуньский мир завершил Великую войну 1409—1411 годов.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Несмотря сокрушительное поражение при Грюнвальде, Тевтонский орден смог удержать свои основные
              территории благодаря умелой дипломатии и обороне своих крепостей. Условия Первого Торуньского мира
              были относительно мягкими для ордена, что вызвало недовольство среди победителей. Основные положения
              договора включали:
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              1. Территориальные уступки: Тевтонский орден возвращал Польше и Литве некоторые спорные территории,
              включая Жемайтию (Самогитию), которая переходила под контроль Великого княжества Литовского.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              2. Выплата контрибуции: Орден обязался выплатить Польше и Литве значительную сумму денег в качестве
              компенсации за военные расходы.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
             3. Освобождение пленных: Все пленные, захваченные во время войны, должны были быть освобождены.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              4. Признание прав: Тевтонский орден признавал права Польши и Литвы на спорные территории.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Первый Торуньский мир не решил всех противоречий между сторонами. Тевтонский орден, хотя и ослабленный,
              сохранил свою государственность и продолжил борьбу за влияние в регионе. Польша и Литва, несмотря на
              победу, не смогли полностью реализовать свои территориальные амбиции. Это привело к дальнейшим конфликтам,
              включая Тринадцатилетнюю войну (1454–1466), которая завершилась Вторым Торуньским миром.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { TorunPage };