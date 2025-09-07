import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const BNRPage = () => {
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
              Провозглашение БНР
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1918 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              После получения новости о подписании 3 марта 1918 г. Брестского мира, в соответствии с
              которым Германия и Советская Россия, не допустив к участию в переговорах представителей Беларуси,
              поделили между собой белорусские земли,  Исполком Рады 9 марта 1918 г. принял 2-ю Уставную грамоту,
              в которой Беларусь была объявлена Народной Республикой и определены основные принципы государственного
              строя, территория, права и свободы граждан, формы собственности и др.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              18 марта 1918 г. Исполком Рады Всебелорусского съезда был реорганизован в Раду БНР
              как высший законодательный орган государственной власти на территории Беларуси.
              Президиум Рады возглавил Я. Середа.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              25 марта 1918 г. Рада БНР приняла 3-ю Уставную грамоту, которой провозглашалась независимость
              БНР в этнографических границах проживания белорусов. Национальными деятелями в качестве
              государственного флага был принят бело-красно-белый флаг. Вместе с гербом «Погоня» — гербом
              Великого княжества Литовского — он стал государственным символом БНР.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В условиях тяжелой внутренней и внешней ситуации Рада БНР пробовала реализовать независимость
              государства при помощи внешних сил, что было ее ошибкой. 25 апреля 1918 г. она направила
              телеграмму германскому кайзеру Вильгельму II, в которой высказывалась благодарность "за
              освобождение Беларуси немецкими войсками из-под тяжелого гнета чужого господствующего
              издевательства и анархии. Только под защитой Германской империи видит край свою добрую судьбу
              в будущем" — отмечалось в телеграмме. Но руководство Германии официально БНР не признало.
              Телеграмма кайзеру вызвала политический кризис в Раде БНР из состава которой вышли ряд
              организаций, а также произошел раскол в Белорусской социалистической громаде.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В полном смысле слова БНР государством не являлось. Реализация идеи создания Белорусской
              Народной Республики потерпела поражение по ряду причин:
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Несмотря на определенные успехи Рады БНР в развитии культуры и образования, в целом создать
              полноценную функционирующую систему органов власти  в условиях оккупации было невозможно.
              На оккупированной территории Беларуси основные вопросы государственного уровня фактически
              решались не Радой и Народным секретариатом БНР, а германской военной администрацией;
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              БНР не осуществляла своих полномочий на всей территории проживания белорусов, не имела
              собственной армии, органов власти на местах, финансовой и судебной системы;
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              БНР не получила надлежащего международного признания. Были созданы представительсва в
              ряде стран: Литва, Латвия, Эстония и др. Однако Германия, Советская Россия или страны
              Антанты БНР не признали. Функции правительства БНР ограничивались половинчатыми полномочиями
              национального представительства при германской оккупационной администрации и решением под
              контролем немцев задач в области культуры и образования.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Таким образом, о БНР можно говорить как о попытке создания белорусской национальной
              государственности на буржуазной основе. В декабре 1918 г. с освобождением Минска от
              германских войск Рада БНР вынуждена была переехать из Минска в Гродно.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { BNRPage };