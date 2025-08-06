import './Result.scss';
import React, { useEffect, useState } from 'react';
import resultImage from './image/image.png';

interface ResultProps {
  onClose: () => void;
  score?: number;
  totalQuestions?: number;
}

const Result: React.FC<ResultProps> = ({ onClose, score = 0, totalQuestions = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Показываем окно сразу при монтировании
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Задержка для анимации
  };

  // Обработчик клика по оверлею
  const handleOverlayClick = () => {
    handleClose();
  };

  // Обработчик клика по контенту (останавливаем всплытие)
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={`modal-overlay ${isVisible ? 'visible' : ''}`} 
      onClick={handleOverlayClick}
    >
      <div className="welcome-content" onClick={handleContentClick}>
        <button className="close-button" onClick={handleClose}>×</button>
        <div className="highlighted-text">ПОЗДРАВЛЯЕМ!!!</div>
        <div className="result-image-container">
          <img src={resultImage} alt="Результат теста" className="result-image" />
        </div>
        <div className="results-score">
          Вы ответили правильно на {score} из {totalQuestions} вопросов
        </div>
      </div>
    </div>
  );
};

export default Result;