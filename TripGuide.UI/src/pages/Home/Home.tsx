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
      {/* Pushpin */}
      <button className={styles.pushpinButton} aria-label="Pushpin">
        <img src={pushpin} alt="pushpin" className={styles.pushpinImage} />
      </button>

      {/* Top Panel - Single Line Navigation */}
      <div className={styles.topPanel}>
        <Button className={styles.aboutButton} onClick={() => setIsModalOpen(true)}>
          О нас
        </Button>
        <AboutModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <input
          type="text"
          className={styles.searchField}
          placeholder="Поиск..."
        />

        <IconButton className={styles.searchButton} aria-label="Search">
          <Search />
        </IconButton>

        <button className={styles.mapIcon} aria-label="Map">
          <img src={map} alt="map icon" />
        </button>
      </div>

      {/* Main Container - Only for notebook, positioned to the right */}
      <div className={styles.mainContainer}>
        {/* Notebook - Positioned to the right side */}
        <div className={styles.notebook}>
          <div className={styles.noteHeader} />
          <div className={styles.noteContent}>
            <Typography className={styles.noteText}>
              Это - Ваш персональный помощник по путешествиям. Вращайте планету и выбирайте места, которые хотели бы посетить, чтобы узнать о них больше!
            </Typography>
          </div>
        </div>
      </div>

      {/* Separate Bottom Panel - Bot and Progress Bar positioned at bottom */}
      <div className={styles.bottomPanel}>
        {/* Bot Button */}
        <button className={styles.botButton} aria-label="Bot">
          <img src={botik} alt="bot" className={styles.botImage} />
        </button>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: `${progressValue}%` }}>
            <span className={styles.progressText}>{progressValue}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Home };