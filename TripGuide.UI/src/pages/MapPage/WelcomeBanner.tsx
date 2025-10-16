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

  const handleOverlayClick = () => {
    handleClose();
  };

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

        <div className="welcome-icon">✈️</div>
        <h2 className="welcome-title">Откройте мир приключений</h2>
        <p className="welcome-description">
          Создайте уникальный маршрут по историческим местам и отправьтесь в незабываемое путешествие
        </p>

        <div className="welcome-features">
          <div className="feature-item">
            <span className="feature-icon">🗺️</span>
            <span className="feature-text">Персональные маршруты</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏛️</span>
            <span className="feature-text">Исторические памятники</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📍</span>
            <span className="feature-text">Интерактивная карта</span>
          </div>
        </div>

        <button className="start-button" onClick={handleClose}>
          Начать путешествие
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;
