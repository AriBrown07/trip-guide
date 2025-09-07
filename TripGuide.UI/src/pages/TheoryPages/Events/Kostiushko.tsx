import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const KostPage = () => {
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
              Восстание под руководством Т. Костюшко
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1794 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Восстание Тадеуша Костюшко произошло в Польше в 1794 году. Оно началось после второго раздела
              Речи Посполитой в 1793 году и предшествовало третьему разделу 1795 года. Следствием последнего
              стало упразднение польского государства и его окончательный раздел между более сильными соседями 
              — Российской империей, Пруссией и Австрией.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Речь Посполитая находилась в состоянии политического застоя с конца XVII века, а её соседи,
              наоборот, усиливались и прирастали территорией и военной мощью.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В Речи Посполитой с 1764 года правил Станислав Понятовский. Его власть была сильно ограничена
              сеймом, который принял 3 мая 1791 года конституцию. Она стала одной из первых в мире.
            </Typography>

             <Typography variant="body1" className={styles.paragraph}>
              Часть недовольных магнатов выступили против короля и собрали Тарговицкую конфедерацию в 1792 году.
              Её центром стал городок Торговица на территории современной Кировоградской области Украины. Эти
              события совпали с окончанием русско-турецкой войны, поэтому покровительство конфедератам стала
              оказывать императрица Екатерина II. Она отправила в поход на Речь Посполитую генералов Михаила
              Каховского и Михаила Кречетникова. Первый направился именно в польские земли, а второй — в Литву.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В 1792 году началась война сторонников конституции против конфедератов и российских войск.
              Россию поддержал король Пруссии Фридрих Вильгельм II. Вскоре в Гродно собрался сейм и
              провозгласил отмену конституции, а в Варшаве и других городах разместились части русской
              армии. Польская армия была частично распущена.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Восстание Костюшко началось 12 марта 1794 года. Его предводителем был избран шляхтич Тадеуш
              Костюшко, а первым успехом стало нападение Антония Мадалинского в Пултуске на российский полк.
              16 марта в Кракове Костюшко был провозглашён диктатором республики и верховным главнокомандующим
              с титулом генералиссимуса.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В ответ на такие действия против поляков выступили русские и прусские войска. 4 апреля повстанцы
              одержали победу в битве под Рацлавицами над русским генералом Тормасовым. За краткий промежуток
              времени поляки вернули контроль над Варшавой и Вильной и одержали победу под Ошмянами.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Лидер повстанцев объявил всеобщую мобилизацию и увеличил численность войска до 70 тыс. человек.
              Оно было плохо вооружено: чем славится армия повстанцев, так это тем, что часть воинов имели
              только пики и косы. Огнестрельного оружия не хватало. Резерв войска разместился около Кракова.
              Основные силы контролировали дорогу на Варшаву, а остальные отряды — Вильно, Гродно и Люблин.
              Против них действовали русская армия генералов Салтыкова, Суворова, Зубова и Беннигсена, а
              также австро-прусские войска. 26 мая отряд Костюшко был разгромлен русско-прусской армией
              генерала Денисова в битве под Щекоцинами недалеко от Варшавы.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
             Краков сначала заняли пруссаки, а затем — австрийцы. В центральной Польше произошло восстание.
             Один из отрядов повстанцев на севере добрался до Либавы (современная Лиепая в Латвии). К Вильно
             направился отряд генерала Репнина, а к Люблину — войско под командованием Дерфельдена. Основные
             неудачи восставших поляков пришлись на сентябрь 1794 года, когда они были разбиты Суворовым и
             уступили города Кобрин и Брест.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Сам Костюшко 29 сентября потерпел поражение от генерала Денисова в битве под Мацеёвице и попал
              в плен. 1 октября поляки сдали Гродно, а 24 числа войска под командованием Суворова взяли штурмом
              Варшаву. Последние отряды повстанцев капитулировали в ноябре 1794 года.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Третий раздел Речи Посполитой последовал 24 октября 1795 года. В состав России вошли Ровно
               Луцк, Брест, Вильно и земли между Ригой и Либавой. Люблин и Краков достались Австрии, а
               территория между Гродно и Варшавой — Пруссии.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { KostPage };