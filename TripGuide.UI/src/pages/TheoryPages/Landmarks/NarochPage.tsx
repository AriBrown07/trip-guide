import React, { useState } from 'react';
import { Typography, Button, IconButton, Dialog, DialogContent, Box } from '@mui/material';
import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
import styles from '../LandmarkPage.module.scss';
import naroch1 from '../../../pics/naroch-1.jpg';
import naroch2 from '../../../pics/naroch-2.png';
import naroch3 from '../../../pics/naroch-3.png';
import homeIcon from '../../../pics/homelogo.png';
import mapIcon from '../../../pics/mapicon.png';

const NarochPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const images = [
    { id: 1, src: naroch1, alt: 'Нарочь вид 1' },
    { id: 2, src: naroch2, alt: 'Нарочь вид 2' },
    { id: 3, src: naroch3, alt: 'Нарочь вид 3' },
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
            <div className={styles.titleBlock}>
            <img src={mapIcon} alt="" className={styles.mapIcon} />
            <div className={styles.titleText}>
            <Typography variant="h2" className={styles.landmarkName}>
              Озеро
            </Typography>
            <Typography variant="h2" className={styles.landmarkName}>
              Нарочь
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
              Возникновение озера приходится на период отступления ледника, это произошло
              еще в период до нашей эры. При отступлении ледник встретился с моренной грядой
              и в результате столкновения начал таять. В процессе ледник создал огромное водное
              пространство. Оно впоследствии начало разделяться на мелкие водоемы. В озеро
              стекает 17 различных ручьев, а также протока, которая соединяет Нарочь с другим озером
              Мястро. Из озера вытекает река с идентичным названием. Само озеро Нарочь подразделяется
              на два основных плеса: мелкий и крупный и полуостров Наносы. Неподалеку от северной
              части располагается образовавшийся остров, площадь которого составляет 6,2 гектара.
              Он считается памятником природного достояния.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Вокруг озера ходит множество легенд. Самая известная из них - история любви девушки Галины и отважного
              юноши Василия. До появления озера, на его месте были лишь непроходимый лес, где жил лесник и его дочь Галина,
              девушка неописуемой красоты. Её жених Василий - очень добрый и смелый юноша - был мастер на все руки.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Решил Василий сделать подарок своей любимой и смастерил волшебное зеркало своими руками.
              Для этого он использовал мелкие песчинки из родника, который протекал рядом с его домом.
              Уникальность и волшебство подарка заключалось в том, что если посмотреть в него,
              то можно было узнать свою дальнейшую судьбу.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Однако Галина очень понравилась богатому старому богатому злодею. Красавица не любила его,
              всячески остерегалась, и в конечном итоге отказала ему. Отказ Галины разозлил богача,
              и он решил похитить ее. Узнав об этом, жених девушки бросился спасать любимую.
              Спасая невесту, он убил похитителя и освободил пленницу, отправив ее домой.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Василий же остался один на один с врагом и погиб от рук слуг богача. Вернувшись домой,
              девушка долго ждала своего возлюбленного, но однажды решила посмотреть в подаренное зеркало.
              Увидев погибшего Василия, Галина в ужасе уронила подарок, и зеркало разлетелось на мелкие части.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Согласно легенде, именно из этих осколков и образовалась современная территория
              озера Нарочь. Девушка Галина превратилась в прекрасную белую чайку, которую и сейчас
              можно встретить, летающую над озером. Говорят, что она и посей день разыскивает
              своего любимого Василька и зовет его, до конца так и не поверив в его гибель.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { NarochPage };