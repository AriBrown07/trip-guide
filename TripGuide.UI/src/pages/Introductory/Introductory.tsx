import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from "@mui/material";
import styles from "./Introductory.module.scss";
import AboutModal from "./AboutModal";
import AuthModal from "./AuthModal";

import logo from "../../pics/logo.png";
import planet from "../../pics/planet.png";
import arrow from "../../pics/arrow.png";
import mapIcon from "../../pics/mapicon.png";

const Introductory: React.FC = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeParticle, setActiveParticle] = useState(0);
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(link);
  };

  const handleMapClick = () => {
    navigate('/map');
  };

  const handleCreateRoute = () => {
    navigate('/map');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    // Анимация частиц
    const particleInterval = setInterval(() => {
      setActiveParticle(prev => (prev + 1) % 3);
    }, 2000);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Парящие частицы */}
      <div className={styles.particles}>
        <div className={`${styles.particle} ${styles.particle1} ${activeParticle === 0 ? styles.active : ''}`}></div>
        <div className={`${styles.particle} ${styles.particle2} ${activeParticle === 1 ? styles.active : ''}`}></div>
        <div className={`${styles.particle} ${styles.particle3} ${activeParticle === 2 ? styles.active : ''}`}></div>
      </div>

     
   

      <main
        className={`${styles.mainContent} ${isScrolled ? styles.scrolled : ''}`}
        style={{
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
        } as React.CSSProperties}
      >
        {/* Текстовая часть */}
        <div className={styles.textBlock}>


          <h1 className={styles.titleLine}>СОЗДАЙ СВОЕ</h1>
          <h1 className={styles.titleLine}>ПУТЕШЕСТВИЕ</h1>

          <h2 className={styles.subtitle}>
            Наше приложение создает персонализированные маршруты
            и сопровождает путешественника аудиогидом
          </h2>

          {/* Кнопка призыва к действию */}
          <div className={styles.ctaContainer}>
            <Button
              className={styles.ctaButton}
              onClick={handleCreateRoute}
              variant="contained"
              size="large"
            >
              Создать свой маршрут
            </Button>
          </div>

          {/* Всплывающие фичи */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎧</span>
              <span>Увлекательные аудио-истории</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🗺️</span>
              <span>Маршруты по вашим интересам</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>⭐</span>
              <span>Персональные рекомендации</span>
            </div>
          </div>
        </div>

        {/* Планета с улучшенной анимацией */}
        <div className={styles.planetContainer}>
          <div className={styles.planetOrbit}>
            <div className={styles.orbitRing}></div>
            <div className={styles.satellite}></div>
          </div>
          <img src={planet} alt="Planet" className={styles.planetImage} />
          <div className={styles.planetGlow}></div>
          <div className={styles.planetPulse}></div>
        </div>
      </main>

      {/* Модальные окна */}

    </div>
  );
};

export { Introductory };