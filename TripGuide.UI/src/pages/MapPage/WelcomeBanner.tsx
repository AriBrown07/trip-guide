import './WelcomeBanner.scss';
import React, { useEffect, useState } from 'react';

interface WelcomeBannerProps {
  onClose: () => void;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // Обработчик клика по оверлею
  const handleOverlayClick = () => {
    handleClose();
  };

  // Обработчик клика по контенту (чтобы не закрывалось при клике внутри)
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={`welcome-banner ${isVisible ? 'visible' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="welcome-content" onClick={handleContentClick}>
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