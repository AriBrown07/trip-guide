import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const NapoleonPage = () => {
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
              Вторжение армии Наполеона (Отечественная война)
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1812 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Вторжение наполеоновских войск (около 610 тысяч человек) на российскую территорию произошло
              25 июня 1812 года. Противостоящие им две российские армии (около 240 тысяч человек) с боями
              отступали, уклоняясь от попыток Наполеона втянуть их в сражения и разбить поодиночке. 4 августа
              обе армии соединились у Смоленска. Были отбиты попытки противника развить наступление на
              Санкт-Петербург и Ригу. В ходе Смоленского сражения (17–19 августа) был сорван план Наполеона 
              азгромить основные силы российских войск.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              8 августа главнокомандующим всеми действующими российскими армиями назначен Михаил Кутузов.
              8 сентября произошло Бородинское сражение – крупнейшее сражение Отечественной войны 1812 года.
              14 сентября принято решение оставить Москву. Французские войска вступили в неё 15 сентября,
              в тот же день вспыхнул пожар, уничтоживший почти весь город.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В сентябре–октябре Кутузов прикрыл дороги в южные губернии России, пополнил армию, снабдил
              её вооружением и боеприпасами. Попытки Наполеона I вступить в переговоры были отвергнуты.
              В Москве французы терпели острый недостаток в продовольствии и снаряжении, отряды их фуражиров
              уничтожались партизанами и регулярными войсками.
            </Typography>

             <Typography variant="body1" className={styles.paragraph}>
              19 октября Наполеон I оставил Москву и после сражения при Малоярославце (25 октября) был
              вынужден отступать по разорённой Старой Смоленской дороге, теснимый авангардом российской армии
              и подвергаясь постоянным ударам партизан и казаков с флангов. В сражении при Березине 27–29 ноября
              большая часть армии Наполеона была уничтожена или пленена. В декабре её остатки изгнаны из России.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Заграничные походы российской армии 1813–14 годов завершились взятием Парижа (31 марта 1814 года)
              и падением империи Наполеона I.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { NapoleonPage };