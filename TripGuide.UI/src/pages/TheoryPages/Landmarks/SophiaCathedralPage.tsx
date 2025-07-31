import React, { useState, useEffect, useRef } from 'react';
import { Typography, IconButton, Dialog, DialogContent, Box } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../LandmarkPage.module.scss';
import sophiaCath1 from '../../../pics/sophia-1.jpeg';
import sophiaCath2 from '../../../pics/sophia-2.jpg';
import sophiaCath3 from '../../../pics/sophia-3.jpg';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';

const SophiaCathedralPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = [
    { id: 1, src: sophiaCath1, alt: 'Софийский собор вид 1' },
    { id: 2, src: sophiaCath2, alt: 'Софийский собор вид 2' },
    { id: 3, src: sophiaCath3, alt: 'Софийский собор вид 3' },
  ];

  const handlePrev = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef(false);

  const handleMouseDown = () => {
    dragRef.current = false;
  };

  const handleMouseMove = () => {
    dragRef.current = true;
  };

  const handleClick = () => {
    if (!dragRef.current) {
      window.location.href = '/map';
    }
  };



  useEffect(() => {
      const loadYandexMaps = () => {
        if (window.ymaps) {
          initMap();
        } else {
          const script = document.createElement('script');
          script.src =
            'https://api-maps.yandex.ru/2.1/?apikey=3562d98a-f820-4a49-9f8b-5c0b232b10b9&lang=ru_RU';
          script.onload = () => window.ymaps.ready(initMap);
          document.body.appendChild(script);
        }
      };
    
      const initMap = () => {
        const center = [55.486394, 28.758569]; 
        const map = new window.ymaps.Map(mapContainerRef.current, {
          center,
          zoom: 15,
          controls: ['zoomControl']
        });
    
        // Инициализируем поиск без панели
        const searchControl = new window.ymaps.control.SearchControl({
          options: {
            provider: 'yandex#search',
            noPlacemark: true,
            resultsPerPage: 1
          }
        });
    
        // Выполняем поиск
        searchControl.search('Софийский собор').then(() => {
          const results = searchControl.getResultsArray();
          if (results.length > 0) {
            const org = results[0];
  
            map.setCenter(org.geometry.getCoordinates(), 16);
    
          }
        });
      };
    
      loadYandexMaps();
    }, []);


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/home">
          <IconButton className={styles.homeButton} aria-label="На главную" >
            <img src={homeIcon} alt="На главную" className={styles.homeIcon} />
          </IconButton>
        </Link>
        <Typography variant="h1" className={styles.headerTitle}>
          Достопримечательности Беларуси
        </Typography>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.contentRow}>
          <div className={styles.mapWrapper} ref={mapContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onClick={handleClick} />

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
              Софийский собор в Полоцке стал первым каменным храмом на территории Беларуси.
              Его возведение началось в 1044 г. и продолжалось более двух десятилетий:
              в строительстве принимали участие местные жители и приглашенные европейские мастера.
              Призванный стать символом независимости, воплощением силы Полоцкого княжества,
              Софийский собор создавался по образцу Константинопольского храма, отличавшись лишь
              меньшими размерами. И по воле Всеслава Изеславича, князя полоцкого, желающего подчеркнуть
              важность христианства в государстве, храму отвели почетное место — на берегу
              Западной Двины, в замковом комплексе.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Величественный Софийский собор стал центром религиозной, культурной, просветительской
              жизни Полоцкого княжества: здесь разместилась библиотека с богатейшим собранием редких книг,
              архив, казначейство, магистрат. Здесь принимали важнейших гостей и здесь находили вечный
              покой члены княжеской семьи (во время археологических раскопок в соборе была найдена
              усыпальница с захороненными в ней саркофагами).
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              На протяжении веков Софийский собор в Полоцке был немым свидетелем исторических событий,
              происходивших на белорусской земле, — смена политических курсов и правителей, разрушительные
              войны и сильнейшие пожары… И в судьбе храма эти события находили отражение. В 1596 г.
              Полоцкая София стала униацкой, 1607 и 1648 годах пережила пожары и в ходе реконструкции изменила
              свой облик, лишившись боевых башен. В 1710-м снова была разрушена (собор использовали как склад
              боеприпасов) и снова восстановлена, на этот раз приобрела черты виленского барокко.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Софийский собор в Полоцке был построен по образцу Софийского храма в Константинополе
              и стал четвертым по счету храмом, выполненном в данной стилистике, хотя и с собственными
              уникальными чертами. Так, с Софийскими соборами в Киеве и Новгороде полоцкий храм роднит
              архитектура — крестово-купольная система, пять нефов, широкие галереи. А вот отличает
              наличие вима (алтарное возвышение) и семь глав (символ семи добродетелей). Это было
              грандиозное архитектурное сооружение того времени: 26,4 м в ширину, 31,5 м в длину и 31 м
              в высоту. В качестве строительного материала использовали валуны и обожженный кирпич.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Взрыв, случившийся в храме в начале XVIII в., стал фатальным — Софийский собор был разрушен
              до основания. Восстановлением храма занимался известный зодчий Ян Криштоф Глаубиц, который
              на старинном фундаменте отстроил Софийский собор в стиле виленского барокко. Так появилась
              София, которую каждый из нас сегодня может увидеть в Полоцке — великолепная одноапсидная
              базилика с двумя 50-метровыми башнями. В интерьере появились барочные колонны, лепнина,
              деревянные скульптуры, объемные фигурные карнизы, роскошные фрески. В интерьере храма
              удалось восстановить элементы старинных фресок, а также сохранить алтарь XI века.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { SophiaCathedralPage };