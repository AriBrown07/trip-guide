import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/domeiko-1.jpg';
import pic2 from '../../../pics/domeiko-2.jpg';
import pic3 from '../../../pics/domeiko-3.jpg';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Domeyko = () => {
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
              Игнат Домейко
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
               31 июля 1802 — 23 января 1889
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
                Игнат (Игнаций) Домейко — национальный герой Чили, выдающийся геолог, минералог, инженер и исследователь, чья судьба неразрывно связана с Беларусью, где он родился и сформировался как личность. Он происходил из знатного шляхетского рода, владевшего имением Медвядка (современная Кореличский район Гродненской области). Домейко получил блестящее образование на физико-математическом факультете Виленского университета, где попал под влияние идей патриотического кружка филоматов, дружил с Адамом Мицкевичем (который вывел его под именем Жеготы в III части поэмы «Дзяды») и Томашем Заном. Его юность была омрачена участием в тайных обществах и последующими репрессиями со стороны царских властей после восстания 1830-1831 годов, что вынудило его эмигрировать.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Спасаясь от преследований, Домейко оказался в Париже, где продолжил учиться в Горной школе. В 1838 году он принял предложение от правительства Чили переехать в Южную Америку для работы в качестве преподавателя химии и минералогии в городе Кокимбо. Эта поездка, planned на несколько лет, превратилась в дело всей его жизни. Домейко всесторонне исследовал геологию, минеральные ресурсы и природу Чили, совершил множество опасных экспедиций, открыл богатейшие месторождения серебра, угля и селитры, составил геологические карты. Его научные труды и педагогическая деятельность заложили основы горнодобывающей промышленности и системы образования в стране.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
              Несмотря на жизнь вдали от родины, Игнат Домейко всегда сохранял связь с белорусской землёй, писал письма на родном языке, интересовался её судьбой. В Чили он стал одной из самых уважаемых и знаковых фигур, его называли «отцом чилийской геологии». В знак признания его заслуг в 1887 году он был избран ректором Чилийского университета. Умер он в Сантьяго, окружённый почётом и славой. Сегодня Игнат Домейко является символом вклада белорусов в мировую науку, его именем названы горный хребет (Кордильера-Домейко), минерал (домейкит), улицы и школы как в Чили, так и в Беларуси, где он почитается как великий учёный и путешественник.
              </Typography>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Domeyko };