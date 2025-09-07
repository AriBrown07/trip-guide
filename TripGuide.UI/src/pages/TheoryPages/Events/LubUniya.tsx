import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const LubPage = () => {
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
              Люблинская уния
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1569 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Люблинская уния — государственный союз между Королевством Польским и Великим княжеством
              Литовским, положивший начало единому федеративному государству — Речи Посполитой.
              Rzeczpospolita (польск) - Res Publica (лат) - Общее дело (республика).
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Было создано государство под девизом Si Deus Nobiscum quis contra nos (Если с нами Бог,
              то кто против нас), которое играло значимую роль на мировой арене в течение последующих 200 лет.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Акт унии был заключён 28 июня 1569 года и 1 июля этого года утверждён раздельно депутатами
              польского и литовского сеймов на общем сейме, созванном в Люблине. 4 июля уния была ратифицирована
              королём польским и великим князем литовским Сигизмундом II Августом — последним из Ягеллонов.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Уния не столько укрепила власть монарха (чего и желал Сигизмунд), сколько усилила влияние шляхты,
              увеличив заодно и её численность. Абсолютная монархия, характерная для XVI века так и не сложилась
              (она прийдет на эти земли только к XIX веку на русских штыках).
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Согласно Люблинской Унии оба государства имели одного государя, которого каждый раз должны были
              избирать сообща (без наследственного преемства власти). Был общий сейм и сенат ("паны рада"),
              который ведал общими внутренними делами и политикой. Таможенные границы между Польшей и Литвой
              ликвидировались. К Польше отошли Земли Руские (Украина).
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              За ВКЛ сохранялась государственность в виде собственного права (Статут) и суда, администрации,
              войска, казны и государственного белорусского языка. Польша и Литва имели собственные армии,
              однако объединяли силы защиты общего государства.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Религиозные противоречия в новом государстве были урегулированы Актом Варшавской конфедерации 1573 года.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Уния принималась в условиях Ливонской войны с Московией 1558-83. Рассмотрение вопроса о Люблинской
              унии началось в январе 1569 года на общем сейме. Из-за конфликта интересов — помощь в войне в обмен
              на земли — сейм продолжался с перерывами до августа 1569 года. Знаменитый Атлас Меркатора (1595)
              дает представление о границах ВКЛ до заключения унии.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Люблинская уния одновременно принесла положительный и отрицательный результат для ВКЛ. Положительный
              в военном и политическом плане, так как новообразованное государство Речь Посполитая стала одной из
              самых крупных и могущественных стран Европы, и отрицательный, т.к. была потеряна значительная часть
              своей территории.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { LubPage };