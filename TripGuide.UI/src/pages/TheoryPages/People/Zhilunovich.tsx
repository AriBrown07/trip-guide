import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/Zhilunovich-1.jpg';
import pic2 from '../../../pics/Zhilunovich-3.jpg';
import pic3 from '../../../pics/Zhilunovich-3.jpg';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Zhilunovich = () => {
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
              Дмитрий Жилунович (псевдоним Цішка Гартны)
            </Typography>
            <Typography variant="subtitle1" className={styles.figureDates}>
              4 ноября 1887 — 11 апреля 1937
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
                Дмитрий Жилунович, более известный под литературным псевдонимом Цішка Гартны, — белорусский советский писатель, поэт, журналист и политический деятель, один из ключевых организаторов и первых руководителей Белорусской Советской Социалистической Республики (БССР). Он родился в деревне Копти (на Витебщине) в семье сельского кузнеца, рано начал трудовую жизнь, что сформировало его революционные взгляды. Самоучка, страстно тянувшийся к знаниям, он активно включился в революционное движение, стал членом партии эсеров, а затем — большевиков. Его политическая активность и литературный талант сделали его одной из самых заметных фигур в период становления белорусской советской государственности.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                В 1919 году Дмитрий Жилунович вошёл в состав первого советского правительства Беларуси — Исполкома Рады Всебелорусского съезда, а с 1 января по 4 февраля 1919 года занимал пост Председателя Временного рабоче-крестьянского советского правительства БССР, формально являясь первым главой правительства республики. Он был активным участником провозглашения БССР 1 января 1919 года в Смоленске. Однако его пребывание у власти было кратким. Как представитель «национал-коммунистического» течения, он выступал за широкую культурную автономию и развитие белорусского языка в рамках советского строя, что вскоре пришло в противоречие с жёсткой централизаторской линией Москвы.
              </Typography>


              <Typography variant="body1" className={styles.paragraph}>
                Как писатель Цішка Гартны вошёл в историю как один из основоположников белорусской советской литературы. В своём творчестве он воспевал революцию, труд и новую советскую действительность. Его наиболее известные произведения — роман «Соки целины» (1914—1929), повесть «Двое» и многочисленные стихи. Несмотря на лояльность режиму, он, как и многие другие представители белорусской интеллигенции той эпохи, стал жертвой сталинских репрессий. В 1936 году он был арестован по обвинению в национал-демократизме, а в 1937 году — расстрелян. Его имя и литературное наследие были надолго забыты и реабилитированы лишь в годы хрущёвской оттепели. Сегодня его фигура оценивается неоднозначно: с одной стороны, как одного из создателей БССР, с другой — как трагического представителя поколения, чьи национальные и socialistические идеалы были уничтожены тоталитарной системой.
              </Typography>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Zhilunovich };