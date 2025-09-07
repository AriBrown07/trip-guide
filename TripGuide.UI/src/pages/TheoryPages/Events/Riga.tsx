import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const RigaPage = () => {
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
              Рижский мирный договор
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1921 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              18 марта 1921 г. в Риге между Российской и Украинской Советскими Социалистическими
              Республиками (РСФСР и УССР), с одной стороны, и Польшей с другой, был подписан мирный
              договор, завершивший советско-польскую войну 1919-1921 гг.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В ноябре 1918 г., после провозглашения независимости Польши, возник вопрос о границах
              нового государства. Основной целью польского руководства во главе с Ю. Пилсудским было
              возобновление Польши в исторических границах Речи Посполитой 1772 г. Весной 1919 г. Польша,
              поддержанная странами Антанты, начала наступление вглубь советской территории.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В 1919-1920 гг. правительство РСФСР неоднократно выступало с мирными предложениями.
              Однако польское правительство, пользуясь поддержкой союзников со стороны Антанты, а
              также стремясь выиграть время и использовать сложившуюся в первый период войны обстановку,
              выдвигало тяжёлые для советской власти условия переговоров. 
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В июне-июле 1920 г. войска Красной Армии нанесли противнику серьёзное поражение на
              Юго-Западном и Западном фронтах. Однако ряд ошибок, допущенных советским командованием,
              привёл к неудаче Львовской операции Юго-Западного фронта и поражению войск Западного фронта
              в Варшавском сражении.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              7 августа 1920 г. польское правительство сообщило о готовности начать переговоры, однако
              приступило к ним только спустя десять дней, когда польские войска уже начали контрнаступление.
              Советская сторона, добиваясь скорейшего заключения мира, пошла на уступки и согласилась в пользу
              Польши на отклонение от «линии Керзона», которая в декабре 1919 г. была рекомендована Верховным
              советом Антанты в качестве восточной границы Польши. 12 октября 1920 г. в Риге были заключены
              предварительные условия мирного договора. Через неделю военные действия были прекращены.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              После 5-месячных переговоров был подписан Рижский мирный договор, официально объявивший о
              прекращении войны. Советско-польская граница устанавливалась значительно восточнее «линии Керзона».
              К Польше по мирному договору отходили западные земли Украины и Белоруссии. Обе стороны обязались
              уважать государственный суверенитет друг друга, взаимно отказывались от вмешательства во внутренние
              дела, от враждебной пропаганды, обязывались не допускать на своих территориях образования и пребывания
              организаций и групп, деятельность которых могла быть направлена против другой стороны. Польша также
              обязывалась предоставить русским, украинцам и белорусам в Польше все права, обеспечивающие свободное
              развитие культуры, языка и исполнение религиозных обрядов; те же права предоставлялись полякам на
              территории РСФСР и Украины. Обе стороны взаимно отказывались от требования возмещения расходов и
              убытков, связанных с ведением войны. Каждая из сторон предоставляла гражданам другой стороны полную
              амнистию за политические преступления.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              РСФСР и УССР согласились возвратить Польше различные военные трофеи, все научные и культурные
              ценности, вывезенные с территории Польши, начиная с 1 января 1772 г. Польша освобождалась от
              ответственности за долги и иные обязательства бывшей Российской империи.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { RigaPage };