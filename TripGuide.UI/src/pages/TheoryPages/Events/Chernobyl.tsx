import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const ChernobylPage = () => {
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
              Авария на Чернобыльской АЭС
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (26 апреля 1986 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              26 апреля 1986 года во время ненадлежащим образом проводимых испытаний на малой мощности
              произошла потеря управления реактором четвертого энергоблока на Чернобыльской АЭС, находившейся
              на территории бывшего Советского Союза, что привело к взрыву и пожару, в результате которых
              здание реактора было разрушено, а в атмосферу были выброшены значительные количества радионуклидов.
              Поскольку меры безопасности перед испытаниями приняты не были, урановое топливо в реакторе
              перегрелось и расплавило защитные барьеры.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В сжатые сроки после аварии МАГАТЭ оказало Советскому Союзу оперативную помощь в таких
              областях, как восстановление окружающей среды, вывод из эксплуатации и обращение с
              радиоактивными отходами, что позволило повысить уровень безопасности на станции. МАГАТЭ
              тесно сотрудничало с другими организациями системы Организации Объединенных Наций по линии
              Международного чернобыльского проекта, в рамках которого была проведена оценка радиологических
              последствий аварии и определены защитные меры. Итоги этой работы были представлены на состоявшейся
              в апреле 1996 года международной конференции «Десятилетие после Чернобыля: оценка последствий аварии».
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Вскоре после аварии на Чернобыльской АЭС МАГАТЭ разработало две конвенции, которые были
              ратифицированы государствами-членами: Конвенцию об оперативном оповещении о ядерной аварии
              и Конвенцию о помощи в случае ядерной аварии или радиационной аварийной ситуации, которые
              закладывают международную правовую основу для оповещения о чрезвычайных ситуациях, обмена
              информацией и оказания международной помощи по запросу. Эти конвенции уполномочивают МАГАТЭ
              действовать в качестве международного центра, координирующего мероприятия такого рода.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В целях организации восстановительных работ и проведения радиологической оценки пострадавших
              районов в 2003 году МАГАТЭ в сотрудничестве с правительствами наиболее пострадавших стран — Беларуси,
              России и Украины — а также при участии соответствующих международных организаций учредило Чернобыльский
              форум. Результаты этой деятельности были представлены на состоявшейся в 2005 году конференции МАГАТЭ
              «Чернобыль: взгляд назад ради пути вперед».
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { ChernobylPage };