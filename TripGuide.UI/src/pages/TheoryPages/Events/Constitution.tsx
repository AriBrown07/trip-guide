import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const ConstPage = () => {
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
              Принятие Конституции Речи Посполитой
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1791 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Первая конституция в Европе была принята 3 мая 1791 года четырехлетним сеймом Речи Посполитой.
              Конституция стала первым в Европе и вторым, после США, в мире главным кодексом законов, который
              разделял власть на три ветви: судебную, исполнительную и законодательную и был утвержден письменно.
              Этот законодательный акт имел исключительное значение для государства, в состав которой в то время
              входили белорусские земли.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Юридическими предпосылками принятия конституции 1791 года стали три статута Великого княжества
              Литовского, последний из которых, 1588 года, по мнению историков, стал причиной потери юридической
              силы многих постановлений Люблинской унии. Ученые считают время принятия Статута ВКЛ 1588 всплеском
              независимости государства.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Сейм начал свою работу 6 октября 1788 года и просуществовал до 1792 года. Конституцией Речи
              Посполитой была совершена попытка осуществить принцип парламентского управления страной. Для
              своего времени конституция имела исключительное значение, но ее положения не были полностью
              осуществлены из-за бунта реакционных кругов.
            </Typography>

             <Typography variant="body1" className={styles.paragraph}>
              Принятие этого нормативного акта оставило значительный отпечаток на развитии всей последующей
              истории Беларуси. Конституция Речи Посполитой от 3 мая 1791 года расторгла Люблинскую унию, по
              которой Великое княжество Литовское и Королевство Польское было объединенных в единое государство —
              конфедерацию Речь Посполитую. Великое княжество Литовское фактически перестала существовать.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { ConstPage };