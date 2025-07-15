import './WelcomeBanner.scss'
import React, { useEffect, useState } from 'react';
import SecondCar from "./image/SecondCar.png"
import FirstCar from "./image/FirstCar.png"


interface WelcomeBannerProps {
  onClose: () => void;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Задержка для плавного появления
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Ждем завершения анимации
  };

  return (
    <div className={`welcome-banner ${isVisible ? 'visible' : ''}`}>
  
      <div className="welcome-content">
        <button className="close-button" onClick={handleClose}>×</button>
        <div className="text-line">ПОСТРОЙТЕ СВОЙ</div>
        <div className="text-line">ПЕРСОНАЛЬНЫЙ МАРШРУТ</div>
        <div className="text-line">И ОТПРАВЬТЕСЬ В</div>
        <div className="highlighted-text">НЕЗАБЫВАЕМОЕ ПУТЕШЕСТВИЕ</div>
      </div>
    
    </div>
  );
};

export default WelcomeBanner;