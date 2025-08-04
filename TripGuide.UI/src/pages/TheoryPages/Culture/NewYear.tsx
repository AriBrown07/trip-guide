import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/novigod-1.jpg';
import pic2 from '../../../pics/novigod-2.jpg';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const NewYear = () => {
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
              Новый Год
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
                Новый год в Беларуси – один из самых долгожданных праздников. 
                Дети любят его за предвкушение сказки и волшебства, взрослые – за возможность начать жизнь с чистого листа, оставить, может быть, не самые приятные переживания позади.
                Но и взрослые, и дети ждут подарки от самых близких и родных.

              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Итак, празднование начиналось с Рождества, потом шел Новый год, затем Крещение - итого три ритуальных ужина, на которых обязательно появлялась кутья (рисовая каша). 
                Ее постную выставляли на стол по поводу Рождества и Крещения, а скоромную (то есть щедрую, богатую – с медом и изюмом) - на Новый год.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                На белорусский новогодний стол ставили также 12 различных блюд, каждое из которых символизировало определенное время года. 
                Еда была простой - колбасы, котлеты, масло, сыр, блины, соленые и маринованные овощи, кисели или компоты, рыба, грибы.
                Словом, все, что хранилось в погребе. Накрывая богатый стол на праздник, 
                люди надеялись, что такой достаток будет в семье и весь год, считалось, «как встретишь Новый год, так его и проведешь».

              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Современные новогодние традиции в Беларуси – когда на столе шампанское, оливье и селедка под шубой – пришли из советского прошлого.
                Кое-что привнес в традицию празднования Нового года и XXI век. Например, белорусы стали ездить в гости к Деду Морозу в Беловежскую пущу, 
                где у него появилась своя резиденция. А в деревне Озерцы, что в Поставском районе Витебской области, после долгих лет забвения получил свое новое место жительства Зюзя Поозерский. 
                Божество Зюзя у древних предков белорусов отвечал за зимнюю стужу. По народным легендам, он был пузатым коротышкой со всклоченной бородой и босыми ногами. Большую часть времени Зюзя жил в лесу,
                но зимой заглядывал в деревни и был предвестником морозов. Зюзю упоминали в праздничных обрядах аж до XIX века и считали прообразом Деда Мороза. Накануне Нового года он радушно встречает туристов,
                согревает их горячим травяным чаем из самовара на дровах.
                А еще угощает блинами и пряниками, которые печет по старинным рецептам.
              </Typography>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { NewYear };