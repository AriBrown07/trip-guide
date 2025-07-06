import React, {useState} from "react";
import { Button, IconButton, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import AboutModal from "../Introductory/AboutModal";
import styles from "./Home.module.scss";
import pushpin from "../../pics/Home/emoji_pushpin.png";
import botik from "../../pics/Home/image_bot.png";
import map from "../../pics/Home/icon_map.png";
import GlobeComponent from '../../components/GlobeComponent/GlobeComponent';

const Home: React.FC = () => {

  const progressValue = 40;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (

    <div className={styles.container}>

      {/* Верхняя левая "кнопка" */}
      <button
        className={styles.pushpinButton}
        // onClick={handlePushpinClick}
        aria-label="Pushpin button"
      >
        <img src={pushpin} alt="" className={styles.pushpinImage} />
      </button>

      {/* Нижний левый "ботик" */}
      <button
        className={styles.botButton}
        // onClick={handleBotClick}
        aria-label="Bot button"
      >
        <img src={botik} alt="" className={styles.botImage} />
      </button>

      {/* Центральная планета */}
      <div className={styles.planetWrapper}>
        <div className={styles.planet}>
          <div className={styles.planet1}>
          <GlobeComponent />
          </div>
        </div>
      </div>


      {/* Верхняя панель с элементами управления */}
      <div className={styles.topPanel}>
        <Button className={styles.aboutButton} onClick={() => setIsModalOpen(true)}>О нас</Button>
        <AboutModal open={isModalOpen} onClose={()=>setIsModalOpen(false)} />

        <input
          type="text"
          className={styles.searchField}
          placeholder="Поиск..."
        />

        <IconButton>
          <Search className={styles.searchButton} />
        </IconButton>

        <button className={styles.mapIcon}>
          <img src={map} alt="" className={styles.botImage} />
        </button>
      </div>

      {/* Блокнот справа */}
      <div className={styles.notebook}>
        <div className={styles.noteHeader}></div>
        <div className={styles.noteContent}>
          <Typography className={styles.noteText}>
            Это - Ваш персональный помощник по путешествиям. Вращайте планету и выбирайте места, которые хотели бы посетить, чтобы узнать о них больше!
          </Typography>
        </div>

      </div>

      {/* Прогресс бар */}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressValue}%` }}
        >
          <span className={styles.progressText}>{progressValue}%</span>
        </div>
      </div>

    </div>

  );
};

export { Home };
