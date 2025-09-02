import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../EventPage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const BorisovPage = () => {
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
              Онование г. Борисова
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1102 г.)
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В 1102 году полоцким князем Борисом Всеславичем был основан г. Борисов (версия российского историка
              В. Н. Татищева). Старобелорусские летописи 1-й пол. XVI в. («Хроника Быховца» и «Хроника Великого
              княжества Литовского и Жомойтского») сообщают, что город «вчинил» полоцкий князь Борис, назвав
              поселение своим именем. Время возникновения Борисова (начало XII в.) подтверждено археологическими
              раскопками 1968, 1969 и 1971 г.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Князь Борис Всеславич (1055?-1128) – старший сын легендарного полоцкого князя Всеслава Брячиславича
              по прозвищу Чародей. Считается, что имя было дано княжичу при крещении, а его традиционное славянское
              имя – Рогволод Существует мнение, что полоцкие князья давали имя Рогволод своим старшим сыновьям в
              честь родоначальника княжеской династии – Рогволода. Братьями Бориса являлись Глеб, Давыд, Роман,
              Ростислав и Святослав. Малолетние Борис и Глеб сопровождали Всеслава во время военных событий
              1067-1068 гг. Известно, что княжичи вместе с отцом были вероломно пленены киевскими князьями
              Ярославичами, и больше года провели в заточении.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Борис Всеславич возглавил могущественное Полоцкое княжество в 1101 г. после смерти отца.
              Между братьями сразу возникли споры за наследство, что в дальнейшем способствовало раздроблению
              княжества. Относительно пребывания князя Бориса на престоле в Полоцке имеется две основные версии.
              По одной, он управлял княжеством непрерывно, т. е. вплоть до своей кончины в 1128 гг. По другой,
              княжение прерывалось на длительный срок.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Российский историк В. Н. Татищев (1686-1750) в пояснениях к своей книге «История Российская…»
              без ссылки на источник сообщает, что в 1102 г. «Борис Всеславич полоцкий ходил на ятвяг и,
              победя их, возвратясь, поставил град Борисов в свое имя и людьми населил». По мнению современных
              исследователей, данная выписка могла быть заимствована из Полоцкой летописи, утраченной еще в
              XVIII в. «Хроника Быховца» и «Хроника Великого княжества Литовского и Жемойтского» тоже сообщают,
              что Борисов «вчинил» полоцкий князь Борис, назвав город своим именем.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Время возникновения города подтверждены археологическими исследованиями белорусского историка
              Г. В. Штыхова. При раскопках городища и селища, проведенных в 1968, 1969 и 1971 гг. на территории
              современного аг. Старо-Борисов, был выявлен многочисленный вещевой инвентарь типичный для городского
              поселения XII-XIII вв.  
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              С момента основания город занял довольно высокое положение среди аналогичных укрепленных поселений
              Полоцкой земли. Это объясняется размещением Борисова на реке Березина, через которую осуществлялся
              прямой выход в реку Двина, и далее в Неманскую систему путей сообщений, которая обеспечивала
              балтийское направление исторических контактов Среднего Поднепровья. Важностью геостратегического
              размещения и обусловлено возникновение Борисова, характер которого был как военно-оборонительный,
              так и контрольный на транзитном пути.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              С возникновением города одновременно образовалась обширная Борисовская волость. Существует мнение,
              что границы волости на северо-западе и востоке отмечали так называемые Борисовы камни. Большинство
              из них (подтверждены данные о семи камнях, из которых сохранилось три) имели высеченный шестиконечный
              крест и надпись-обращение «Господи помози рабу своему Борису». Необходимо отметить, что предназначение
              этих монументальных памятников эпиграфики XII в. к настоящему времени окончательно не выяснено. Помимо
              обозначения границ, существуют версии, что кресты и надписи высечены в год большого голода, с целью
              увековечить имя князя или пере освящения камней-фетишей, которым продолжало поклоняться местное население,
              чтобы христианство возобладало над языческими верованиями.  
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { BorisovPage };