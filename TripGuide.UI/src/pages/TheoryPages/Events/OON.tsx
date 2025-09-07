import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const OONPage = () => {
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
              Вступление в ООН
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1945 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Беларусь является учредителем Организации Объединенных Наций и белорусская делегация
              в числе других делегаций, представляющих первоначальных членов Организации, подписала
              в октябре 1945 года в Сан-Франциско Устав ООН. Принятие Беларуси в создаваемую глобальную
              организацию стало признанием международным сообществом вклада, который внес белорусский народ
              в победу над фашизмом во Второй мировой войне. Организация за время существования превратилась
              в авторитетную глобальную универсальную международную межправительственную организацию.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Несмотря на значительно более сложную структуру международных отношений, складывающуюся с
              момента завершения «холодной» войны, ООН продолжает оставаться важнейшей площадкой многосторонней
              дипломатической деятельности.  Участие в работе ООН и системы ее органов и спецучреждений позволяет
              Республике Беларусь активно задействовать возможности международного сообщества на решении
              транснациональных современных проблем от сохранения мира и безопасности до устойчивого развития.
              Активность Беларуси в ООН носит объединительный характер, а отстаиваемые нашей страной вопросы прочно
              входят в повестку дня ООН, делают Беларусь узнаваемой на международной арене и способствуют
              поддержанию положительного имиджа страны.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Это реализуется через ряд инструментов, среди которых основным является продвижение в ООН
              крупных белорусских внешнеполитических инициатив, таких, как признание многообразия путей
              прогрессивного развития, создание глобальных партнерств, противодействие торговле людьми и
              других. Все эти инициативы призваны объединить всё международное сообщество для решения
              актуальных транснациональных вызовов, а также для формирования более справедливого мироустройства,
              основанного на общепризнанных принципах Устава ООН и нормах международного права.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { OONPage };