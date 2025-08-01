import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users } from "lucide-react";
import { Typography, Button} from "@mui/material";
import styles from "./Introductory.module.scss";
import AboutModal from "./AboutModal";
import AuthModal from "./AuthModal";

import vkIcon from "../../pics/vkLogo.png";
import tgIcon from "../../pics/tgLogo.png";
import instIcon from "../../pics/instLogo.png";
import logo from "../../pics/logo.png";

const Introductory: React.FC = () => {

  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(link);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="МарHistory" className={styles.logoImage} />
          <Typography
            variant="h3"
            className={styles.logoText}
            sx={{
              fontFamily: "'Lobster', sans-serif",
            }}
          >
            МарHistory
          </Typography>
        </div>

        <nav className={styles.nav}>
          <Button className={styles.navButton} onClick={() => handleClick('/home')}>
            Главная
          </Button>
          <Button className={styles.navButton} onClick={() => setIsAboutModalOpen(true)}>
            О нас
          </Button>
          <Button className={styles.navButton} onClick={() => setIsAuthModalOpen(true)}>
            Авторизация
          </Button>

          <div className={styles.socialIconsHeader}>
            <a href="https://vk.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <img src={vkIcon} alt="VK" className={styles.socialIcon} />
            </a>
            <a href="https://telegram.org" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <img src={tgIcon} alt="Telegram" className={styles.socialIcon} />
            </a>
            <a href="https://instagram.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <img src={instIcon} alt="Instagram" className={styles.socialIcon} />
            </a>
          </div>
        </nav>


        <AboutModal
          open={isAboutModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
        />
        <AuthModal
          open={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </header>

      <div className={styles.divider}></div>

      <main className={styles.mainContent}>
        <div className={styles.heroSection}>
          <div className={styles.heroCard}>
            <h1 className={styles.heroTitle}>
              Исследуйте мир исторических достопримечательностей
            </h1>
            <p className={styles.heroDescription}>
              Путешествуйте по карте и узнавайте новое о великих памятниках истории
            </p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <MapPin size={24} />
              </div>
              <h3 className={styles.featureTitle}>Интерактивная карта</h3>
              <p className={styles.featureDescription}>
                Исследуйте тысячи исторических мест по всей Беларуси с подробными описаниями и фотографиями
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Clock size={24} />
              </div>
              <h3 className={styles.featureTitle}>Путешествие во времени</h3>
              <p className={styles.featureDescription}>
                Узнайте историю каждого места - от древних цивилизаций до современности
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Users size={24} />
              </div>
              <h3 className={styles.featureTitle}>Сообщество</h3>
              <p className={styles.featureDescription}>
                Делитесь своими открытиями и изучайте опыт других путешественников
              </p>
            </div>
          </div>

          <div className={styles.journeySection}>
            <h2 className={styles.journeyTitle}>Начните своё путешествие</h2>
      

            <div className={styles.actionButtons}>
              <button className={styles.secondaryButton}>
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Introductory };