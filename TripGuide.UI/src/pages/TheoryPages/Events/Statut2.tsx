import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Statut2Page = () => {
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
              Принятие II Статута ВКЛ
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1566 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Издание Статута Великого княжества Литовского 1566 г. 1 означало новый подъем в развитии
              белорусского права. Статут 1566 г. содержит 14 разделов, 367 статей, включающих нормы всех
              отраслей права: государственного (конституционного), уголовного, военного, брачно-семейного,
              опекунского, административного, лесного и охотничьего, судебно-процессуального и др.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Статут 1566 г. был издан с приложением к нему привилеев 1563, 1564 и 1565 гг., а также
              сеймового постановления 1566 г. о поправке статей Статута. Статут 1566 г. содержал даже
              образцы некоторых юридических документов.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Статут 1566 г. отразил общественно-политические изменения, произошедшие в Великом княжестве
              Литовском в 1530–1560-е гг., закрепил новое административно-территориальное деление, новую
              систему судов, отделение суда от администрации, избираемость судей, принцип единства права
              на всей территории государства и в отношении всех подданных, приоритет писанного закона и
              государственный суверенитет. Новым в уголовном праве явилась попытка законодательно сформулировать
              презумпцию невиновности, также впервые определялся возраст уголовной ответственности – с 14 лет.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Статут был написан на белорусском языке (известно 58 списков), переведен на латинский, польский,
              русский, немецкий языки. Белорусский текст Статута 1566 г. впервые был напечатан в Москве в 1855 г.
              в журнале «Временник Императорского Московского общества истории и древностей Российских».
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              С принятием Статута 1566 г. кодификация и систематизация законодательства Великого княжества
              Литовского в значительной степени определила подобную работу в других государствах. Статут 1566 г.
              действовал на территории Беларуси с 1566 по 1588 гг., а на Правобережной Украине – до XVIII ст.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Statut2Page };