import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Statut3Page = () => {
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
              Принятие III Статута ВКЛ
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1588 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Ученые и государственные деятели Великого княжества Литовского (О.Б.Волович, Л.И.Сапега и др.)
              разработали уникальный памятник правовой культуры и мысли белорусского народа – Статут Великого
              княжества Литовского 1588 г. 1, который на протяжении более 250 лет действовал на территории
              Беларуси, а также на территории других европейских государств. В XVІ ст. текст Статута Великого
              княжества Литовского 1588 г. был сразу напечатан в Виленской типографии на старобелорусском языке
              (государственный язык Великого княжества Литовского).
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Статут 1588 г. имел значительные преимущества перед своими предшественниками. В нем получили более
              четкое отражение государственно-правовые идеи того времени, основы общественного и государственного
              строя, а также некоторые идеи, развиваемые идеологами Возрождения и Реформации. Основное государственно-
              правовое значение Статута 1588 г. заключалось в том, что он, вопреки акту Люблинской унии 1569 г.,
              законодательно оформил сохранение Великого княжества Литовского как самостоятельного государства.
              Составители Статута не внесли в него ни одной нормы, которая могла бы быть использована во вред
              государственной самостоятельности. Идеи гуманизма нашли отражение также и в нормах уголовного и
              гражданского права.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Статут 1588 г. состоит из 14 разделов, в которых содержится 487 статей. В Статут 1588 г. вошли нормы
              государственного (конституционного) права, чего в то время не было в законодательной практике других
              государств, а также административного, военного, судебно-процессуального, брачно-семейного и опекунского,
              наследственного, земельного, лесного и охотничьего, уголовного права. В основу систематизации норм права
              положены новые, характерные для переходного периода от средневековья к новому времени принципы: ограничение
              власти государя; разделение правомочий, в результате которого законодательная власть закреплялась за сеймом,
              исполнительная – за великим князем и радой, судебная – за судами; единство права для всего государства и
              всех полноправных людей в зависимости от социальных групп населения; приоритет писаного права.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Все нормы Статута проникнуты идеей установления правового государства, в котором деятельность всех
              государственных органов и должностных лиц должна полностью соответствовать праву. Провозглашение
              идеи правового государства в то время свидетельствовало о возникновении новой государственно-правовой
              теории, которая больше всего проявилась в нормах государственного (конституционного) права, где отражен
              государственный суверенитет, общественный и государственный строй, основные права и обязанности населения,
              главные принципы судебной системы.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Издание Статута 1588 г. имело важное значение для развития в будущем правовой истории Беларуси, а
              также истории других государств. Статут 1588 г. переведен на русский, польский, украинский, немецкий,
              французский языки. Статут 1588 г. использовался при подготовке Соборного уложения 1649 г. После
              присоединения Беларуси к Российской империи Статут продолжал действовать в Витебской и Могилевской
              губерниях до 1831 г., в Виленской, Гродненской и Минской – до 1840 г.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Statut3Page };