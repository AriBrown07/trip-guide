import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const BerestPage = () => {
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
              Берестейская церковная уния
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1596 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Уния церковная (лат. соединение) – слияние исповеданий православного и католического,
              причем, с одной стороны, признается главенство папы, чистилище, нахождение Св. Духа и
              от Сына, с другой – допускается брак белого духовенство и богослужение на родном языке,
              с сохранением восточных обрядов.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Акт о присоединении к Римско-католической церкви был подписан в Риме 23 декабря 1595 года
              и утвержден 9 октября 1596 года в Свято-Николаевском соборе города Бреста. Состоявшийся в то
              же время в Бресте собор православного духовенства во главе с патриаршим экзархом Никифором,
              двумя епископами Киевской митрополии и князем Константином Острожским отказался поддержать
              унию, подтвердил верность Константинопольскому патриархату и предал отступников анафеме.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Брестская уния привела к возникновению на территории Речи Посполитой Русской униатской церкви.
              В 1700 году к грекокатолической церкви присоединилась Львовская, а в 1702 году – Луцкая епархии,
              что завершило процесс перехода православных епархий Речи Посполитой в грекокатолицизм. В московских
              документах начала XVI века – уже через 30 лет после Брестской унии – униатство именуется «белоруской
              верой». Униаты составляли ~40% населения, католики ~35%, прихожане РПЦ ~6%.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Униатство было не столько религиозным выбором, сколько выбором цивилизационной модели. Догмы и
              обряды православных, принявших Унию, остались прежними. Однако, влияние Московского патриархата,
              жившего по Соборному уложению (основному закону Московского царства), более не оказывало давления
              на внутренние дела ВКЛ.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Наряду с возможностью религиозного примирения, Уния подняла на качественно новый уровень
              всеобщее образование – по всей стране открывались школы и коллегиумы иезуитов и базилиан
              (униатов), принявших иезуитские стандарты обучения. Подписание Брестской унии привело к долгой
              и временами кровавой борьбе между последователями двух конфессий на западнорусских землях.
              Четверть века православные Речи Посполитой, не принявшие Брестскую унию, оставались без
              митрополита. Православная Киевская митрополия была восстановлена лишь в 1620 году, когда
              православные киевские митрополиты вновь стали носить титул митрополита Киевского и всея Руси.
              В 1633 году митрополиту Петру Могиле удалось добиться признания православной церкви со стороны
              государства, но впоследствии дискриминация православия в Речи Посполитой вновь усилилась. На
              территории же Российской империи (в том числе на землях, отошедших к России от Речи Посполитой)
              гонениям подвергались приверженцы унии.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Постепенная ликвидация Брестской унии началась в конце XVIII века с присоединением к России
              Правобережной Украины и Белоруссии. 12 февраля 1839 года на Полоцком церковном соборе с Русской
              православной церковью было воссоединено более 1600 украинских (Волынь) и белорусских приходов с
              населением до 1,6 млн человек.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В 1839 униатские приходы были переданы в ведение Московского патриархата РПЦ. Развитие
              образования и культуры затормозилось почти на столетие. На смену школам иезуитов и базилиан
              пришли церковно-приходские школы РПЦ. 
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { BerestPage };