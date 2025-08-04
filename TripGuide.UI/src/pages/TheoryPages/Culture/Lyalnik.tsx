import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Box, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../PeopleAndCulturePage.module.scss';
import homeIcon from '../../../pics/homelogo.png';
import pic1 from '../../../pics/lalnic-1.jpg';
import pic2 from '../../../pics/lalnic-2.jpg';
import { Link } from 'react-router-dom';
import { timelineEvents } from './TimeLineEvents/timelineEvents'; 

const Lyalnik = () => {
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
              Ляльник
            </Typography>
            <div className={styles.scrollableContent}>
              <Typography variant="body1" className={styles.paragraph}>
                Праздник «Лельник» обычно праздновался накануне Юрьева дня (Егория вешнего). 
                Эти дни назывались также «Красной горкой», потому что местом действия становился холм, расположенный неподалеку от деревни. 
                Там устанавливали небольшую деревянную или дерновую скамью. На нее сажали самую красивую девушку, которая и исполняла роль Ляли (Лели).
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Справа и слева от девушки на холме на скамью укладывались приношения. По одну сторону размещался каравай хлеба, 
                а с другой стороны находился кувшин с молоком, сыр, масло, яйцо и сметана. Вокруг скамьи раскладывали сплетенные венки.
                Девушки водили хоровод вокруг скамьи и пели обрядовые песни, в которых славили божество как кормилицу и подательницу будущего урожая. 
                По ходу пляски и пения сидевшая на скамейке девушка надевала на своих подруг венки. 
                Иногда после праздника на холме разжигали костер (олелию), вокруг которого также водили хороводы и пели песни.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Показательно, что в обрядах, посвященных Лели, всегда отсутствовал мотив похорон, присутствующий в других летних праздниках, например, в Русальной неделе и Дне Ивана Купалы.
                В весенней обрядности повсеместно во всем славянском мире широко применялись различные магические действия с яйцами. На протяжении всей весны происходила раскраска яиц — «писанок», «крашенок» — и различные игры с ними. 
                Церковный пасхальный календарь в значительной мере заслонил архаичную сущность обрядов, связанных с яйцами, но содержание росписи писанок уводит нас в глубокую архаику. Здесь есть и небесные олени, и картины мира, и множество древних символов жизни и плодородия. 
                В этнографических музеях хранятся тысячи писанок, являющихся самым массовым наследием языческих представлений.
              </Typography>

              <Typography variant="body1" className={styles.paragraph}>
                Яйца, как крашеные, так и белые, играли важную роль в весенней обрядности: выезд на первую пахоту производился «с солью, с хлебом, с белым яйцом»; 
                яйцо разбивали о голову коня или пашущего вола; яйцо и печенье-крест были обязательной принадлежностью обрядов при посеве.
                Нередко яйца закапывали в землю, катали по полю, засеянному житом. Яйца клали под ноги скоту при выгоне на юрьев день и лельник, 
                клали в ворота хлева, чтобы скот переступил через них; с яйцами обходили скот и дарили их пастуху.Аналогичные праздники существуют у многих народов Европы. 
                В Италии отмечают примаверу — день первой зелени, в Греции еще с античных времен празднуют в этот день возвращение на землю Персефоны, дочери богини плодородия Деметры.
              </Typography>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Lyalnik };