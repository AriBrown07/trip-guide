import React from "react";
import { Typography, Button, IconButton } from "@mui/material";
import styles from "./Introductory.module.scss";
import backgroundImage from "../../pics/landmark-bg.png";
import vkIcon from "../../pics/vkLogo.png";
import tgIcon from "../../pics/tgLogo.png";
import instIcon from "../../pics/instLogo.png";
import logo from "../../pics/logo.png"; // Предполагается, что у вас есть файл логотипа
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material"; // Иконки соцсетей

const Introductory: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Шапка */}
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
          <Button className={styles.navButton}>Главная</Button>
          <Button className={styles.navButton}>О нас</Button>
          <Button className={styles.navButton}>Авторизация</Button>
          
          <div className={styles.socialIconsHeader}>
            <a href="https://vk.com" className={styles.socialLink}>
              <img src={vkIcon} alt="VK" className={styles.socialIcon} />
            </a>
            <a href="https://telegram.org" className={styles.socialLink}>
              <img src={tgIcon} alt="Telegram" className={styles.socialIcon} />
            </a>
            <a href="https://instagram.com" className={styles.socialLink}>
              <img src={instIcon} alt="Instagram" className={styles.socialIcon} />
            </a>
          </div>
        </nav>
      </header>

      {/* Разделительная линия */}
      <div className={styles.divider}></div>

      {/* Основной контент */}
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