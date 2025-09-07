import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const KalinovskyPage = () => {
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
              Восстание под руководством К. Калиновского
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1863 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Крупнейшим антиправительственным выступлением в царствование Александра II стало восстание
              1863–1864 годов в западной части Российской империи, в польских губерниях, а также на соседних
              с ними белорусских, литовских и украинских территориях. Восстание 1863–1864 в Беларуси было
              подавлено графом Михаилом Муравьёвым — командующим войсками Северо-Западного края.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Северо-западная часть современной Беларуси в середине XIX века входила в состав Виленской
              губернии. В 1858–1861 годах там произошёл Лучайский бунт против крепостных порядков, охвативший
              окрестности города Поставы, расположенного ныне в западной части Витебской области.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В 1861 году в Бресте, Витебске и Гродно прошли манифестации в честь заключения польско-литовской
              Кревской унии в 1385 году. Демонстранты были разогнаны войсками. Центром подготовки восстания с
              конца 1861 года стал город Вильно, где действовал Центральный Национальный Комитет, возглавляемый
              Константином Калиновским. Он планировал передать землю крестьянам и использовать их как движущую силу революции.
            </Typography>

             <Typography variant="body1" className={styles.paragraph}>
              Восстание в белорусских губерниях носило не настолько массовый и ожесточённый характер, как
              в польских землях. Датой его начала считается 20 января 1863 года, когда в белорусскоязычной
              газете «Мужицкая правда» был опубликован призыв Литовского провинциального комитета.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Повстанцы делились на «белых» и «красных» — выразителей интересов помещиков и простонародья.
              Общее число восставших историки оценивают в 70 тыс. человек, из которых 15 тыс. входили в отряд
              повстанцев. Им противостояли регулярные войска, сначала 60 тыс., затем 120 тыс.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Повстанческий генерал Ромуальд Траугутт в апреле 1863 года развернул боевые действия у города
              Кобрина. Единственное крупное сражение с российской армией он провёл у деревни Горки Гродненской
              губернии в мае 1863 года и был в нём разгромлен. В июне 1863 года Траугутт потерпел поражение
              у города Столин и бежал в Варшаву, где в апреле 1864 года был арестован, а в августе — казнён
              правительственными силами.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В Вилейском уезде Минской губернии повстанцами командовал Винцент Козелл-Поклевский, и его
              отряд был разгромлен царскими войсками в мае 1863 года. Около озера Нарочь и у Ошмянского
              уезда действовал отряд под руководством Леона Чеховича. Его разгромили правительственные
              войска, а предводитель был осуждён на 12 лет каторги.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В Лидском уезде Виленской губернии повстанцами командовал Людвик Нарбутт. В Витебской губернии
              отличился отряд польского революционера Леона Плятера. В его разгроме царским войскам оказались
              помощь крестьяне, и лидер повстанцев был казнён в Даугавпилсской крепости в мае 1863 года.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Итогом восстания стал его разгром. Часть повстанцев эмигрировала, другие были казнены
              или сосланы. Свыше 3000 имений польской шляхты были переданы новым владельцам.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { KalinovskyPage };