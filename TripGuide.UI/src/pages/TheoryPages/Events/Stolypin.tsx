import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const StolypinPage = () => {
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
              Столыпинская аграрная реформа
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1906 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Осуществление реформы началось 9 ноября 1906 г. Первоначальным этапом стало разрушение сельской
              общины. Общинные наделы переводились в личную собственность крестьян. Теперь земля принадлежала
              не всей крестьянской общине, а конкретной семье, которая эту землю обрабатывала. Крестьяне получали
              отруб (участок земли) в пределах деревни, который принадлежал ему. Чересполосица ликвидировалась за
              счёт объединения и перераспределения земли. Данные мероприятия повышали заинтересованность крестьян
              в собственном труде.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Реформа способствовала переселению крестьян на хутора – отдельно стоявший участок земли за
              пределами деревни. Хутор закреплялся в собственности крестьянина, туда переносилось его имущество.
              Хуторское хозяйство напоминало фермерское хозяйство США и по задумке авторов должно было способствовать
              развитию капиталистических отношений в деревне и развитию предпринимательской инициативы у крестьян,
              формированию класса зажиточных крестьян, а также разрушению сельской общины. На хутора в основном
              селились зажиточные крестьяне (кулаки), ставшие опорой царизма в деревне.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Вопрос с нехваткой земли (малоземельем) П. А. Столыпин предлагал решить путём переселения
              малообеспеченных крестьян за Урал и Сибирь, где было много необработанной почвы. Был организован
              бесплатный проезд, выделены безвозмездные денежные суды, специальные пункты приема и земельные
              участки для переселившихся крестьян. Однако тяжелые жизненные условия и недостаточная помощь со
              стороны государства омрачили переезд многих крестьян, заставили их вернутся обратно. Особенностью
              реализации столыпинской реформы стало также введение земского самоуправления (выборных органов
              местного самоуправления) в 1911 г. на территории Витебской, Минской и Могилевской губернии. 
            </Typography>

             <Typography variant="body1" className={styles.paragraph}>
              Результатом реформы для белорусских земель стал рост буржуазной собственности, развитие
              капиталистических отношений и предпринимательской инициативы. Большинство земель переходили
              в руки зажиточных крестьян, при этом многие крестьяне-бедняки и середняки не выдержали конкуренции,
              разорились и были вынуждены продать землю. Реформа содействовала дальнейшей специализации сельского
              хозяйства на животноводстве и винокурении, внедрению сельскохозяйственных машин. Началось формирование
              слоя сельской буржуазии из числа зажиточных крестьян, ставшей опорой власти в деревне.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { StolypinPage };