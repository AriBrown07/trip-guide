import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestPage.scss';
import Result from './Result';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}


const TestPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentTest, setCurrentTest] = useState<number>(0);
  const [showResultModal, setShowResultModal] = useState(true);


  const navigate = useNavigate();
  const handleClick = (link: string) => {
    navigate(link);
  };

  const tests: Question[][] = [
    // Тест 1: Полоцкое княжество
    [
      {
        question: "1. Какое княжество было одним из первых государственных образований на территории Беларуси?",
        options: ["Полоцкое княжество", "Киевское княжество", "Галицко-Волынское княжество"],
        correctAnswer: "Полоцкое княжество",
        explanation: "Полоцкое княжество возникло в IX веке и считается одним из первых восточнославянских государственных образований."
      },
      {
        question: "2. Какой город был столицей Полоцкого княжества?",
        options: ["Минск", "Полоцк", "Витебск"],
        correctAnswer: "Полоцк",
        explanation: "Полоцк был политическим и культурным центром княжества."
      },
      {
        question: "3. В каком году впервые упоминается Полоцкое княжество в летописях?",
        options: ["862 год", "980 год", "1066 год"],
        correctAnswer: "862 год",
        explanation: "Первое упоминание о Полоцке содержится в Повести временных лет под 862 годом."
      },
      {
        question: "4. Кто был первым известным князем Полоцка?",
        options: ["Рогволод", "Владимир", "Ярослав Мудрый"],
        correctAnswer: "Рогволод",
        explanation: "Рогволод - первый исторически достоверный князь Полоцка, правивший в X веке."
      },
      {
        question: "5. Какое княжество соперничало с Полоцким за влияние в регионе?",
        options: ["Киевское", "Новгородское", "Смоленское"],
        correctAnswer: "Киевское",
        explanation: "Полоцкое княжество вело длительную борьбу с Киевом за независимость."
      },
      {
        question: "6. Какая известная княжна правила в Полоцком княжестве в XII веке?",
        options: ["Ефросинья Полоцкая", "Ольга", "Анна Ярославна"],
        correctAnswer: "Ефросинья Полоцкая",
        explanation: "Ефросинья Полоцкая - просветительница, основательница монастырей и храмов."
      },
      {
        question: "7. Какой собор был построен в Полоцке в XI веке?",
        options: ["Софийский собор", "Успенский собор", "Петропавловский собор"],
        correctAnswer: "Софийский собор",
        explanation: "Софийский собор в Полоцке построен между 1044-1066 годами."
      },
      {
        question: "8. Какое государство пришло на смену Полоцкому княжеству?",
        options: ["Великое княжество Литовское", "Московское княжество", "Речь Посполитая"],
        correctAnswer: "Великое княжество Литовское",
        explanation: "В XIII-XIV веках Полоцкие земли вошли в состав ВКЛ."
      },
      {
        question: "9. В каком веке Полоцкое княжество потеряло независимость?",
        options: ["XIII век", "XIV век", "XV век"],
        correctAnswer: "XIII век",
        explanation: "В XIII веке Полоцкое княжество вошло в состав ВКЛ."
      },
      {
        question: "10. Какая река была важной для Полоцкого княжества?",
        options: ["Западная Двина", "Днепр", "Неман"],
        correctAnswer: "Западная Двина",
        explanation: "Западная Двина была важным торговым путем для Полоцка."
      }
    ],
    // Тест 2: Великое княжество Литовское
    [
      {
        question: "1. В каком году было основано Великое княжество Литовское?",
        options: ["1240", "1236", "1253"],
        correctAnswer: "1236",
        explanation: "Великое княжество Литовское было основано в 1236 году."
      },
      {
        question: "2. Кто был первым великим князем литовским?",
        options: ["Миндовг", "Гедимин", "Ольгерд"],
        correctAnswer: "Миндовг",
        explanation: "Миндовг стал первым великим князем литовским и короновался в 1253 году."
      },
      {
        question: "3. Какое событие произошло в 1385 году?",
        options: ["Грюнвальдская битва", "Кревская уния", "Люблинская уния"],
        correctAnswer: "Кревская уния",
        explanation: "Кревская уния 1385 года объединила ВКЛ и Польское королевство."
      },
      {
        question: "4. Какой город был столицей ВКЛ?",
        options: ["Вильнюс", "Гродно", "Новогрудок"],
        correctAnswer: "Вильнюс",
        explanation: "Вильнюс стал столицей ВКЛ при Гедимине в 1323 году."
      },
      {
        question: "5. В каком веке ВКЛ достигло наибольшего территориального расширения?",
        options: ["XIII век", "XIV век", "XV век"],
        correctAnswer: "XV век",
        explanation: "Наибольшего расширения ВКЛ достигло в XV веке при Витовте."
      },
      {
        question: "6. В каком году произошла битва на Немиге, упомянутая в «Слове о полку Игореве»?",
        options: ["1067", "1127", "1237"],
        correctAnswer: "1067",
        explanation: "Битва на Немиге между полоцкими и киевскими князьями произошла в 1067 году и стала одним из крупнейших сражений Древней Руси."
      },
      {
        question: "7. Какой город был первой столицей Великого княжества Литовского?",
        options: ["Вильнюс", "Новогрудок", "Гродно"],
        correctAnswer: "Новогрудок",
        explanation: "Новогрудок стал первой столицей ВКЛ в XIII веке до переноса столицы в Вильнюс."
      },
      {
        question: "8. Кто из белорусских первопечатников издал первую книгу на старобелорусском языке?",
        options: ["Франциск Скорина", "Василий Тяпинский", "Сымон Будный"],
        correctAnswer: "Франциск Скорина",
        explanation: "Франциск Скорина в 1517 году издал в Праге «Псалтырь» - первую печатную книгу на старобелорусском языке."
      },
      {
        question: "9. Как называлась первая конституция Великого княжества Литовского, принятая в 1588 году?",
        options: ["Литовский устав", "Статут ВКЛ", "Радомская конституция"],
        correctAnswer: "Статут ВКЛ",
        explanation: "Третий Статут Великого княжества Литовского 1588 года был одним из самых прогрессивных правовых документов Европы того времени."
      },
      {
        question: "10. Какое восстание на территории Беларуси произошло в 1794 году под руководством Тадеуша Костюшко?",
        options: ["Восстание декабристов", "Калиновское восстание", "Восстание под предводительством Костюшко"],
        correctAnswer: "Восстание под предводительством Костюшко",
        explanation: "Восстание 1794 года было попыткой сохранить независимость Речи Посполитой после второго раздела."
      }

    ],
    // Тест 3: Речь Посполитая
    [
      {
        question: "1. В каком году была заключена Люблинская уния?",
        options: ["1569", "1572", "1596"],
        correctAnswer: "1569",
        explanation: "Люблинская уния 1569 года создала Речь Посполитую."
      },
      {
        question: "2. Какие государства объединила Люблинская уния?",
        options: ["ВКЛ и Московия", "ВКЛ и Польша", "Польша и Венгрия"],
        correctAnswer: "ВКЛ и Польша",
        explanation: "Люблинская уния объединила Великое княжество Литовское и Польское королевство."
      },
      {
        question: "3. Как назывался высший законодательный орган Речи Посполитой?",
        options: ["Сейм", "Рада", "Сенат"],
        correctAnswer: "Сейм",
        explanation: "Сейм был высшим законодательным органом Речи Посполитой."
      },
      {
        question: "4. Какой принцип был основой политической системы Речи Посполитой?",
        options: ["Золотая вольность", "Абсолютизм", "Республиканизм"],
        correctAnswer: "Золотая вольность",
        explanation: "Золотая вольность - система шляхетских привилегий и свобод."
      },
      {
        question: "5. В каком году произошли разделы Речи Посполитой?",
        options: ["1772, 1793, 1795", "1768, 1772, 1793", "1791, 1793, 1795"],
        correctAnswer: "1772, 1793, 1795",
        explanation: "Три раздела Речи Посполитой произошли в 1772, 1793 и 1795 годах."
      },
      {
        question: "6. Какой белорусский город первым получил Магдебургское право?",
        options: ["Брест", "Минск", "Полоцк"],
        correctAnswer: "Брест",
        explanation: "Брест получил Магдебургское право в 1390 году - первым из белорусских городов."
      },
      {
        question: "7. В каком году была создана Белорусская Народная Республика?",
        options: ["1917", "1918", "1919"],
        correctAnswer: "1918",
        explanation: "БНР была провозглашена 25 марта 1918 года как первая попытка создания белорусской государственности в XX веке."
      },
      {
        question: "8. Как называлось партизанское соединение под руководством Василия Коржа?",
        options: ["«Красный Октябрь»", "«За Родину»", "«Советская Белоруссия»"],
        correctAnswer: "«Советская Белоруссия»",
        explanation: "Соединение «Советская Белоруссия» под командованием В.З. Коржа было одним из первых партизанских отрядов в Великой Отечественной войне."
      },
      {
        question: "9. В каком году Беларусь стала членом ООН?",
        options: ["1945", "1950", "1991"],
        correctAnswer: "1945",
        explanation: "БССР была одной из стран-основательниц ООН в 1945 году наряду с СССР и УССР."
      },
      {
        question: "10. Какой древний белорусский город называли «Северными Афинами» за его культурное значение?",
        options: ["Полоцк", "Слуцк", "Несвиж"],
        correctAnswer: "Полоцк",
        explanation: "Полоцк в X-XII веках был крупным культурным и образовательным центром, за что получил это почетное название."
      }

    ]
  ];

  const currentQuestions = tests[currentTest];

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: e.target.value
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const handleChangeTest = (testIndex: number) => {
    setCurrentTest(testIndex);
    handleRestart();
  };

  const calculateScore = () => {
    return currentQuestions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const getAnswerClass = (questionIndex: number, option: string) => {
    if (!showResults) return '';
    const question = currentQuestions[questionIndex];

    if (option === question.correctAnswer) return 'correct';
    if (option === selectedAnswers[questionIndex] && option !== question.correctAnswer) return 'incorrect';
    return '';
  };

  return (
    <>


      <div className="test-page">
        {!showResults ? (
          <>
            <div className="progress-indicator">
              {currentQuestion + 1}/{currentQuestions.length}
            </div>

            <div className="test-container">
              <div className="question-text">
                {currentQuestions[currentQuestion].question}
              </div>

              <div className="options-list">
                {currentQuestions[currentQuestion].options.map((option, index) => (
                  <label key={index} className={`option-item ${getAnswerClass(currentQuestion, option)}`}>
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={option}
                      checked={selectedAnswers[currentQuestion] === option}
                      onChange={handleAnswerChange}
                    />
                    <span className="radio-custom"></span>
                    <span className="option-text">{option}</span>
                  </label>
                ))}
              </div>

              <div className="navigation">
                <button
                  className={`nav-btn ${currentQuestion === 0 ? 'disabled' : ''}`}
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                >
                </button>
                <button
                  className={`nav-btn ${currentQuestion === currentQuestions.length - 1 ? 'show-results' : ''}`}
                  onClick={handleNextQuestion}
                >
                  {currentQuestion === currentQuestions.length - 1 ? (
                    "Показать результаты"
                  ) : (
                    ""
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (  
          <div className="results-container">
            {showResultModal && (
              <Result onClose={() => setShowResultModal(false)} />
            )}
            <h2 className="results-title">Результаты теста</h2>
            <p className="results-score">Вы ответили правильно на {calculateScore()} из {currentQuestions.length} вопросов</p>

            <div className="questions-review">
              {currentQuestions.map((question, index) => (
                <div key={index} className="review-item">
                  <h3>{question.question}</h3>
                  <p className="explanation">{question.explanation}</p>
                  <div className="review-options">
                    {question.options.map((option, i) => (
                      <div
                        key={i}
                        className={`review-option ${getAnswerClass(index, option)}`}
                      >
                        {option}
                        {option === question.correctAnswer && <span> (Правильный ответ)</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="test-navigation">
              <button className="restart-btn" onClick={handleRestart}>
                Пройти тест заново
              </button>

              <div className="test-selector">
                <h3>Другие тесты:</h3>
                {tests.map((_, index) => (
                  <button
                    key={index}
                    className={`test-btn ${currentTest === index ? 'active' : ''}`}
                    onClick={() => handleChangeTest(index)}
                  >
                    Тест {index + 1}
                  </button>
                ))}
              </div>
              <button
                className="back-button"
                onClick={() => handleClick('/CountryIntro')}
              >
                Назад
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export { TestPage }; 