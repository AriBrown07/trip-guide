import React, { useState, useEffect, useRef } from 'react';
import { Typography, IconButton, Dialog, DialogContent, Box } from '@mui/material';
import { ChevronLeft, ChevronRight} from '@mui/icons-material';
import styles from '../LandmarkPage.module.scss';
import mirCastle1 from '../../../pics/mir.png';
import mirCastle2 from '../../../pics/mir-2.png';
import mirCastle3 from '../../../pics/mir-3.png';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';

const MirCastlePage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = [
    { id: 1, src: mirCastle1, alt: 'Мирский замок вид 1' },
    { id: 2, src: mirCastle2, alt: 'Мирский замок вид 2' },
    { id: 3, src: mirCastle3, alt: 'Мирский замок вид 3' },
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
        const center = [53.451148, 26.473278]; 
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
        searchControl.search('Мирский замок').then(() => {
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
              Замковый комплекс «Мир» был образован 1 апреля 2011 г.
              и является музеем республиканского подчинения. Мирский замок в городском
              посёлке Мир - уникальный памятник национальной культуры Беларуси.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В 2000 г. он был включен в Список всемирного культурного и природного
              наследия ЮНЕСКО по следующим критериям: как выдающийся образец
              центрально-европейского замка, который отражает постепенную смену
              культурных стилей (готику, ренессанс, барокко); наглядное отражение
              в форме и внешнем виде ансамбля долгой истории политических и культурных
              противостояний и взаимодействий.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Архитектурный комплекс включает в себя собственно замок XVI – XX вв.,
              земляные валы XVI – XVII вв., пейзажный и регулярный парк, искусственное
              озеро, флигель, часовню-усыпальницу князей Святополк-Мирских с домиком
              сторожа и воротами, придорожную часовню – на площади около 25 гектаров.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              В 1947 г. замок был взят под охрану государства как памятник архитектуры
              XVI – XX вв. С 1987 г. - филиал Национального художественного музея
              Республики Беларусь (в то время – Государственный художественный музей БССР).
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { MirCastlePage };