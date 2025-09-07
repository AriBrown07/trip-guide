import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Razdel1Page = () => {
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
              Первый раздел Речи Посполитой
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1772 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Непосредственной причиной раздела послужила деятельность Барской конфедерации (возглавляла
              движение за восстановление независимости Речи Посполитой.- Прим. ред.), фактической – стремление
              стран-соседей к расширению своих территорий за счёт ослабленной внутренними спорами Речи Посполитой.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              По Петербургской конвенции от 5 августа 1772 г. в результате раздела Россия присоединила Лифляндское,
              большую часть Полоцкого (на правом берегу Двины), почти всё Витебское, Мстиславское воеводства,
              восточную часть Речицкого повета Минского воеводства с городами Полоцк, Витебск, Могилёв, Орша,
              Пропойск, Мстиславль, Рогачёв, Гомель, Чечерск и др. Австрия захватила западную часть Украины со
              Львовом и южную часть Польши (воеводства Русское, часть Белзского, Краковского, Сандомирского,
              окраины Волынского, Подольского); Пруссия – северо-западную часть Польши [Вармия, воеводства
              Поморское (без Гданьска), Мальборкское, Хелминское (без Торуня), часть Иновроцлавского].
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              29 сентября 1773 г. между Россией и Речью Посполитой подписан трактат «О восстановлении мира
              между обоими государствами и о присоединении к России некоторых от Польши земель». В принятом
              26 марта 1775 г. «отдельном акте» Россия гарантировала Речи Посполитой сохранение кардинальных
              прав (шляхетских вольностей).
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Razdel1Page };