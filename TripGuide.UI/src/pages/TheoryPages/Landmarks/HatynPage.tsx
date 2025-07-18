import React, { useState } from 'react';
import { Typography, Button, IconButton, Dialog, DialogContent, Box } from '@mui/material';
import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
import styles from '../LandmarkPage.module.scss';
import hatyn1 from '../../../pics/hatyn-1.jpeg';
import hatyn2 from '../../../pics/hatyn-2.jpg';
import hatyn3 from '../../../pics/hatyn-3.jpg';
import homeIcon from '../../../pics/homelogo.png';
import mapIcon from '../../../pics/mapicon.png';

const HatynPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const images = [
    { id: 1, src: hatyn1, alt: 'Хатынь вид 1' },
    { id: 2, src: hatyn2, alt: 'Хатынь вид 2' },
    { id: 3, src: hatyn3, alt: 'Хатынь вид 3' },
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
              Мемориальный комплекс
            </Typography>
            <Typography variant="h2" className={styles.landmarkName}>
              Хатынь
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
              Во время Второй мировой войны, в начале весны 1943 года белорусские партизаны устроили
              несколько нападений на автомобильные колонны фашистов на дороге из деревни Плещеницы
              в город Логойск. После первой атаки немцы заставили местных жителей вырубать деревья
              по сторонам от трассы, чтобы она хорошо просматривалась. Но партизаны вновь заманили
              фашистов в ловушку: повредили линии связи, а затем обстреляли машины немецких оккупантов, выехавших на место ЧП. 
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Во время короткого боя были убиты несколько фашистов, один из которых любимец Гитлера
              Ганс Вёльке — титулованный спортсмен, обладатель первой для Германии олимпийской золотой
              медали в лёгкой атлетике. Его смерть привела гитлеровцев в ярость.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Фашисты шли по следам партизан и обнаружили их недалеко от деревни Хатынь, однако
              в результате завязавшегося боя белорусским бойцам удалось отступить с минимальными
              потерями. Тогда оккупанты решили выместить свою злость на жителях ближайшей деревни.
              75 детей и почти столько же взрослых загнали в сарай и подожгли постройку. Людей,
              выламывавших двери и вырывавшихся наружу, расстреливали. Из всей деревни выжили лишь
              восемь человек: кто‑то притворился мёртвым, других закрыли своими телами погибшие.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Мемориал на месте трагедии появился в 1969 году. Архитекторам Юрию Градову, Леониду Левину,
              Валентину Занковичу, а также скульптору Сергею Селиханову удалось создать проникновенное место
              памяти. Авторы проекта признавались, что концепцию мемориала определили их первые впечатления
              от увиденного на месте трагедии. Дело в том, что на протяжении 20 лет после окончания войны
              сожжённая деревня оставалась нетронутой: обугленные печные трубы, руины стен и покосившиеся
              обломки оград сохранились здесь как свидетельство страшных событий 1940‑х. Ужас и скорбь
              от созерцания этой картины стали идейной основой проекта.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              К единственному монументу мемориала Хатыни - скульптуры «Непокорённый человек» - ведёт
              центральная аллея. Бронзовый памятник изображает убитого горем отца, который держит на руках
              умирающего сына. В основе композиции — трагическая история одного из жителей деревни, кузнеца
              Иосифа Каминского. Несмотря на сильные ожоги, он выжил: у мужчины было прострелено левое плечо,
              и он притворился убитым. Ночью, когда фашисты ушли из деревни, среди тел односельчан кузнец
              разыскал своего сына Адама: раненный в живот и обожжённый мальчик ещё дышал. Он успел только
              спросить, жива ли мама, и спустя мгновение умер на руках у отца.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              26 уничтоженных огнём домов навечно остались на своих исторических местах в виде проникновенных
              монументов. Они стилизованы под нижние части срубов, символически обозначающих границы строений.
              Возле каждого установлена каменная калитка: она всегда открыта и приглашает гостей зайти, но вот
              только домов уже нет, как и их хозяев. Рядом возвышаются обелиски в форме печных труб: к каждому
              прикреплена мемориальная табличка с именами живших здесь людей. Сверху скульптуры завершаются
              колоколами, которые одновременно звонят каждые 30 секунд. 
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { HatynPage };