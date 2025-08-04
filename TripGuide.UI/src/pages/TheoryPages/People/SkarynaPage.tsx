import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/skaryna-1.jpg';
import pic2 from '../../../pics/skaryna-2.jpg';
import pic3 from '../../../pics/skaryna-3.jpg';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const SkarynaPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = [
    { id: 1, src: pic1, alt: '' },
    { id: 2, src: pic2, alt: '' },
    { id: 3, src: pic3, alt: '' },
  ];

  const handlePrev = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  
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
          Исторические личности Беларуси
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
                    {event.letter}
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

        <div className={styles.contentWrapper}>
          {/* Галерея */}
          <div className={styles.galleryWrapper}>
            <IconButton onClick={() => setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}>
              <ChevronLeft />
            </IconButton>
            <div className={styles.imageContainer} onClick={openModal}>
              <img
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                className={styles.figureImage}
              />
            </div>
            <IconButton onClick={() => setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}>
              <ChevronRight />
            </IconButton>
          </div>

          {/* Модальное окно для полноэкранного просмотра */}
          <Dialog
            open={isModalOpen}
            onClose={closeModal}
            maxWidth="lg"
            sx={{
              '& .MuiDialog-paper': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
                maxWidth: '100vw',
                overflow: 'visible',
              },
              '& .MuiDialogContent-root': {
                padding: 0,
                backgroundColor: 'transparent',
              }
            }}
            BackdropProps={{
              sx: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(4px)',
              }
            }}
          >
            <DialogContent className={styles.modalContent}>

              <Box className={styles.modalGallery}>
                <IconButton
                  className={styles.modalArrow}
                  onClick={handlePrev}
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft />
                </IconButton>
                <div className={styles.modalImage}>
                  <img
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    className={styles.modalImage}
                  /></div>

                <IconButton
                  className={styles.modalArrow}
                  onClick={handleNext}
                  aria-label="Следующее фото"
                >
                  <ChevronRight />
                </IconButton>
              </Box>
            </DialogContent>
          </Dialog>

          <div className={styles.textBlock}>
            <Typography variant="h2" className={styles.figureName}>
              Франциск Скорина
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              (1486-1551)
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
                Родился Франциск Скорина около 1490 года в семье купца Луки (Лукиана) в городе Полоцке,
                который в то время являлся одним из крупнейших политических и культурных центров Великого княжества Литовского.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Начальное образование юный Франциск получил в родительском доме, где постигал азы чтения и письма,
                а затем изучал латинский язык в школе при Полоцком бернардинском монастыре, основанном в 1498
                году по инициативе великого князя Александра Ягеллона. В 1504 году "сын из славного града Полацка"
                поступил в один из лучших европейских университетов того времени – Краковский – на факультет
                "вольных искусств" и спустя два года получил свою первую ученую степень – бакалавра философии.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                В студенческие годы среди увлечений Франциска была и медицина: согласно данным биографов,
                спустя несколько лет в стенах alma mater он получил степень магистра, а в 1512 году – блестяще
                сдал экстерном экзамен доктора медицины в Падуанском университете.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Согласно одной из версий, в 1512 – 1516 годах Франциск Скорина служил личным лекарем и секретарём
                сына литовского короля Сигизмунда І Старого – княжича Яна, с которым познакомился ещё во время обучения в Болонском университете.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Издательскую деятельность Франциск Скорина начал в Праге, где при поддержке купцов-меценатов из Полоцка
                и Вильно основал типографию, а уже в 1517 году опубликовал "Псалтырь" в переводе на старобелорусский язык,
                которая стал первым изданием в истории национального и восточнославянского книгопечатания. Всего же на
                протяжении двух лет в пражской типографии увидели свет 23 книги Библии, которые сопровождались иллюстрациями
                (ксилографическими гравюрами, инициалами и заставками), а также авторскими предисловиями и комментариями,
                в которых Франциск Скорина делился с читателями своими просветительскими идеями и воззрениями.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                В начале 1520-х годов Франциск Скорина переехал в Вильно и открыл первую типографию на территории
                Великого княжества Литовского. Именно здесь вышла "Малая подорожная книжица", дополненная акростихами
                и календарем солнечных и лунных затмений, и "Апостол", рассказывающий о деяниях и посланиях ближайших
                учеников Христа. "Малая подорожная книжица" предназначалась для путешественников и включала 18 церковных
                книг, в число которых вошли "Псалтырь", "Часословец", "Шестидневич" и "Соборник", а также акафисты и каноны…
                Уникальные издания небольшого формата были украшены гравюрами, заставками и инициалами, а девять из них сопровождали послесловия.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Благодаря просветителю и первопечатнику Франциску Скорине белорусское национальное книгоиздание обогатило
                не только европейскую, но и общемировую культуру. Ренессансные издания знаменитого полочанина выделяли
                высокое качество печати, характерные художественные, гравюрные и орнаментальные украшения, шрифты и другие
                компоненты издательской эстетики и мастерства. Одной из главных особенностей всех книг Скорины стали авторские
                комментарии, которые помогали "посполитым" людям лучше понять содержание, осмыслить значение событий,
                запечатленных в книгах Священного Писания. В красноречивых предисловиях, отражающих гуманистические идеалы
                и мировоззрение Франциска Скорины, прослеживаются приметы других литературных жанров, которые позже получили
                продолжение в белорусской литературе и письменности. Книги Франциска Скорины распространялись в многочисленных
                рукописных копиях, и в действительности не только повлияли на развитие духовной культуры белорусских земель,
                но и всего Великого княжества Литовского, других восточнославянских странах, стимулировали возникновение книгопечатания в Московском государстве.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Последние годы жизни Франциск Скорина посвятил медицинской практике. В 1520 – 30-х годах он выполнял обязанности
                лекаря и секретаря у виленского епископа Иоанна, а уже в 1529-м по приглашению прусского герцога Альбрехта
                Гогенцоллерна посетил Кенигсберг, где вспыхнула эпидемия. В середине 1530-х уже известный при чешском дворе
                по участию в дипломатической миссии Жигимонта I Франциск Скорина принял заманчивое предложение от короля
                Фердинанда I и стал придворным лекарем и садовником в роскошном ботаническом саду, обрамляющем величественный замок Градчаны.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Умер Франциск Скорина около 1551 года, однако точная дата смерти и место захоронения неизвестны.
                Его сын Симеон в 1552 году получил привилей от чешского короля Фердинанда I на право наследования
                имущества покойного доктора "Франциска Руса" из Полоцка.
              </Typography>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { SkarynaPage };