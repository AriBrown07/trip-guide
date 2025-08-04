import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/zazinki-1.jpg';
import pic2 from '../../../pics/zazinki-2.jpg';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Zazhinki = () => {
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
              Зажинки
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
                Зажинки (бел. Зажынкі) — один из древнейших земледельческих праздников.
                По одним источникам, он праздновался 21 июля в день Прокопия Жатвенника (Прокопа Жнеца). 
                Считалось, что «Прокоп летний — жней и жатвенник, жатву начинает».
                По другим — 29 июля в день памяти священномученика Афиногена, епископа Пидахвийского.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                В народе считали, что на Афиногена (Финогена) пташки задумываются (замолкают). 
                Лето перешагнуло знойный возраст. «Если этот день с теплом да со светом — уберешься загодя со жнитвом, 
                а коли будет дождливым — хлеб в снопе прорастет» (погода будет сырой). 
                Примерно с этого периода по народным приметам заканчиваются жаркие дни, ночи становятся холоднее.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Традиционно, начало и конец уборки урожая торжественно отмечались и сельской общиной,
                и в каждой семье. Считалось, что каков будет зажин, таковы и Зажинки.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Жатва подводила итог всему многодневному труду крестьянина. К началу жатвы готовились как к большому празднику.
                Хозяйка мыла дом, хозяин убирал двор, гумно. Стол застилали белой скатертью.
                Перед началом жатвы каждая хозяйка или хозяин ходили осматривать свои нивы: поспел ли колос, пора ли жать.
                В некоторых местах проводили обряд «пакрывания поля».
                На Зажинки отправлялись или утром до восхода солнца, или в сумерках.
                Самую первую сжатую жменю колосьев жнея клала не в сноп, а отдельно на поле вместе с хлебом и сыром.
              </Typography>

               <Typography variant="body1" className={styles.paragraph}>
                Потом начинали жать первый сноп — «гаспадарок». Он считался именинным. 
                Обычно его зажинала старшая в семье женщина. Его украшали цветами, несли в дом с песнями и ставили в красный угол под иконы. 
                С него же начинали осенью молотьбу, а соломой кормили больную скотину. Зерна первого снопа считались целебными для людей и птиц.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Вечером каждая семья устраивала праздничный ужин, на котором обязательно была еда, принесенная с поля. Пели специальные песни.
                В современной Беларуси точной даты Зажинки не имеют и отмечаются в день начала уборочной кампании, сохраняя народные традиции празднования.
              </Typography>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Zazhinki };