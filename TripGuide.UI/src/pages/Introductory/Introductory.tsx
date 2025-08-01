import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, Button, IconButton } from "@mui/material";
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
        <div className={styles.textBlock}>
          <Typography variant="h1" className={styles.title}>
            Исследуйте мир
          </Typography>
          <Typography variant="h1" className={styles.title}>
            исторических
          </Typography>
          <Typography variant="h1" className={styles.title}>
            достопримечательностей
          </Typography>

          <div className={styles.underTitleDivider}></div>

          <Typography variant="h5" className={styles.subtitle}>
            Путешествуйте по карте и узнавайте новое
          </Typography>
        </div>
        
      </main>

    </div>
  );
};

export { Introductory };