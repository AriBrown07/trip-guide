import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from "@mui/material";
import styles from "./Introductory.module.scss";
import AboutModal from "./AboutModal";
import AuthModal from "./AuthModal";

import vkIcon from "../../pics/vkLogo.png";
import tgIcon from "../../pics/tgLogo.png";
import instIcon from "../../pics/instLogo.png";
import logo from "../../pics/logo.png";
import planet from "../../pics/planet.png";
import arrow from "../../pics/arrow.png";
import mapIcon from "../../pics/mapicon.png";

const Introductory: React.FC = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(link);
  };

  const handleMapClick = () => {
    navigate('/map'); // или нужный вам маршрут
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>

      {/* Кнопка карты в правом верхнем углу */}
      <div className={styles.mapButton} onClick={handleMapClick}>
        <Typography variant="h6" className={styles.mapText}>
          карта
        </Typography>
        <img src={mapIcon} alt="Map" className={styles.mapIcon} />
      </div>

      <main className={`${styles.mainContent} ${isScrolled ? styles.scrolled : ''}`}>
        {/* Текстовая часть */}
        <div className={styles.textBlock}>
          <Typography variant="h1" className={styles.titleLine}>
            ВАШ МАРШРУТ
          </Typography>
          
          {/* Стрелка между строками */}
          <div className={styles.arrowContainer}>
            <img src={arrow} alt="Arrow" className={styles.arrow} />
          </div>
          
          <Typography variant="h1" className={styles.titleLine}>
            ВАША ИСТОРИЯ
          </Typography>
        </div>
        
        {/* Планета с свечением */}
        <div className={styles.planetContainer}>
          <img src={planet} alt="Planet" className={styles.planetImage} />
          <div className={styles.planetGlow}></div>
        </div>
      </main>

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