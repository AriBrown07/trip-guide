import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const TurovPage = () => {
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
              Первое упоминание Турова в письменных источниках
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (980 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Происхождение названия города объясняют разные версии. Самая распространенная утверждает,
              что Туров – от имени князя Тура, который правил здесь в IX веке. Другая версия восходит к
              турам – первобытным диким быкам, обитавшим в окрестностях. Согласно третьей, топоним Туров
              появился от слова "тура" в значении "крепость на высоком берегу", так как город как раз и
              вырос на холме у реки Припять.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Впервые Туров упомянут в "Повести временных лет" в 980 году и является одним из старейших
              городов Беларуси после Полоцка (862) и Витебска (974). Впрочем, даже эти даты еще не
              окончательны! Город был главным центром древнего племени дреговичей, а земли Туровского
              княжества являлись пограничьем славян и балтов.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Основан Туров на месте слияния рек Язда и Струмень – так в давние времена называли
              легендарную полесскую Припять, которая несла воды в Днепр, ведущий к Черному морю.
              Такое расположение города сделало его значимым торговым узлом на знаменитом пути
              "из варяг в греки". И в дальнейшем Туров процветал благодаря своим торговым связям.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В "Туровских народных преданиях", записанных в конце XIX века, рассказано о появлении
              города. Дескать, князь Тур двигался со своей дружиной вверх по реке, по пути сходя
              с кораблей на берег и занимаясь охотой. Однажды он увидел вещий сон – себя, стоящего
              на вершине холма. Князь воспринял видение как прямое указание места для основания города.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Князь Тур остается одной из наиболее "темных" и загадочных фигур ранней белорусской
              истории, а его личность до сих пор вызывает споры среди ученых. В "Повести временных
              лет" сказано: "Рогволод пришел из-за моря и имел власть свою в Полоцке, a Тур – в
              Турове, по нему и туровцы прозвалися". Однако мнения историков о значении этих строк разнятся.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
             Одни считают Тура действительно реальной персоной, ведь его имя приведено в "Повести
             временных лет" рядом с Рогволодом, чье существование подтверждено документальными
             источниками. Другие специалисты выдвинули предположение, что подразумевался не один
             князь, а несколько! Во времена Киевской Руси сравнение с туром (диким быком) часто
             применялось для характеристики не только одного человека, но и группы воинов. В отношении
             князей или предводителей с дружинами использовались выражения "Бой Тур", "Яр Тур" –
             в значении "рыкающие (ревущие) туры".
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Известные белорусские историки и археологи Петр Лысенко и Георгий Штыхов высказали
              версию, что Тур – это варяжский воин высокого ранга из личной дружины киевского князя –
              либо Святослава Игоревича, либо Ярослава Святославича, либо Владимира Святославича.
              Несмотря на разнообразие версий, общепринятой все же считается основанная на "Повести
              временных лет". В доказательство также приводят еще одно упоминание имени князя в Устюжском
              летописном своде, где Тур назван братом Рогволода. Впрочем, о дальнейшей жизни основателя
              Турова почти ничего не известно.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { TurovPage };