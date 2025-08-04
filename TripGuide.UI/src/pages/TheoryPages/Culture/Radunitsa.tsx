import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/radonitsa-1.jpg';
import pic2 from '../../../pics/radonitsa-2.png';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Radunitsa = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = [
    { id: 1, src: pic1, alt: '' },
    { id: 2, src: pic2, alt: '' },
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
          Культура Беларуси
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
              Радуница
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
                Во вторник второй недели после Пасхи, через день после Фоминого воскресенья (или Антипасхи), Православная Церковь установила день поминовения усопших, первый после праздника Пасхи.
                Этот день называется Радоницей и считается Пасхой для усопших.
                В день Радоницы христиане символично разделяют пасхальную радость о воскресении Спасителя с членами Церкви, уже оставившими этот мир. По свидетельству святителя Иоанна Златоуста, этот праздник отмечался на христианских кладбищах уже в древности. В Русской православной церкви первое упоминание Радоницы как церковного праздника относится к 14 веку.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Этимологически слово «радоница» восходит к словам «род» и «радость», причем, особое место Радоницы в годичном круге церковных праздников — сразу после Светлой пасхальной недели — как бы обязывает христиан не скорбеть и не сетовать по поводу смерти близких, а, наоборот, радоваться их рождению в другую жизнь — жизнь вечную. Победа над смертью, одержанная смертью и воскресением Христа, вытесняет печаль о временной разлуке с родными.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Именно на Радоницу существовал обычай празднования Пасхи на могилах усопших, куда приносились крашеные яйца и другие пасхальные яства, где совершалась поминальная трапеза и часть приготовленного отдавалась нищей братии на помин души. Такое общение с усопшими, выраженное через простые бытовые действия, отражает веру в то, что они и после смерти не перестают быть членами Церкви Того Бога, Который «не есть Бог мертвых, но живых» (Евангелие от Матфея, 22:32).
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Но в настоящее время православная церковь не приветствует принесение еды на могилы. Поэтому перед посещением кладбища верующему необходимо прийти в церковь к началу службы и подать записку с именами усопших для поминовения, а затем уже рекомендуется привести в порядок могилу, помолиться, зажечь свечу, молча постоять
              </Typography>

               <Typography variant="body1" className={styles.paragraph}>
                Распространившийся же в настоящее время обычай посещать кладбища в самый день Пасхи противоречит древнейшим установлениям Церкви: вплоть до девятого дня после Пасхи поминовение усопших никогда не совершается. Если человек умирает на Пасху, то его хоронят по особому пасхальному чину. Пасха — время особой и исключительной радости, праздник победы над смертью и над всякой скорбью и печалью.
              </Typography>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Radunitsa };