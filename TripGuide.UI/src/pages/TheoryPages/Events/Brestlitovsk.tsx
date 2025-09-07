import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const BLPage = () => {
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
              Брест-Литовский договор
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1918 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Брест-Литовский мирный договор, подписанный 3 марта 1918 года между Советской Россией и
              Центральными державами (Германией, Австро-Венгрией, Османской империей и Болгарией), стал
              важнейшим событием Первой мировой войны и имел далеко идущие последствия для Европы и России.
              Этот договор положил конец военным действиям на Восточном фронте, но привел к значительным
              территориальным потерям для молодой советской республики.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              К 1917 году Россия находилась в глубоком кризисе: Первая мировая война истощила экономику,
              армия страдала от нехватки снабжения и деморализации, а в стране нарастало революционное движение.
              В феврале 1917 года был свергнут царь Николай II, а Временное правительство попыталось продолжить
              войну. Однако его попытки не увенчались успехом, а после Октябрьской революции 7 ноября (25 октября
              по старому стилю) 1917 года большевики во главе с Лениным взяли власть и провозгласили курс на
              немедленный выход из войны.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В декабре 1917 года в Брест-Литовске (современный Брест, Беларусь) начались мирные переговоры
              между Советской Россией и Центральными державами. Делегацию большевиков возглавлял Лев Троцкий,
              который сначала пытался затянуть процесс, надеясь на скорый революционный подъем в Германии.
              Однако в феврале 1918 года Германия начала наступление, заняв огромные территории, включая Киев,
              Минск и Нарву. Это вынудило Советское правительство срочно принять ультиматум Центральных держав.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              По условиям Брестского мира Россия теряла:
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Прибалтику (Эстонию, Латвию и Литву), часть Беларуси и Украины, которые переходили под контроль Германии;
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Финляндию, которая провозгласила независимость;
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Часть Кавказа, переданную Османской империи;
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Польшу, которая выходила из сферы влияния России.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Кроме того, Россия обязалась демобилизовать армию, прекратить поддержку революционных
              движений в Германии и выплатить контрибуцию.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Заключение Брестского мира вызвало негодование как среди большевиков, так и среди
              их противников. В левых кругах договор считался «предательским», а в среде Белого
              движения стал еще одним поводом для борьбы против советской власти.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Однако Брестский мир действовал недолго: после поражения Германии в ноябре 1918 года и
              начавшейся революции в Берлине Советское правительство аннулировало договор. Тем не менее,
              часть территорий так и не вернулась под контроль России, что предопределило границы будущих государств.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Брест-Литовский мир стал вынужденной уступкой со стороны Советской России, но позволил
              большевикам сосредоточиться на удержании власти внутри страны. Хотя договор был расторгнут
              менее чем через год, его последствия оказали огромное влияние на карту Восточной Европы и
              дальнейшую историю региона.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { BLPage };