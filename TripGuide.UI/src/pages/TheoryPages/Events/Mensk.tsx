import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const MenskPage = () => {
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
              Первое упоминание Менска в письменных источниках
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1067 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В исторической науке принято считать датой основания города его первое письменное упоминание.
              Для Минска это 3 марта 1067 года. Вот что говорится о событиях 951-летней давности в летописи
              XII века «Повесть временных лет»: «Поднял рать в Полоцке Всеслав, сын Брячислава, и занял Новгород.
              Трое же Ярославичей, Изяслав, Святослав, Всеволод, собрав воинов, пошли на Всеслава в сильный мороз.
              И подошли к Менску, и меняне затворились в городе. Братья же эти взяли Менск и перебили всех мужей,
              а жен и детей захватили в плен и пошли к Немиге, и Всеслав пошел против них. И встретились противники
              на Немиге месяца марта в 3-й день; и был снег велик, и пошли друг на друга. И была сеча жестокая,
              и многие пали в ней, и одолели Изяслав, Святослав, Всеволод, Всеслав же бежал».
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Таким образом, первое летописное упоминание Минска связано и с его уничтожением. Из «Повести»
              очевидно, что Минск гораздо старше. Ведь Ярославичи разрушили именно укрепленный город, а не
              мелкое поселение. Значит, летописный Менск существовал минимум десяток лет, пока не превратился
              в важный укрепленный населенный пункт, за который стоило воевать.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              После взятия Менска войска пошли на Немигу, где 3 марта 1067 года и состоялась яростная битва.
              Если город находился на современном месте у слияния Свислочи и Немиги, то войскам Ярославичей
              вообще идти бы не пришлось. Немига опоясывала минское замчище, защищая его от врагов. Значит,
              летописный Менск был в другом месте.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Сегодня наиболее убедительной выглядит версия историков о том, что летописный Менск находился
              не у слияния Свислочи и Немиги. Вероятнее всего, им было поселение на реке Менке в нынешней
              деревне Городище в 17 километрах от столицы. Наибольшее количество археологических находок
              оттуда датируется второй половиной X и первой половиной XI века. Вокруг городища на Менке
              сформировалась система сельских поселений, а плотность заселения в радиусе 15 километров от
              него была одной из самых высоких в Полоцком княжестве для того времени. Все это говорит о том,
              что к моменту первого упоминания летописным Менском было именно городище на Менке. Второй довод
              — оно названо по реке, на которой находилось. Такой топоним характерен для большинства городов
              того времени: Полоцк — Полота, Витебск — Витьба, Слуцк — Случь, Менск — Менка и т. д.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Раскопки, проведенные на территории минского замчища в послевоенные годы, говорят о том, что
              археологического материала раньше 2-й половины XI века там нет. Скорее всего, Менск у слияния
              Свислочи и Немиги возвели после летописной битвы. Причем именно туда переселились впоследствии
              меняне с Менки, а заодно перенесли на новое место старое название — Менск.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { MenskPage };