import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Statut1Page = () => {
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
              Принятие I Статута ВКЛ
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1529 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              При разработке Статута Великого княжества Литовского 1529 г.1 его составители впервые решили ряд
              исключительно сложных теоретических и практических вопросов, таких как разграничение норм права по
              отдельным отраслям, расположение их в определенной системе, ввели много новых положений, ранее
              неизвестных праву Великого княжества Литовского. Статут 1529 г. явился первым систематизированным
              сводом законов различных отраслей права: государственного (конституционного), брачно-семейного и
              наследственного, процессуального, уголовного, земельного, лесного и охотничьего, гражданского. В
              Статуте 1529 г. получили юридическое закрепление основы общественного и государственного строя,
              правовое положение классов, сословий и социальных групп населения, порядок образования, состав и
              полномочия некоторых органов государственного управления и суда. В Статуте 1529 г. присутствует в
              виде нормы-принципа идея разделения властей.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Статут 1529 г. включает 13 разделов, которые подразделяются на статьи. Первоначально в Статуте 1529 г.
              было 244 статьи. В XVI ст. официальный текст Статута не был опубликован и в рукописные списки дополнения
              вносились самими владельцами рукописей. В результате внесения дополнений и редакционных поправок в 30-х
              годах XVI ст. количество статей увеличилось до 283 (по Слуцкому списку – до 278).
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Известны переводы текста Статута 1529 г. с белорусского на латинский и польский языки. Статут 1529 г.
              впервые напечатан на белорусском языке латинскими буквами в 1841 г. в Познани, а в 1854 г. кириллицей в Москве.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Издание Статута 1529 г. знаменовало собой важный этап в развитии правотворчества и правоприменительной
              деятельности, способствовало укреплению правопорядка в государстве, ограничивало произвол администрации
              и судебных органов. Также Статут 1529 г. – памятник культуры и языка белорусского народа.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Statut1Page };