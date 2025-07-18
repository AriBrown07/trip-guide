import React, { useState } from 'react';
import { Typography, Button, IconButton, Dialog, DialogContent, Box } from '@mui/material';
import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
import styles from '../LandmarkPage.module.scss';
import brestFort1 from '../../../pics/brest-1.jpg';
import brestFort2 from '../../../pics/brest-2.jpg';
import brestFort3 from '../../../pics/brest-3.png';
import homeIcon from '../../../pics/homelogo.png';
import mapIcon from '../../../pics/mapicon.png';

const BrestFortressPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const images = [
    { id: 1, src: brestFort1, alt: 'Брестская крепость вид 1' },
    { id: 2, src: brestFort2, alt: 'Брестская крепость вид 2' },
    { id: 3, src: brestFort3, alt: 'Брестская крепость вид 3' },
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
              Брестская
            </Typography>
            <Typography variant="h2" className={styles.landmarkName}>
              Крепость
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
              Появление в городе Брест‑Литовске (ныне Брест) крепости тесно связано с
              историей падения и раздела Речи Посполитой — объединённого польско‑литовского
              государства. В XVII в. крупной державе, которая строила планы по укреплению
              своего влияния во всей Европе, активно противостояли Россия и Швеция. XVIII в.
              ознаменовался началом Северной войны между тремя государствами, определившей судьбу
              Речи Посполитой. В 1706 г. Брест‑Литовск был захвачен шведами и разграблен,а в конце
              XVIII в., в результате раздела территорий поверженной страны, присоединён к Российской империи.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Брест стал приграничным городом, для защиты которого требовалась крепость.
              Проект сооружения утвердил Николай I в 1830 г., а работы начались только через три года
              и завершились в 1842 г. К концу XIX в., помимо четырёх укреплений-островов и ряда фортов,
              было построено около 70 других оборонительных строений. Но даже это не помогло крепости
              выстоять под натиском немецких войск в Первой мировой войне. Летом 1915 г. тут даже
              разместили командный пункт вражеской армии. Однако Брест‑Литовск вписан в историю
              Первой мировой в связи с другим фактом: здесь в 1918 г. был подписан договор,
              по которому уже послереволюционная Россия официально прекратила военные действия.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В короткий промежуток времени с 1921 по 1939 год Брест сначала перешёл
              под контроль Польши, став оборонительным пунктом от войск вермахта,
              а затем был отвоёван Красной армией и присоединён к территории Советского Союза.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Это место стало первым препятствием на пути войск гитлеровской Германии,
              напавшей на страну в ночь на 22 июня 1941 года. Ранним утром крепость обстреляли
              из артиллерии, а затем начался штурм. Внезапное нападение обернулось для гарнизона
              большими потерями, но герои продолжали бороться. Только в первый день цитадель
              штурмовали восемь раз, и каждая попытка оказывалась неудачной.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Неизвестно, сколько дней длилась оборона Брестской крепости и какое количество
              солдат в ней участвовало. Принято считать, что речь идёт как минимум о месяце боёв
              и 3,5 тысячи советских солдат. И всё же крепость пала. Известно, что одни из 
              последних её защитников были взяты в плен в конце июля 1941 года.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
            Город освободили 24 июля 1944 года. Советские войска, вошедшие в него, обнаружили
            руины старинного укрепления. В течение последующих лет строение восстанавливали,
            а слух о подвиге его героев распространялся среди народа. Крепость стала символом
            бесстрашия советских солдат. В 1965 г. цитадели присвоили звание «крепость‑герой»,
            а через год был открыт Музей обороны Брестской крепости.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { BrestFortressPage };