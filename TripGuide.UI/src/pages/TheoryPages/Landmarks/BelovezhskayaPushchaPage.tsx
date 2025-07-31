import React, { useState, useEffect, useRef } from 'react';
import { Typography, IconButton, Dialog, DialogContent, Box } from '@mui/material';
import { ChevronLeft, ChevronRight} from '@mui/icons-material';
import styles from '../LandmarkPage.module.scss';
import pushcha1 from '../../../pics/pushcha-1.jpg';
import pushcha2 from '../../../pics/pushcha-2.jpg';
import pushcha3 from '../../../pics/pushcha-3.jpg';
import homeIcon from '../../../pics/homelogo.png';
import { Link } from 'react-router-dom';


const PushchaPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = [
    { id: 1, src: pushcha1, alt: 'Пуща вид 1' },
    { id: 2, src: pushcha2, alt: 'Пуща вид 2' },
    { id: 3, src: pushcha3, alt: 'Пуща вид 3' },
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
      const center = [52.572606, 23.801718]; 
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
      searchControl.search('Музей природы Беловежской пущи').then(() => {
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
              Беловежская пуща — один из самых крупных реликтовых лесов на территории Европы. Его
              флора и фауна существует с древних времён и дошла до нас почти в первозданном виде.
              Сейчас площадь пущи составляет около 160 тысяч гектаров, и только 15 % из растущих в
              ней деревьев — искусственные насаждения. Уникальный природный уголок сохраняет множество
              исчезающих видов животных и растений, а учёные с его помощью определяют изменения климата,
              состояние окружающей среды и изучают историю планеты.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Богатое природными ресурсами место известно человеку с давних времён. Самые ранние захоронения,
              обнаруженные здесь, датируются VII-III веками до н. э. А в XI-XIII столетиях на территории
              пущи проживали племена ятвягов, о чём свидетельствуют курганы и жертвенные камни, найденные у рек.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Со Средних веков Беловежская пуща принадлежала разным государствам, но оставалась одним из
              излюбленных мест для охоты правителей и их приближённых, а также территорией, откуда черпались
              природные ресурсы. Здесь добывали зубров и благородных оленей литовские, польские и русские князья,
              заготавливали провизию для войн, организовывали добычу железа и выгонку смолы из хвойных деревьев.
              А с XVI века пущу стали использовать для лесохозяйственных заготовок.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Несмотря на активное пользование богатствами местной природы, предпринимались и попытки сохранить пущу.
              В 1409 году литовский король Ягайло запретил добычу крупного зверя, в 1577-м на территории ограничили
              охоту на зубров, а в 1795 году Екатерина II запретила охотиться на них совсем, правда, эта инициатива
              не помогла сохранить лес. Императрица раздала земли подданным и разрешила вырубку и охоту на других
              животных, поэтому в пуще были полностью истреблены бобры и медведи. Восстановлением леса занялся уже
              Александр II — он ввёл строгие меры по охране и завёз благородных оленей, чтобы восполнить их популяцию.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              Огромный урон Беловежской пуще нанесла Первая мировая война. Германия заготавливала здесь древесину,
              на хозяйственные нужды шли ценные лесные массивы. В пуще построили лесопильные заводы и железные дороги,
              а всего отсюда вывезли 4,5 миллиона кубометров древесины. При этом на центральном участке пущи создали
              «Парк девственной природы». Он стал прототипом заповедника, который учредили в 1939 году.
            </Typography>

            <Typography variant="body1" className={styles.paragraph}>
              После Второй мировой войны Беловежскую пущу разделила граница Польши и Беларуси. Оба государства
              организовали на ней национальный парк и заповедник: в Беларуси охраняемая территория составляет
              порядка 150 тысяч гектаров, а в Польше — 10 тысяч. В 1992 году ЮНЕСКО внёс лучше всего сохранившийся
              древний участок леса в список Всемирного наследия.
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export { PushchaPage };