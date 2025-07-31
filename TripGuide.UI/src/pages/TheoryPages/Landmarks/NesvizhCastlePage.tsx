import React, { useState, useEffect, useRef } from 'react'; import { Typography, Button, IconButton, Dialog, DialogContent, Box } from '@mui/material';
import { ChevronLeft, ChevronRight} from '@mui/icons-material';
import styles from '../LandmarkPage.module.scss';
import nesvizhCastle1 from '../../../pics/nesvizh1.jpg';
import nesvizhCastle2 from '../../../pics/nesvizh2.jpg';
import nesvizhCastle3 from '../../../pics/nesvizh3.jpeg';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';

const NesvizhCastlePage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = [
    { id: 1, src: nesvizhCastle1, alt: 'Несвижский замок вид 1' },
    { id: 2, src: nesvizhCastle2, alt: 'Несвижский замок вид 2' },
    { id: 3, src: nesvizhCastle3, alt: 'Несвижский замок вид 3' },
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
        const center = [53.222630, 26.692567]; 
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
        searchControl.search('Несвижский Замок').then(() => {
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
                aria-label="Предыдущее фото" >
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
                aria-label="Следующее фото" >
                <ChevronRight />
              </IconButton>
            </Box>
          </DialogContent>
        </Dialog>

        <div className={styles.textBlock}>

          <div className={styles.scrollableContent}>
            <Typography variant="body1" className={styles.paragraph}>
              По одной из версий, в XIII в. хозяином земли, на которой стоит замок, был
              князь Юрий Несвижский — участник знаменитой битвы на Калке между русско‑половецким
              войском и монголами. В XVI в. владельцем Несвижа стал Николай Христофор Сиротка —
              представитель рода Радзивиллов, одного из самых богатых в Великом княжестве Литовском.
              Именно им принадлежали многие земельные владения на территории современной Беларуси.
              Сиротка много путешествовал по Европе и однажды, вернувшись из Италии, решил возвести
              на месте бывшей деревянной усадьбы неприступную цитадель.
            </Typography>
            <Typography variant="body1" className={styles.paragraph}>
              Строительство Несвижского замка началось в 1583 г. по проекту итальянского зодчего
              Джованни Бернардони. Оно растянулось на семь лет. Могущественную крепость окружал
              широкий ров — около столетия она считалась одной из самых совершенных фортификационных
              построек Европы. Только в 1706 г. замок удалось взять шведам, уничтожившим бастионные
              укрепления. Ещё через десятилетие начались работы по реконструкции. Нынешний облик
              архитектурного комплекса — с парадными воротами и пейзажным парком — сформировался
              к началу ХХ в. К этому времени об оборонительном прошлом родового гнезда Радзивиллов
              напоминали лишь ров и земляные валы.
            </Typography>
            <Typography variant="body1" className={styles.paragraph}>
              В 1939 г. в Несвиж вошла Красная армия, и потомки знаменитого княжеского рода оставили замок.
              В годы Великой Отечественной войны фашисты устроили в нём военный госпиталь, а с 1945 г.
              и до 1990‑х гг. тут работал санаторий.
            </Typography>
            <Typography variant="body1" className={styles.paragraph}>
              В начале 2000‑х гг. на территории исторического комплекса начались восстановительные работы.
              В 2011 г. одна из главных до­сто­при­ме­ча­тель­но­стей Беларуси вновь открыла ворота для посетителей.
              Сегодня путешественники приезжают в Несвижский замок не только чтобы посмотреть экспозиции в парадных залах,
              но и ради проводимых тут многочисленных мероприятий. Среди них — балы, концерты, рыцарские турниры.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { NesvizhCastlePage };