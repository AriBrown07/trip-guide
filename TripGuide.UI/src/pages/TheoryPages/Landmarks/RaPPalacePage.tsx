import React, { useState } from 'react';
import { Typography, Button, IconButton, Dialog, DialogContent, Box } from '@mui/material';
import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
import styles from '../LandmarkPage.module.scss';
import palace1 from '../../../pics/palace-1.jpg';
import palace2 from '../../../pics/palace-2.jpg';
import palace3 from '../../../pics/palace-3.jpg';
import homeIcon from '../../../pics/homelogo.png';
import mapIcon from '../../../pics/mapicon.png';

const PalacePage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const images = [
    { id: 1, src: palace1, alt: 'Дворец Румянцевых и Паскевичей вид 1' },
    { id: 2, src: palace2, alt: 'Дворец Румянцевых и Паскевичей вид 2' },
    { id: 3, src: palace3, alt: 'Дворец Румянцевых и Паскевичей вид 3' },
  ];

  const handlePrev = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <IconButton className={styles.homeButton} aria-label="На главную">
          <img src={homeIcon} alt="На главную" className={styles.homeIcon} />
        </IconButton>
        <Typography variant="h1" className={styles.headerTitle}>
          Достопримечательности Беларуси
        </Typography>
      </header>

      <main className={styles.mainContent}>
            <div className={styles.widertitleBlock}>
            <img src={mapIcon} alt="" className={styles.mapIcon} />
            <div className={styles.titleText}>
            <Typography variant="h2" className={styles.landmarkName}>
              Дворец
            </Typography>
            <Typography variant="h2" className={styles.landmarkName}>
              Румянцевых и Паскевичей
            </Typography>
          </div></div>
          {/* Галерея */}
          <div className={styles.galleryWrapper}>
            <IconButton 
              className={styles.arrowButton} 
              onClick={handlePrev}
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className={styles.arrowIcon} />
            </IconButton>
            
            <div className={styles.imageContainer} onClick={openModal}>
              <img 
                src={images[currentImageIndex].src} 
                alt={images[currentImageIndex].alt}
                className={styles.landmarkImage}
              />
            </div>
            
            <IconButton 
              className={styles.arrowButton} 
              onClick={handleNext}
              aria-label="Следующее фото"
            >
              <ChevronRight className={styles.arrowIcon} />
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
          
          <div className={styles.scrollableContent}>
            <Typography variant="body1" className={styles.paragraph}>
              История дворянской резиденции начинается в XVIII веке, когда Екатерина II подарила
              П. Румянцеву за военные заслуги небольшой городок под названием Гомель. Она же
              выделила средства на строительство графской резиденции. Двухэтажный дворец стал
              архитектурным образцом палладианства – одного из направлений раннего классицизма,
              вдохновлённого работами итальянского архитектора А. Палладио. Этот стиль прослеживается
              как в монументальном облике сооружения, так и в деталях интерьера.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              После смерти графа Румянцева дворец унаследовали его сыновья, один
              из которых впоследствии продал семейную резиденцию государству.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В начале XIX века новым владельцем дворца становится военачальник Иван Паскевич. По
              его приказу здание было реконструировано, на прилегающей территории разбит живописный
              парк, куда свозились экзотические растения из разных уголков России и Европы. Парк стал
              воплощением красоты и роскоши – изящные беседки, великолепные газоны, изысканные скульптуры –
              каждая деталь говорила о богатстве и высоком художественном вкусе хозяев имения.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Долгие годы дворец был местом проведения балов, праздничных мероприятий, а также
              хранилищем частных коллекций искусства. Здесь нередко гостили важные гости,
              в том числе представители императорской семьи Романовых.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Семья Паскевичей владела дворцом вплоть до революции, с началом которой здание
              было конфисковано. В 1919 году здесь разместился музей, основой которого стали
              коллекции, собранные за все годы владельцами резиденции.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Во время войны дворец Румянцевых-Паскевичей пострадал, как и большая часть построек Гомеля.
              После победы над фашистскими захватчиками здание было восстановлено и в нём снова заработал музей. 
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В 1995 году было принято решение отреставрировать архитектурную достопримечательность
              Гомеля. Итогом работ стали восстановленные интерьеры комнат XVIII—XIX веков.
              Напротив сооружения был установлен памятник первому владельцу резиденции Петру Румянцеву.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { PalacePage };