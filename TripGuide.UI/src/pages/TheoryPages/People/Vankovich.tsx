import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/vankovich-1.jpg';
import pic2 from '../../../pics/vankovich-2.jpg';
import pic3 from '../../../pics/vankovich-3.jpg';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Vankovich = () => {
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
              Валентий Ванькович
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
                12 февраля 1800 — 12 мая 1842
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
                Валентий Ванькович — выдающийся белорусский и польский художник, представитель романтизма, мастер портретной и исторической живописи. Он происходил из знатного белорусского шляхетского рода, владевшего имением Калюжицы под Минском. Получив блестящее образование сначала в Полоцком игреческом училище, а затем на факультете изящных искусств Виленского университета и в Императорской Академии художеств в Санкт-Петербурге, Ванькович стал одним из самых талантливых живописцев своего поколения. Его творческая деятельность пришлась на эпоху, когда искусство стало мощным выразителем национальных идей и духовных поисков.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Самыми известными работами Ваньковича стали портреты его великих современников, центральное место среди которых занимает глубокий и психологичный «Портрет Адама Мицкевича на скале Аю-Даг» (1828). Этот образ гениального поэта-изгнанника, написанный во время их встречи в Крыму, стал иконографическим каноном и самым романтическим изображением Мицкевича. Также кисти Ваньковича принадлежат портреты поэта и друга Томаша Зана, композитора Михала Клеофаса Огинского, аристократов и членов собственной семьи. В его творчестве также присутствовала историческая тематика, например, картина «Наполеон у костра», посвящённая событиям 1812 года, которая имела особый резонанс на фоне Ноябрьского восстания (1830-1831).
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Судьба Ваньковича трагически переплелась с историей национально-освободительного движения. После поражения Ноябрьского восстания, в котором он, хоть и не принимал прямого участия, но активно поддерживал его идеи, художник был вынужден эмигрировать из родных земель, находившихся в составе Российской империи. Он переехал в Париж, где вошёл в круг великой эмиграции, общался с Шопеном и Мицкевичем. К сожалению, его жизнь оборвалась рано, в возрасте 42 лет. Несмотря на то, что значительная часть его наследия была утрачена, творчество Валентия Ваньковича остаётся гордостью белорусской культуры, а его работы хранятся в Национальном художественном музее Беларуси, демонстрируя высочайший уровень искусства белорусских земель первой половины XIX века.

              </Typography>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Vankovich };