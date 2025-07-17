import './Result.scss';
import React, { useEffect, useState } from 'react';
import resultImage from './image/image.png';

interface ResultProps {
  onClose: () => void;
  score?: number; // Делаем пропсы необязательными
  totalQuestions?: number;
}

const Result: React.FC<ResultProps> = ({ onClose, score = 0, totalQuestions = 0 }) => {
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

  return (
    <div className={`welcome-banner ${isVisible ? 'visible' : ''}`}>
      <div className="welcome-content">
        <button className="close-button" onClick={handleClose}>×</button>
        <div className="highlighted-text">ПОЗДРАВЛЯЕМ!!!</div>
        <div className="result-image-container">
          <img 
            src={resultImage} 
            alt="Результат теста" 
            className="result-image"
          />
        </div>
        
        {/* Показываем результаты только если они переданы */}
        {(score !== undefined && totalQuestions !== undefined) && (
          <div className="results-score">
            Вы ответили правильно на {score} из 10 вопросов
          </div>
        )}
        
  
        
      </div>
    </div>
  );
};

export default Result;