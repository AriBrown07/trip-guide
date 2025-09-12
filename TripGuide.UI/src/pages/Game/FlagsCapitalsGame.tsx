import React, { useState, useEffect } from 'react';
import { countries, Country } from './countries';
import { Trophy, Star, RotateCcw, BookOpen, Globe } from 'lucide-react';
import './FlagsCapitalsGame.scss';

type GameMode = 'capitals' | 'flags';
type QuestionType = 'flag-to-capital' | 'capital-to-country' | 'flag-to-country';

interface Question {
  country: Country;
  options: string[];
  correct: string;
  type: QuestionType;
}

export const FlagsCapitalsGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>('capitals');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions] = useState(countries.length);
  const [usedCountries, setUsedCountries] = useState<Set<string>>(new Set());
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const getRandomCountries = (excludeCountry: Country, count: number): Country[] => {
    const filtered = countries.filter(c => c.code !== excludeCountry.code);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const getUnusedCountry = (): Country | null => {
    const availableCountries = countries.filter(c => !usedCountries.has(c.code));
    if (availableCountries.length === 0) return null;
    return availableCountries[Math.floor(Math.random() * availableCountries.length)];
  };

  const generateQuestion = (): Question => {
    const randomCountry = getUnusedCountry();
    if (!randomCountry) {
      // Если все страны использованы, завершаем игру
      setGameFinished(true);
      return {
        country: countries[0],
        options: [],
        correct: '',
        type: 'flag-to-capital'
      };
    }

    const questionTypes: QuestionType[] = gameMode === 'capitals' 
      ? ['flag-to-capital', 'capital-to-country'] 
      : ['flag-to-country'];
    
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const wrongCountries = getRandomCountries(randomCountry, 3);

    let options: string[] = [];
    let correct: string = '';

    switch (questionType) {
      case 'flag-to-capital':
        correct = randomCountry.capital;
        options = [randomCountry.capital, ...wrongCountries.map(c => c.capital)];
        break;
      case 'capital-to-country':
        correct = randomCountry.name;
        options = [randomCountry.name, ...wrongCountries.map(c => c.name)];
        break;
      case 'flag-to-country':
        correct = randomCountry.name;
        options = [randomCountry.name, ...wrongCountries.map(c => c.name)];
        break;
    }

    // Перемешиваем варианты ответов
    options.sort(() => Math.random() - 0.5);

    return {
      country: randomCountry,
      options,
      correct,
      type: questionType
    };
  };

  const getFlagImageUrl = (countryCode: string): string => {
    return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
  };

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setGameStarted(true);
    setScore(0);
    setQuestionNumber(1);
    setUsedCountries(new Set());
    setGameFinished(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setStreak(0);
    setCurrentQuestion(generateQuestion());
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer || showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === currentQuestion?.correct;
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      if (streak + 1 > bestStreak) {
        setBestStreak(streak + 1);
      }
    } else {
      setStreak(0);
    }

    // Добавляем текущую страну в использованные
    if (currentQuestion) {
      setUsedCountries(prev => new Set(Array.from(prev).concat(currentQuestion.country.code)));
    }

    setTimeout(() => {
      if (questionNumber >= totalQuestions || usedCountries.size >= countries.length - 1) {
        setGameFinished(true);
      } else {
        setQuestionNumber(questionNumber + 1);
        setCurrentQuestion(generateQuestion());
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setCurrentQuestion(null);
    setScore(0);
    setQuestionNumber(0);
    setUsedCountries(new Set());
    setSelectedAnswer(null);
    setShowResult(false);
    setStreak(0);
  };

  const getQuestionText = () => {
    if (!currentQuestion) return '';
    
    switch (currentQuestion.type) {
      case 'flag-to-capital':
        return 'Какая столица у этой страны?';
      case 'capital-to-country':
        return `Столица ${currentQuestion.country.capital} принадлежит какой стране?`;
      case 'flag-to-country':
        return 'Флаг какой страны изображен?';
      default:
        return '';
    }
  };

  const shouldShowFlag = () => {
    if (!currentQuestion) return false;
    return currentQuestion.type === 'flag-to-capital' || currentQuestion.type === 'flag-to-country';
  };

  const getButtonClass = (option: string) => {
    if (!showResult) return 'game__option';
    
    if (option === currentQuestion?.correct) {
      return 'game__option game__option--correct';
    } else if (option === selectedAnswer && option !== currentQuestion?.correct) {
      return 'game__option game__option--wrong';
    }
    return 'game__option game__option--disabled';
  };

  if (!gameStarted) {
    return (
      <div className="game">
        <div className="game__scroll">
          <div className="game__content">
            <div className="game__header">
              <Globe className="game__icon" />
              <h1 className="game__title">Знатоки Мира</h1>
              <p className="game__subtitle">Изучение флагов и столиц стран</p>
            </div>
            
            <div className="game__instructions">
              <h2>Выберите режим игры:</h2>
              <p>Проверьте свои знания географии! Пройдите все {countries.length} стран мира.</p>
            </div>
            
            <div className="game__modes">
              <button 
                className="game__mode-btn game__mode-btn--capitals"
                onClick={() => startGame('capitals')}
              >
                <BookOpen className="game__mode-icon" />
                <span className="game__mode-title">Столицы</span>
                <span className="game__mode-desc">Угадай столицы всех {countries.length} стран</span>
              </button>
              
              <button 
                className="game__mode-btn game__mode-btn--flags"
                onClick={() => startGame('flags')}
              >
                <Star className="game__mode-icon" />
                <span className="game__mode-title">Флаги</span>
                <span className="game__mode-desc">Угадай все {countries.length} стран по флагу</span>
              </button>
            </div>
            
            {bestStreak > 0 && (
              <div className="game__stats">
                <Trophy className="game__stats-icon" />
                <span>Лучшая серия: {bestStreak}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameFinished) {
    const percentage = Math.round((score / totalQuestions) * 100);
    let grade = '';
    
    if (percentage >= 90) grade = 'Превосходно!';
    else if (percentage >= 70) grade = 'Хорошо!';
    else if (percentage >= 50) grade = 'Удовлетворительно';
    else grade = 'Нужно больше практики';

    return (
      <div className="game">
        <div className="game__scroll">
          <div className="game__content">
            <div className="game__results">
              <Trophy className="game__results-icon" />
              <h2 className="game__results-title">Игра завершена!</h2>
              <div className="game__results-score">
                <span className="game__results-points">{score}/{usedCountries.size || totalQuestions}</span>
                <span className="game__results-percentage">({percentage}%)</span>
              </div>
              <p className="game__results-grade">{grade}</p>
              
              {bestStreak > 0 && (
                <div className="game__results-streak">
                  <Star className="game__results-streak-icon" />
                  <span>Лучшая серия: {bestStreak}</span>
                </div>
              )}
              
              <div className="game__results-actions">
                <button 
                  className="game__action-btn game__action-btn--primary"
                  onClick={() => startGame(gameMode)}
                >
                  <RotateCcw className="game__action-icon" />
                  Играть снова
                </button>
                
                <button 
                  className="game__action-btn"
                  onClick={resetGame}
                >
                  Выбрать режим
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game">
      <div className="game__scroll">
        <div className="game__content">
          <div className="game__progress">
            <div className="game__progress-info">
              <span className="game__question-counter">
                Вопрос {questionNumber} из {countries.length}
              </span>
              <div className="game__score">
                <Star className="game__score-icon" />
                <span>Очки: {score}</span>
              </div>
            </div>
            
            <div className="game__progress-bar">
              <div 
                className="game__progress-fill"
                style={{ width: `${(questionNumber / countries.length) * 100}%` }}
              />
            </div>
            
            {streak > 0 && (
              <div className="game__streak">
                🔥 Серия: {streak}
              </div>
            )}
          </div>
          
          {currentQuestion && (
            <div className="game__question">
              <div className="game__flag">
                {shouldShowFlag() ? (
                  <div className="game__flag-container">
                    <img 
                      src={getFlagImageUrl(currentQuestion.country.code)}
                      alt={`Флаг ${currentQuestion.country.name}`}
                      className="game__flag-image"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const emojiSpan = target.nextElementSibling as HTMLSpanElement;
                        if (emojiSpan) emojiSpan.style.display = 'block';
                      }}
                    />
                    <span className="game__flag-emoji" style={{ display: 'none' }}>
                      {currentQuestion.country.flag}
                    </span>
                  </div>
                ) : (
                  <span className="game__flag-emoji">{currentQuestion.country.flag}</span>
                )}
                <span className="game__country-name">{currentQuestion.country.name}</span>
              </div>
              
              <h3 className="game__question-text">{getQuestionText()}</h3>
              
              <div className="game__options">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={getButtonClass(option)}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {showResult && (
                <div className={`game__result ${selectedAnswer === currentQuestion.correct ? 'game__result--correct' : 'game__result--wrong'}`}>
                  {selectedAnswer === currentQuestion.correct ? (
                    <div className="game__result-content">
                      <span className="game__result-icon">✅</span>
                      <span className="game__result-text">Правильно!</span>
                    </div>
                  ) : (
                    <div className="game__result-content">
                      <span className="game__result-icon">❌</span>
                      <div className="game__result-info">
                        <span className="game__result-text">Неправильно</span>
                        <span className="game__result-correct">Правильный ответ: {currentQuestion.correct}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          <button 
            className="game__quit-btn"
            onClick={resetGame}
          >
            Выйти из игры
          </button>
        </div>
      </div>
    </div>
  );
};