import React, { useState, useEffect } from 'react';
import { countries, Country } from './countries';
import { Trophy, Star, RotateCcw, BookOpen, Globe, Flag, MapPin, Zap } from 'lucide-react';
import './FlagsCapitalsGame.scss';

type GameMode = 'flags' | 'capitals' | 'mixed';
type QuestionType = 'flag-to-country' | 'flag-to-capital' | 'capital-to-country' | 'country-to-capital';

interface Question {
  country: Country;
  options: string[];
  correct: string;
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GameStats {
  correct: number;
  incorrect: number;
  currentStreak: number;
  bestStreak: number;
  perfectRounds: number;
}


const FloatingShapes = () => (
  <>
    <div className="floating-shape shape-1"></div>
    <div className="floating-shape shape-2"></div>
    <div className="floating-shape shape-3"></div>
  </>
);

const Confetti = () => {
  return (
    <>
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="confetti" />
      ))}
    </>
  );
};

const DifficultyIndicator: React.FC<{ difficulty: string }> = ({ difficulty }) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <div className="difficulty-indicator" style={{ backgroundColor: getDifficultyColor(difficulty) }}>
      {difficulty === 'easy' && '🟢 Легко'}
      {difficulty === 'medium' && '🟡 Средне'}
      {difficulty === 'hard' && '🔴 Сложно'}
    </div>
  );
};

export const FlagsCapitalsGame: React.FC = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('mixed');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [usedCountries, setUsedCountries] = useState<Set<string>>(new Set());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  const [stats, setStats] = useState<GameStats>({
    correct: 0,
    incorrect: 0,
    currentStreak: 0,
    bestStreak: 0,
    perfectRounds: 0
  });

  const totalQuestions = 10;

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

const calculateDifficulty = (country: Country): 'easy' | 'medium' | 'hard' => {
  // Используем другие критерии для определения сложности
  // Например, можно использовать длину названия страны или известность
  
  const nameLength = country.name.length;
  const knownCountries = ['Россия', 'США', 'Китай', 'Германия', 'Франция', 'Великобритания', 'Япония'];
  
  // Известные страны - легкие
  if (knownCountries.includes(country.name)) return 'easy';
  // Страны с очень длинными названиями - сложные
  if (nameLength > 15) return 'hard';
  // Остальные - средние
  return 'medium';
};
  const generateQuestion = (): Question => {
    const randomCountry = getUnusedCountry();
    if (!randomCountry) {
      // Если страны закончились, используем любую случайную
      const randomIndex = Math.floor(Math.random() * countries.length);
      const fallbackCountry = countries[randomIndex];
      
      return {
        country: fallbackCountry,
        options: [fallbackCountry.name, ...getRandomCountries(fallbackCountry, 3).map(c => c.name)],
        correct: fallbackCountry.name,
        type: 'flag-to-country',
        difficulty: 'medium'
      };
    }

    const difficulty = calculateDifficulty(randomCountry);
    let questionTypes: QuestionType[] = [];

    switch (gameMode) {
      case 'flags':
        questionTypes = ['flag-to-country', 'flag-to-capital'];
        break;
      case 'capitals':
        questionTypes = ['capital-to-country', 'country-to-capital'];
        break;
      case 'mixed':
        questionTypes = ['flag-to-country', 'flag-to-capital', 'capital-to-country', 'country-to-capital'];
        break;
      default:
        questionTypes = ['flag-to-country', 'flag-to-capital'];
    }

    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const wrongCountries = getRandomCountries(randomCountry, 3);

    let options: string[] = [];
    let correct: string = '';

    switch (questionType) {
      case 'flag-to-country':
        correct = randomCountry.name;
        options = [randomCountry.name, ...wrongCountries.map(c => c.name)];
        break;
      case 'flag-to-capital':
        correct = randomCountry.capital;
        options = [randomCountry.capital, ...wrongCountries.map(c => c.capital)];
        break;
      case 'capital-to-country':
        correct = randomCountry.name;
        options = [randomCountry.name, ...wrongCountries.map(c => c.name)];
        break;
      case 'country-to-capital':
        correct = randomCountry.capital;
        options = [randomCountry.capital, ...wrongCountries.map(c => c.capital)];
        break;
      default:
        correct = randomCountry.name;
        options = [randomCountry.name, ...wrongCountries.map(c => c.name)];
    }

    // Перемешиваем варианты ответов
    options.sort(() => Math.random() - 0.5);

    return {
      country: randomCountry,
      options,
      correct,
      type: questionType,
      difficulty
    };
  };

  const getFlagImageUrl = (countryCode: string): string => {
    // Добавляем fallback для некорректных кодов стран
    const code = countryCode?.toLowerCase() || 'xx';
    return `https://flagcdn.com/w320/${code}.png`;
  };

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setGameState('playing');
    setStats({
      correct: 0,
      incorrect: 0,
      currentStreak: 0,
      bestStreak: 0,
      perfectRounds: 0
    });
    setUsedCountries(new Set());
    setSelectedAnswer(null);
    setShowResult(false);
    setCombo(0);
    setTimeLeft(30);
    setTimerActive(true);
    setCurrentQuestion(generateQuestion());
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer || showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    setTimerActive(false);
    
    const isCorrect = answer === currentQuestion?.correct;
    const newStats = { ...stats };

    if (isCorrect) {
      newStats.correct++;
      newStats.currentStreak++;
      if (newStats.currentStreak > newStats.bestStreak) {
        newStats.bestStreak = newStats.currentStreak;
      }
      
      // Бонус за комбо
      setCombo(prev => prev + 1);
      
      // Конфетти за серию из 3+ правильных ответов
      if (newStats.currentStreak >= 3) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    } else {
      newStats.incorrect++;
      newStats.currentStreak = 0;
      setCombo(0);
    }

    setStats(newStats);

    // Добавляем страну в использованные
    if (currentQuestion) {
      setUsedCountries(prev => new Set(Array.from(prev).concat(currentQuestion.country.code)));
    }

    setTimeout(() => {
      if (newStats.correct + newStats.incorrect >= totalQuestions) {
        setGameState('finished');
        setShowConfetti(true);
      } else {
        setCurrentQuestion(generateQuestion());
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
        setTimerActive(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setGameState('menu');
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setCombo(0);
    setShowConfetti(false);
  };

  const getQuestionText = (question: Question) => {
    switch (question.type) {
      case 'flag-to-country':
        return 'Флаг какой страны изображен?';
      case 'flag-to-capital':
        return 'Какая столица у этой страны?';
      case 'capital-to-country':
        return `Столица "${question.country.capital}" принадлежит какой стране?`;
      case 'country-to-capital':
        return `Какая столица у ${question.country.name}?`;
      default:
        return '';
    }
  };

  const shouldShowFlag = (question: Question) => {
    return question.type === 'flag-to-country' || question.type === 'flag-to-capital';
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

  // Таймер
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && timerActive) {
      // Время вышло - автоматически неправильный ответ
      handleAnswer('');
    }
  }, [timeLeft, timerActive]);

  const getTimeColor = () => {
    if (timeLeft > 15) return '#10b981';
    if (timeLeft > 5) return '#f59e0b';
    return '#ef4444';
  };

  if (gameState === 'menu') {
    return (
      <div className="game">
        <FloatingShapes />
        <div className="game__scroll">
          <div className="game__content">
            <div className="game__header">
              <Globe className="game__icon" />
              <h1 className="game__title">ГеоМастер</h1>
              <p className="game__subtitle">Проверь свои знания географии!</p>
            </div>
            
            <div className="game__instructions">
              <h2>Выберите режим игры:</h2>
              <p>Ответьте на {totalQuestions} вопросов. Таймер: 30 секунд на вопрос!</p>
              <div className="game__features">
                <div className="feature">
                  <Zap className="feature-icon" />
                  <span>Система комбо и серий</span>
                </div>
                <div className="feature">
                  <Trophy className="feature-icon" />
                  <span>3 уровня сложности</span>
                </div>
                <div className="feature">
                  <Star className="feature-icon" />
                  <span>Разные типы вопросов</span>
                </div>
              </div>
            </div>
            
            <div className="game__modes">
              <button 
                className="game__mode-btn game__mode-btn--flags"
                onClick={() => startGame('flags')}
              >
                <Flag className="game__mode-icon" />
                <span className="game__mode-title">Флаги</span>
                <span className="game__mode-desc">Угадывайте страны и столицы по флагам</span>
              </button>
              
              <button 
                className="game__mode-btn game__mode-btn--capitals"
                onClick={() => startGame('capitals')}
              >
                <MapPin className="game__mode-icon" />
                <span className="game__mode-title">Столицы</span>
                <span className="game__mode-desc">Сопоставляйте страны и их столицы</span>
              </button>
              
              <button 
                className="game__mode-btn game__mode-btn--mixed"
                onClick={() => startGame('mixed')}
              >
                <BookOpen className="game__mode-icon" />
                <span className="game__mode-title">Микс</span>
                <span className="game__mode-desc">Все типы вопросов вперемешку</span>
              </button>
            </div>
            
            {stats.bestStreak > 0 && (
              <div className="game__stats">
                <Trophy className="game__stats-icon" />
                <span>Лучшая серия: {stats.bestStreak}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage = Math.round((stats.correct / totalQuestions) * 100);
    let grade = '';
    let gradeIcon = '';
    
    if (percentage >= 90) {
      grade = 'Великолепно! 🏆';
      gradeIcon = '🏆';
    } else if (percentage >= 70) {
      grade = 'Отлично! ⭐';
      gradeIcon = '⭐';
    } else if (percentage >= 50) {
      grade = 'Хорошо! 👍';
      gradeIcon = '👍';
    } else {
      grade = 'Продолжайте учиться! 📚';
      gradeIcon = '📚';
    }

    return (
      <div className="game">
        <FloatingShapes />
        {showConfetti && <Confetti />}
        <div className="game__scroll">
          <div className="game__content">
            <div className="game__results">
              <Trophy className="game__results-icon" />
              <h2 className="game__results-title">Игра завершена!</h2>
              
              <div className="results-stats">
                <div className="stat">
                  <span className="stat-value">{stats.correct}/{totalQuestions}</span>
                  <span className="stat-label">Правильных ответов</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{percentage}%</span>
                  <span className="stat-label">Точность</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{stats.bestStreak}</span>
                  <span className="stat-label">Лучшая серия</span>
                </div>
              </div>
              
              <div className="game__results-grade">
                <span className="grade-icon">{gradeIcon}</span>
                {grade}
              </div>
              
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
      <FloatingShapes />
      {showConfetti && <Confetti />}
      <div className="game__scroll">
        <div className="game__content">
          <div className="game__progress">
            <div className="game__progress-info">
              <span className="game__question-counter">
                Вопрос {stats.correct + stats.incorrect + 1} из {totalQuestions}
              </span>
              <div className="game__score">
                <Star className="game__score-icon" />
                <span>{stats.correct}</span>
              </div>
            </div>
            
            <div className="game__progress-bar">
              <div 
                className="game__progress-fill"
                style={{ width: `${((stats.correct + stats.incorrect) / totalQuestions) * 100}%` }}
              />
            </div>
            
            <div className="game__meta">
              {combo > 0 && (
                <div className="game__combo">
                  🔥 Комбо: x{combo}
                </div>
              )}
              <div className="game__timer" style={{ color: getTimeColor() }}>
                ⏱️ {timeLeft}с
              </div>
            </div>
          </div>
          
          {currentQuestion && (
            <div className="game__question">
              <div className="question-header">
                <DifficultyIndicator difficulty={currentQuestion.difficulty} />
                {stats.currentStreak > 2 && (
                  <div className="streak-indicator">
                    🔥 Серия: {stats.currentStreak}
                  </div>
                )}
              </div>
              
              <div className="game__flag">
                {shouldShowFlag(currentQuestion) ? (
                  <div className="game__flag-container">
                    <img 
                      src={getFlagImageUrl(currentQuestion.country.code)}
                      alt={`Флаг ${currentQuestion.country.name}`}
                      className="game__flag-image"
                      onError={(e) => {
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
                ) : currentQuestion.type === 'capital-to-country' ? (
                  <div className="capital-display">
                    <MapPin className="capital-icon" />
                    <span className="capital-text">{currentQuestion.country.capital}</span>
                  </div>
                ) : (
                  <div className="country-display">
                    <Globe className="country-icon" />
                    <span className="country-text">{currentQuestion.country.name}</span>
                  </div>
                )}
              </div>
              
              <h3 className="game__question-text">{getQuestionText(currentQuestion)}</h3>
              
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
                      <div className="game__result-info">
                        <span className="game__result-text">Правильно! +1 очко</span>
                        {combo > 1 && <span className="combo-bonus">Комбо x{combo}!</span>}
                      </div>
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