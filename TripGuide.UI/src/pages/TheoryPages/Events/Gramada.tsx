import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const BSGPage = () => {
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
              Формирование БСГ
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1902 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Основным ядром белорусского революционного движения с течением времени явилась Белорусская
              социалистическая громада. Она зародилась в 1902 г. в кружке студентов Петербургского университета
              (студенты: Антон и Иван Луцкевичи, крестьянин Казюк Костровицкий, писавший под псевдонимом Каганец,
              рабочий Виктор Зялязей). Первое наименование этой организации было «Белорусская революционная партия».
              По своим взглядам эта организация примыкала к Партии польских социалистов. Одновременно ветви этой
              организации появляются в Вильне (Франциск Умястовский, А. Бурбис и др.), и в Петербурге (В. Ивановский,
              А. Пашкевич). Близость новой революционной организации к польским сказывается и в том, что первая ее
              прокламация была напечатана на гектографе на польском языке. В том же году «Партия» переименовывается
              в Белорусскую революционную громаду, позже в Социалистическую. Громада является очень близкой организацией
              к первым белорусским издательствам.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Программа Громады вырисовывалась постепенно на ее съездах и в процессе работы. Первый съезд Громады
              в 1903 г. принял полностью программу Польской партии социалистов. Он настаивал на краевой автономии
              Беларуси с сеймом в Вильне, на культурно-национальной автономии для национальных меньшинств и
              постановил разработать аграрную программу на основе конфискации без выкупа частновладельческих земель,
              казенных и других.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              1905 г. был годом оживления в деятельности Белорусской социалистической громады. Мы видим ее
              комитеты в Минске и в Вильне. Она издает ряд прокламаций и даже запасается собственной типографией.
              Так как издавать нелегальные брошюры в России все же было трудно, то Громада пользуется брошюрами,
              изданными в Лондоне на белорусском же языке.
            </Typography>

             <Typography variant="body1" className={styles.paragraph}>
              Работа среди крестьянства вносила в эту среду революционные идеи. Неудивительно, что в марте 1905 г.
              состоялся первый крестьянский съезд, выносящий резолюцию об автономии Белоруссии с сеймом в Вильне и о
              конфискации помещичьей земли. Благодаря Громаде организуется Белорусский крестьянский союз. Она всю
              свою энергию направляет на организацию значительного в Белоруссии сельского пролетариата и малоземельного
              крестьянства. Ее деятельность, главным образом, была направлена на села и имела малое распространение
              среди немногочисленного городского пролетариата.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              2-й съезд Громады в январе 1906 г. был посвящен, главным образом, аграрной программе. Этот съезд
              вносит в программу партии постановление об образовании белорусского земельного фонда из конфискованных
              земель. Из этого фонда земля в первую очередь выделяется в пожизненное пользование безземельным и
              малоземельным. В остальном программа Громады остается прежней.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Связь Громады с крестьянством сказалась и в том, что ею устроен ряд сельскохозяйственных
              забастовок. В тесной связи с ней действует Белорусский учительский союз. По своему составу
              Громада, по замечанию ее историка А. Бурбиса, перестает быть интеллигентской, т. е. в ней
              численно преобладают крестьяне и народные учителя. 1907 г. по количеству изданных брошюр и
              по количеству крестьянских наказов в Думу был годом весьма направленной работы. Но дальнейшие
              обстоятельства не благоприятствовали политической работе Громады, т. к. начавшаяся реакция не
              благоприятствовала этой работе. Поэтому кружок деятелей Громады постепенно объединяется с
              издательством «Нашей Нивы» и посвящает свой труд легальной литературе.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { BSGPage };