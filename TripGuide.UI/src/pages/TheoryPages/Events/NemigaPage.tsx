import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const NemigaPage = () => {
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
              Битва на Немиге
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (3 марта 1067 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Битва на реке Немиге 3 марта 1067 года — сражение между войсками полоцкого князя Всеслава
              Чародея из династии Рогволодовичей с войсками Ярославовичей (киевским, черниговским и переяславским князьями).
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Причиной столкновения послужили попытки Всеслава захватить Псков и Новгород. Князь Всеслав Чародей
              в 1065 году держал в осаде Псков, а через год напал на Новгород и вывез из Софийского собора колокола
              и многую другую церковную утварь, а часть города сжег. В ответ Ярославичи вторглись в Полоцкое
              княжество и напали на Минск. На вече горожане решили оборонять город. Они укрылись за городскими
              укреплениями, но Ярославичи захватили Минск. Город был разрушен, население взято в плен и частично уничтожено.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Всеслав с дружиной спешил на помощь осажденному Минску, но опоздал. Его войска встретились с войсками
              Ярославичей на берегах Немиги. Войска сошлись возле реки Немиги и 7 дней стояли друг против друга в
              глубоком снегу. Наконец Всеслав Полоцкий начал атаку, и много воинов пало с обеих сторон. О битве на Немиге
              с осуждением высказался автор "Слова о полку Игореве", который описал ее как жестокое побоище: "...на Немиге
              снопы стелют из голов, бьют цепами булатными, на току жизнь кладут, веют душу из тела...". Вместе с
              этими событиями Минск в "Повести временных лет" упоминается четыре раза.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              По итогам битвы летом киевляне пригласили Всеслава Чародея на переговоры в Оршу, гарантировав
              неприкосновенность, но киевский князь Изяслав нарушил клятву, захватил в плен Всеслава и двоих его
              сыновей. В результате восстания киевлян Всеслав был освобожден, и избран на великокняжеский киевский
              престол. Он правил в Киеве всего лишь 7 месяцев, а потом внезапно вернулся в Полоцк.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { NemigaPage };