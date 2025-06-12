import React from "react";
import { Typography, Button } from "@mui/material";
import styles from "./Introductory.module.scss";
// Вариант 1: Импорт локального изображения
import backgroundImage from "../../assets/landmark-bg.jpg";
// Вариант 2: Использование публичного URL
// const backgroundImage = "https://example.com/landmark-bg.jpg";

const Introductory: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Шапка */}
      <header className={styles.header}>
        <Typography variant="h3" className={styles.logo}>
          МаpHistory
        </Typography>
        <nav className={styles.nav}>
          <Button className={styles.navButton}>Главная</Button>
          <Button className={styles.navButton}>О нас</Button>
          <Button className={styles.navButton}>Авторизация</Button>
        </nav>
      </header>

      {/* Разделительная линия */}
      <div className={styles.divider}></div>

      {/* Основной контент */}
      <main className={styles.mainContent}>
        <div className={styles.textBlock}>
          <Typography variant="h1" className={styles.title}>
            Исследуйте мир исторических достопримечательностей
          </Typography>
          <Typography variant="h5" className={styles.subtitle}>
            Путешествуйте по карте и узнавайте новое
          </Typography>
        </div>
      </main>
    </div>
  );
};

export { Introductory };