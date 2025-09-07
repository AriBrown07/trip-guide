import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const UNESCOPage = () => {
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
              Вступление в ЮНЕСКО
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1954 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              ЮНЕСКО, Организация Объединенных Наций по вопросам образования, науки и культуры, была
              создана сразу после Второй мировой войны, 16 ноября 1945 года, как площадка для диалога
              наций в духе терпимости, взаимоуважения и сотрудничества.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              За три четверти века пройден длинный путь становления и развития. Если на первой сессии
              Генеральной конференции ЮНЕСКО в 1946 году было 30 государств, на 40-й сессии в 2019
              году – 187 стран и многочисленные наблюдатели.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В 1962 году был назначен первый постоянный представитель Беларуси при ЮНЕСКО.
              Им стал Борис Васильевич Кудрявцев.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Начиная с этого времени, Беларусь играет активную роль в деятельности организации. Беларусь
              пять раз избиралась в руководящий орган ЮНЕСКО – Исполнительный совет. В настоящее время
              наша страна также является членом Исполнительного совета, постоянно участвует в работе этого органа.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              ЮНЕСКО, будучи активным членом семьи Организации Объединенных Наций, прилагает максимум
              усилий для содействия государству в достижении Целей устойчивого развития, принятых главами
              государств и правительств в 2015 году на 70-й сессии Генеральной ассамблеи ООН.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              С учетом мандата ЮНЕСКО приоритетные цели – это прежде всего инклюзивное и качественное
              образование для всех, охрана культурного наследия и борьба с незаконным оборотом культурных
              ценностей и преодоление кризиса в области естественнонаучного, технического, инженерного и
              математического образования. В последнее время важной темой стал искусственный интеллект
              и его все возрастающая роль в мире.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { UNESCOPage };