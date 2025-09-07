import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Razdel3Page = () => {
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
              Третий раздел Речи Посполитой
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1795 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Осуществлён в 1795 г. Россией, Пруссией и Австрией в результате подавления восстания 1794 г.
              Пруссия оккупировала 3 июня 1794 г. Краков с воеводством, на что претендовала Австрия. Последняя
              в ответ 15-30 июня 1794 г. захватила Сандомирское воеводство и Хелмскую землю, что привело к
              территориальным спорам. Захват А. Суворовым Варшавы (4 октября 1794 г.) и пленение Т. Костюшко
              позволили России диктовать собственные условия раздела. Екатерина II выступила посредником
              урегулирования спорных долей Пруссии и Австрии. Стороны пришли к компромиссу: Пруссия уступала
              Краков Австрии, Россия отдала Варшаву Пруссии.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Трёхстороннюю конвенцию о разделе Речи Посполитой Россия, Пруссия и Австрия подписали 24 октября
              1795 г. в Петербурге. 25 ноября 1795 г. король Польши и великий князь литовский отрёкся от трона.
              Окончательно территориальные доли раздела трёхсторонняя комиссия утвердила 21 ноября 1796 г.
              Пруссия получила большую часть Мазовецкого воеводства с Варшавой, части Подляшского, Гродненского
              и Трокского воеводств и Жемайтии; Россия – Волынское, Новогрудское, Виленское, часть Жемайтии и
              Брестского, Гродненского, Трокского воеводств с городами Брест, Новогрудок, Гродно, Вильна, Ковно;
              Австрия – Краковское, Сандомирское, Люблинское, части Мазовецкого, Брестского и Подляшского воеводств.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Razdel3Page };