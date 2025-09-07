import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const BaptismPage = () => {
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
              Крещение Руси
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (988 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Крещение Руси произошло в X веке, и оно считается одним из наиболее важных событий в
              отечественной истории. Если ориентироваться на «Повесть временных лет», то это
              случилось в летний период 988 года. Состоялось крещение Руси на территории Киева,
              в водах Днепра. Именно там князь Владимир решил в первый раз массово крестить киевлян.
              Постепенно новая вера появилась на территории остальных русских земель. Люди отказались
              от языческих идолов и решили их сбросить в реки, вывалять в грязи, а также поколотить палками.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Некоторые авторы понимают термин «крещение Руси» не только как принятие христианства
              в качестве основной религии. Речь идет также о процессе его распространения, который
              происходил в период XI—XII веков. Если широко понимать данный термин, то можно выделить главные этапы:
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              1. Первое крещение, которое состоялось в 860 годы. Именно тогда на Руси была создана епископия.
              Данное событие напрямую связано с князьями Диром и Аскольдом, которые правили в Киеве.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              2. Личное крещение княгини Ольги, которое произошло в Константинополе. Ориентировочной
              датой считается 946 год или 957 год.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              3. Крещение Руси, которое провёл князь Владимир.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              4. Строительство церквей, расширение приходской и епархиальной структур.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Если ориентироваться на исторические источники, то крещение Руси являлось выбором Владимира
              с чётко поставленной целью. Это решение было связано с его собственными религиозными
              стремлениями. Также отмечается взаимосвязь с политическими причинами. К примеру,
              Древнерусское государство должно было стать частью мировых держав. При этом князь
              Владимир был недоволен тем, что его подданные поклонялись языческим богам.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В конце 980-х годов Владимир вместе со своей дружиной решили придерживаться новой веры.
              Этот вопрос долго обсуждался, проводились переговоры с другими государствами, которые
              придерживались иной веры. В летописи отмечено об «испытании вер» князем Владимиром.
              Считается, что его убеждали принять веру мусульмане, а также иудаизированные хазары.
              Князь отправил личные посольства «в греки», «в немцы», «в болгары» с целью испытать
              их службу. Когда посольства вернулись, он остановился на христианстве. Послы были
              поражены тем, насколько красивым было богослужение.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Это была не единственная причина, почему князь Владимир решил принять христианство
              в православном варианте. Он также желал укрепить связи, которые уже успели установиться
              с Византией. На тот момент Византийская империя считалась невероятно могущественной.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Нет единого мнения по поводу того, как и когда проводилось крещение князя Владимира.
              Если верить «Корсунской легенде», то князь крестился в г. Корсунь (Херсонес), который
              располагался в центральной части владений Византии на Крымском полуострове. Это
              произошло в 988 г. При этом считается, что взятие Корсуни случилось в 989 году.
              Именно в этом месте Владимир вступил в брак с сестрой императоров из Византии Анной.
              Есть и иная традиция, которая тоже датируется XI веком. Считается, что крещение
              князя произошло за 2 года до того, как произошло им взятие Корсуни.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Когда произошло крещение самого князя и его дружины, правительство начало
              организовывать крещение людей из крупных городов. В первую очередь через эту
              процедуру прошли люди, находящиеся в Новгороде и Киеве. В первые годы после того,
              как крестили Русь, учредили митрополию с центром в Киеве. Она подчинялась
              Константинопольскому патриархату. Вместе с ней учредили минимум 3 епархии.
              Они располагались в Полоцке, Новгороде, а также в Белгороде. По некоторым
              данным ещё одна епархия могла находиться в Чернигове. Среди первых епископов
              были представители греческих народов. По традиции митрополитом Киевским считается
              свт. Михаил. При этом в некоторых документах говорится о том, что первым митрополитом
              выступил Феофилакт. Его перевели на территорию Руси из Севастийской митрополии.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              С 990-х годов начали строить храмы из дерева. Также именно во времена правления
              князя Владимира впервые появились монастыри. Примерно в 996 году на территории Киева
              освятили Десятинную церковь, выполненную из камня. Именно она являлась княжеским
              собором. На ее нужды было решено выделять 1/10 от общих доходов князя.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              После проведения крещения Руси возникло деление в сфере закона по византийскому
              стандарту церковной и княжеской юрисдикции. В области церковного права были брачные
              отношения, а также злодеяния, совершенные против нравственности. Там судили клириков
              и их близких родственников. Об этом было сказано в княжеских уставах, которые
              существовали в X–XII веках. Важным считалось, чтобы в храмах служили русские
              священники. Чтобы так было, наследников высших слоёв общества силой забирали, чтобы
              они проходили «учение книжное». Также храмы стремились обеспечить богослужебными книгами.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Благодаря принятию христианства возникли ощутимые последствия в области политики.
              Это позволило значительно повысить престиж Руси. После этого получилось укрепить,
              а также расширить и без того крепкие связи с Византией. Удалось установить контакт
              с южнославянским миром. Также улучшилась связь с государствами, находящимися на Западе.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { BaptismPage };