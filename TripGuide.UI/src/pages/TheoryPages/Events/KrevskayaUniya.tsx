import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const UniyaPage = () => {
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
              Кревская уния
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1385 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              14 августа 1385 года была заключена Кревская уния. Кревская уния 1385 — личная уния между
              Великим княжеством Литовским и Польшей, по которому литовский великий князь Ягайло, вступивший
              в брак с польской королевой Ядвигой, провозглашался польским королём.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Кревская уния была подписана 14 августа 1385 года в замке Крево (территория Сморгонского района
              современной Белоаруси). Вследствие этого Ягайло взял на себя ряд обязательств: присоединить к
              Польше подвластные ему литовские и русские земли; перейти в католицизм и обратить к нему всех
              своих братьев, бояр, народ; присоединить к Польскому Королевству все земли, которые были у него
              отторгнуты; вернуть свободу всем польским христианам, куда-либо переселённым по праву войны;
              выплатить бывшему жениху Ядвиги (Вильгельм (герцог Австрии)) 200 тыс. в качестве компенсации
              за нарушение брачного соглашения.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Войска, законодательство и судебная система, а также казна (включая денежную эмиссию) оставались
              раздельными, сохранялась и граница между государствами с взиманием таможенных сборов.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Крестоносцы не признали крещения Ягайло и Литвы и объявили его показушным, однако христианизация
              Великого княжества Литовского тронулась с места.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Подписание Кревской унии, хотя и вызвало волну недовольства существенной части литовско-русской знати,
              стало этапом к прекращению борьбы между двумя государствами за юго-западные русские земли (последний
              этап войны за галицко-волынское наследство происходил в форме подавления совместными польско-литовскими
              усилиями самостоятельности князя Фёдора Любартовича) и способствовало расширению их границ до побережья
              Чёрного моря.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Условия Кревской унии (в 1401 году их уточнила Виленско-Радомская уния) действовали на протяжении 184 лет,
              вплоть до 1569 года, когда Великое Княжество Литовское и Королевство Польское подписали Люблинскую унию,
              объединившую оба государства в конфедеративную ограниченную выборную монархию. Также одним из последствий
              Кревской унии было получение католическими феодалами дополнительных прав и вольностей.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { UniyaPage };