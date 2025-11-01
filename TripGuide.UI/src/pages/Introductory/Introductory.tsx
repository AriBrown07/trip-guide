import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Typography } from "@mui/material";
import styles from "./Introductory.module.scss";
import AboutModal from "./AboutModal";
import AuthModal from "./AuthModal";

import planet from "../../pics/planet.png";
import arrow from "../../pics/arrow.png";
import mapIcon from "../../pics/mapicon.png";

const Introductory: React.FC = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMapClick = () => {
    navigate('/map');
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      e.preventDefault();
      const delta = e.deltaY;
      const slideHeight = window.innerHeight;
      const maxSlide = 1; // У нас 2 слайда (0 и 1)

      if (delta > 0 && currentSlide < maxSlide) {
        // Скролл вниз
        setCurrentSlide(prev => prev + 1);
        containerRef.current.scrollTo({
          top: slideHeight * (currentSlide + 1),
          behavior: 'smooth'
        });
      } else if (delta < 0 && currentSlide > 0) {
        // Скролл вверх
        setCurrentSlide(prev => prev - 1);
        containerRef.current.scrollTo({
          top: slideHeight * (currentSlide - 1),
          behavior: 'smooth'
        });
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartY = e.touches[0].clientY;
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (containerRef.current && Math.abs(diff) > 50) {
        const slideHeight = window.innerHeight;
        const maxSlide = 1;

        if (diff > 0 && currentSlide < maxSlide) {
          // Свайп вверх
          setCurrentSlide(prev => prev + 1);
          containerRef.current.scrollTo({
            top: slideHeight * (currentSlide + 1),
            behavior: 'smooth'
          });
        } else if (diff < 0 && currentSlide > 0) {
          // Свайп вниз
          setCurrentSlide(prev => prev - 1);
          containerRef.current.scrollTo({
            top: slideHeight * (currentSlide - 1),
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('touchend', handleTouchEnd, { once: true });
  };

  return (
    <div 
      className={styles.scrollContainer} 
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
    >
      {/* Слайд 1 - Главная страница */}
      <section className={styles.slide}>
        <div className={styles.mainContent}>
          <div className={styles.textBlock}>
            <Typography variant="h1" className={styles.titleLine}>
              ВАШ МАРШРУТ
            </Typography>
            
            <div className={styles.arrowContainer}>
              <img src={arrow} alt="Arrow" className={styles.arrow} />
            </div>
            
            <Typography variant="h1" className={styles.titleLine}>
              ВАША ИСТОРИЯ
            </Typography>
          </div>
          <div className={styles.planetContainer}>
            <img src={planet} alt="Planet" className={styles.planetImage} />
            <div className={styles.planetGlow}></div>
          </div>
        </div>
      </section>

      {/* Кнопка карты */}
      <div className={styles.mapButton} onClick={handleMapClick}>
        <Typography variant="h6" className={styles.mapText}>
          карта
        </Typography>
        <img src={mapIcon} alt="Map" className={styles.mapIcon} />
      </div>

      {/* Слайд 2 - Вторая страница */}
      {/* <section className={styles.slide}>
        <div className={styles.secondSlide}>
          <div className={styles.secondContent}>
            <Typography variant="h2" className={styles.secondTitle}>
              Откройте мир истории
            </Typography>
            <Typography variant="h5" className={styles.secondSubtitle}>
              Исследуйте исторические места и создавайте свои маршруты
            </Typography>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>📍</div>
                <Typography variant="h6" className={styles.featureTitle}>
                  Исторические места
                </Typography>
                <Typography variant="body1" className={styles.featureText}>
                  Откройте для себя удивительные исторические достопримечательности
                </Typography>
              </div>
              
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🗺️</div>
                <Typography variant="h6" className={styles.featureTitle}>
                  Интерактивная карта
                </Typography>
                <Typography variant="body1" className={styles.featureText}>
                  Создавайте маршруты и изучайте историю в интерактивном формате
                </Typography>
              </div>
              
              <div className={styles.feature}>
                <div className={styles.featureIcon}>📚</div>
                <Typography variant="h6" className={styles.featureTitle}>
                  Погружение в историю
                </Typography>
                <Typography variant="body1" className={styles.featureText}>
                  Узнавайте интересные факты и истории о каждом месте
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <AboutModal
        open={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
      <AuthModal
        open={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export { Introductory };