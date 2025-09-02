import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/Vincent-1.jpg';
import pic2 from '../../../pics/Vincent-2.jpg';
import pic3 from '../../../pics/Vincent-3.jpeg';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Vincent = () => {
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
              Винцент Дунин-Марцинкевич
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
                4 февраля 1808 — 29 декабря 1884
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
               Винцент Дунин-Марцинкевич — классик белорусской литературы, поэт, драматург, переводчик и театральный деятель, стоявший у истоков новой белорусской литературы и профессионального национального театра. Он родился в шляхетской семье на территории современного Минского района. Его творческая деятельность пришлась на сложный период после поражения восстания 1830-1831 годов, когда власти запрещали использование белорусского языка в публичной сфере, рассматривая его как потенциальную угрозу. Несмотря на это, Дунин-Марцинкевич сознательно выбрал белорусский язык как инструмент для создания высокого искусства, стремясь поднять его статус и показать богатство и красоту народной речи.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Самым знаменитым произведением Дунина-Марцинкевича стала комическая опера «Идиллия» («Сялянка»), впервые поставленная в 1852 году в его имении под Минском и имевшая огромный успех. Это была первая пьеса на белорусском языке, сыгранная на профессиональной сцене. В своих произведениях, таких как комедия «Пинская шляхта», он с тонким юмором и симпатией изображал жизнь и характеры белорусских крестьян и мелкой шляхты, сочетая реализм с романтическими настроениями. Кроме того, он был блестящим переводчиком и перевел на белорусский язык произведения Адама Мицкевича, Александра Пушкина и Николая Гоголя, доказывая, что белорусский язык способен передавать сложнейшие литературные формы.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
               Деятельность Дунина-Марцинкевича имела огромное культурно-национальное значение. Он не просто писал, а создавал целую среду, организуя спектакли силами своей семьи и крепостных актёров в своём доме в Люцинке (ныне деревня Щомыслица). Его дочь Камила стала одной из первых профессиональных белорусских актрис. После подавления восстания 1863-1864 годов, в котором участвовал его сын Камиль, власти запретили печатать книги на белорусском языке (так называемый «Запрет печати латиницей»), что стало тяжелейшим ударом для писателя. Несмотря на запреты, его наследие стало фундаментом, на котором выросло следующее поколение белорусских литераторов. Сегодня Винцент Дунин-Марцинкевич почитается как patriarch белорусской литературы и театра, его имя носит Национальный академический театр в Бобруйске.

              </Typography>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Vincent };