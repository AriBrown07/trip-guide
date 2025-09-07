import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const VOVPage = () => {
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
              Начало Великой Отечественной войны
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1941 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              22 июня 1941 г. в 4 ч. утра без объявления войны после артиллерийской и авиационной
              подготовки главные силы Вермахта и войска германских союзников (около 190 дивизий)
              внезапно начали мощное наступление по всей западной границе СССР от Чёрного до Балтийского моря.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Бомбардировке подверглись Киев, Рига, Каунас, Виндава, Либава, Шауляй, Вильнюс, Минск,
              Гродно, Брест, Барановичи, Бобруйск, Житомир, Севастополь и многие другие города,
              железнодорожные узлы, аэродромы, военно-морские базы СССР. Осуществлялся артиллерийский
              обстрел пограничных укреплений и районов дислокации советских войск вблизи границы.
              В 5-6 ч. утра немецко-фашистские войска перешли государственную границу СССР и повели
              наступление вглубь советской территории. Только через полтора часа после начала наступления
              посол Германии в Советском Союзе граф Вернер фон Шуленбург сделал заявление об объявлении войны СССР.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В 12 ч. дня все радиостанции Советского Союза передали правительственное сообщение о нападении
              на нашу страну фашистской Германии. В заявлении, с которым от имени Центрального Комитета
              Коммунистической партии и Советского правительства выступил народный комиссар иностранных дел
              В. М. Молотов, указывалось, что нападение фашистской Германии на СССР — беспримерное в истории
              цивилизованных народов вероломство. Вслед за правительственным сообщением был передан Указ
              Президиума Верховного Совета СССР о мобилизации военнообязанных граждан 1905-1918 гг. рождения.
              23 июня была создана Ставка Главного Командования Вооружённых Сил СССР (позднее Ставка Верховного
              Главнокомандования) во главе с народным комиссаром обороны, Маршалом Советского Союза С. К. Тимошенко.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В приграничных сражениях и в начальный период войны (до середины июля) Красная Армия потеряла
              убитыми и ранеными 850 тыс. человек; было уничтожено 9,5 тыс. орудий, свыше 6 тыс. танков,
              около 3,5 тыс. самолетов; в плен попало около 1 млн. человек. Немецкая армия оккупировала
              значительную часть страны, продвинулась вглубь до 300-600 км, потеряв при этом 100 тыс.
              человек убитыми, почти 40% танков и 950 самолётов. Однако план молниеносной войны, в ходе которой
              германское командование намеревалось за несколько месяцев захватить европейскую часть СССР, провалился.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { VOVPage };