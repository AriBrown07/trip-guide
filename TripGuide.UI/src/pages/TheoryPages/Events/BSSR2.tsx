import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const BSSR2Page = () => {
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
              Провозглашение независимости БССР
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1991 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Во второй половине 1980-х гг., на фоне процесса перестройки и демократизации общества,
              активизируется национальное движение, выступавшее за государственный суверенитет республик.
              Государственный суверенитет представляет из себя независимость и самостоятельность в
              осуществлении внутренней и внешней политики.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Первым шагом к оформлению государственного суверенитета станет принятие Верховным Советом
              БССР 27 июля 1990 г. «Декларации о государственном суверенитете Белорусской Советской
              Социалистической Республики». БССР провозглашалась суверенным государством, но при этом
              из состава СССР не выходила.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              	19 августа 1991 г. в Москве частью руководства КПСС и военными будет предпринята попытка
                военного путча с целью отстранения от власти М. С. Горчабева. Путч провалиться, а процесс
                оформления суверенитета и независимости республик – ускорится. 25 августа 1991 г. будет
                принят Закон «О придании статуса конституционного закона Декларации Верховного Совета БССР
                о государственном суверенитете Белорусской Советской Социалистической Республики Беларусь».
                Это привело к тому, что центральная власть СССР больше не могло напрямую вмешиваться в дела
                БССР. Уже 19 сентября Верховный Совет БССР примет решение переименовать Белорусскую СССР в
                Республику Беларусь. 18 октября 1991 г. будет принят Закон «О гражданстве Республики Беларусь».
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              8 декабря 1991 г. в Беловежской пуще президентом Российской Федерации Борисом Николаевичем
              Ельциным, Президентом Украины Леонидом Макаровичем Кравчуком и Председателем Верховного Совета
              Республики Беларусь Станиславом Станиславовичем Шушкевичем будут подписаны «Беловежские соглашения»,
              заявившие о прекращении существования СССР. Подписывался договор о создании Союза Независимых
              Государств (СНГ), куда уже входили независимые государства. 25 декабря 1991 г. Президент СССР Михаил
              Сергеевич Горбачев подал в отставку, что означало окончательное прекращение существования СССР.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { BSSR2Page };