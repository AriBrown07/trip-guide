import './Map.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import RoutePlanner from "../../components/RoutePlanner/RoutePlanner";
import YandexSearch from "../../components/YandexSearch/YandexSearch";
import WelcomeBanner from './WelcomeBanner';

interface SelectedPlace {
  name: string;
  coordinates: [number, number];
}

interface PredefinedRoute {
  id: number;
  title: string;
  description: string;
  duration: string;
  places: SelectedPlace[];
  image?: string;
}

const App: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [budget, setBudget] = useState<string>('');
  const [hasChildren, setHasChildren] = useState<string>('Нет');
  const [currency, setCurrency] = useState<string>('BYN');
  const [purpose, setPurpose] = useState<string>('');
  const [selectedPlaces, setSelectedPlaces] = useState<SelectedPlace[]>([]);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState<number | null>(null);

  // Предопределенные маршруты
  const predefinedRoutes: PredefinedRoute[] = [
    {
      id: 1,
      title: "Замки Беларуси",
      description: "Путешествие по самым знаменитым замкам страны",
      duration: "2-3 дня",
      places: [
        { name: "Мирский замок", coordinates: [53.4515, 26.4730] },
        { name: "Несвижский замок", coordinates: [53.2223, 26.6919] },
        { name: "Лида", coordinates: [53.8876, 25.2996] },
        { name: "Гродно", coordinates: [53.6694, 23.8131] }
      ]
    },
    {
      id: 2,
      title: "Природные богатства",
      description: "Красивейшие национальные парки и заповедники",
      duration: "3-4 дня",
      places: [
        { name: "Беловежская пуща", coordinates: [52.5736, 23.7992] },
        { name: "Браславские озера", coordinates: [55.6415, 27.0549] },
        { name: "Нарочанский парк", coordinates: [54.8553, 26.7296] },
        { name: "Березинский заповедник", coordinates: [54.7333, 28.2833] }
      ]
    },
    {
      id: 3,
      title: "Исторические города",
      description: "Знакомство с древними городами Беларуси",
      duration: "4-5 дней",
      places: [
        { name: "Полоцк", coordinates: [55.4856, 28.7686] },
        { name: "Витебск", coordinates: [55.1848, 30.2016] },
        { name: "Могилев", coordinates: [53.9007, 30.3314] },
        { name: "Брест", coordinates: [52.0976, 23.7341] },
        { name: "Пинск", coordinates: [52.1155, 26.1031] }
      ]
    },
    {
      id: 4,
      title: "Исторический центр Минска",
      description: "Знакомство с главными достопримечательностями столицы",
      duration: "3-4 часа",
      places: [
        { name: "Площадь Независимости", coordinates: [53.8939, 27.5464] },
        { name: "Октябрьская площадь", coordinates: [53.9025, 27.5618] },
        { name: "Национальный художественный музей", coordinates: [53.8969, 27.5578] },
        { name: "Верхний город", coordinates: [53.9047, 27.5553] }
      ]
    },
    {
      id: 5,
      title: "Зеленый маршрут",
      description: "Парки и скверы Минска",
      duration: "5-6 часов",
      places: [
        { name: "Парк Горького", coordinates: [53.9061, 27.5547] },
        { name: "Ботанический сад", coordinates: [53.9172, 27.6089] },
        { name: "Парк Победы", coordinates: [53.9133, 27.5503] },
        { name: "Лошицкий парк", coordinates: [53.8522, 27.6811] }
      ]
    },
    {
      id: 6,
      title: "Культурный маршрут",
      description: "Музеи и театры города",
      duration: "6-8 часов",
      places: [
        { name: "Национальный театр оперы и балета", coordinates: [53.9103, 27.5542] },
        { name: "Большой театр Беларуси", coordinates: [53.9103, 27.5542] },
        { name: "Музей истории ВОВ", coordinates: [53.9128, 27.5358] },
        { name: "Национальная библиотека", coordinates: [53.9317, 27.6458] }
      ]
    }
  ];

  const handleRouteSelect = (route: PredefinedRoute) => {
    setSelectedPlaces(route.places);
    setActiveRoute(route.id);
  };

  return (
    <>
      <button
        className="burger-button"
        onClick={() => setIsSidebarOpen(open => !open)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <div className="app-container">
        {showWelcomeBanner && (
          <WelcomeBanner onClose={() => setShowWelcomeBanner(false)} />
        )}

        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="search-container">
            <YandexSearch
              onPlaceSelect={(place) => {
                setSelectedPlaces([...selectedPlaces, place]);
                setActiveRoute(null); // Сбрасываем активный маршрут при ручном выборе
              }}
            />
          </div>

          <div className="filter-group">
            <label>Выбранные места</label>
            {selectedPlaces.length > 0 ? (
              <div className="selected-places">
                {selectedPlaces.map((place, index) => (
                  <div key={index} className="place-tag">
                    {place.name}
                    <button
                      onClick={() => {
                        setSelectedPlaces(selectedPlaces.filter((_, i) => i !== index));
                        setActiveRoute(null); // Сбрасываем активный маршрут при изменении мест
                      }}
                      className="remove-place"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-places">Выберите места из поиска выше или выберите готовый маршрут</div>
            )}
          </div>

          {/* Блок с готовыми маршрутами */}
          <div className="filter-group predefined-routes">
            <label>Готовые маршруты</label>
            <div className="routes-list">
              {predefinedRoutes.map(route => (
                <div
                  key={route.id}
                  className={`route-card ${activeRoute === route.id ? 'active' : ''}`}
                  onClick={() => handleRouteSelect(route)}
                >
                  <h4>{route.title}</h4>
                  <p className="route-description">{route.description}</p>
                  <div className="route-meta">
                    <span className="duration">{route.duration}</span>
                    <span className="places-count">{route.places.length} мест</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Блок выбора дат */}
          <div className="filter-group calendar-section">
            <label>Период путешествия</label>
            <div className="date-range-picker">
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                minDate={new Date()}
                monthsShown={2}
                inline
                calendarClassName="custom-calendar"
                dayClassName={(date) => {
                  if (startDate && endDate && date >= startDate && date <= endDate) {
                    return date.getTime() === startDate.getTime() ||
                      date.getTime() === endDate.getTime()
                      ? 'range-edge' : 'in-range';
                  }
                  return '';
                }}
              />
            </div>

            {startDate && endDate && (
              <div className="date-summary">
                <div className="date-item">
                  <span>Начало:</span>
                  <strong>{startDate.toLocaleDateString('ru-RU')}</strong>
                </div>
                <div className="date-item">
                  <span>Окончание:</span>
                  <strong>{endDate.toLocaleDateString('ru-RU')}</strong>
                </div>
                <div className="date-item highlight">
                  <span>Всего дней:</span>
                  <strong>
                    {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}
                  </strong>
                </div>
              </div>
            )}
          </div>

          {/* Блок бюджета */}
          <div className="filter-group">
            <label htmlFor="budget">
              Бюджет на человека
            </label>
            <div className="budget-input-container">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="currency-select"
              >
                <option value="BYN">BYN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="RUB">RUB</option>
              </select>
              <CurrencyInput
                id="budget"
                name="budget"
                placeholder="Введите сумму"
                defaultValue={0}
                decimalsLimit={2}
                onValueChange={(value) => setBudget(value || '')}
                className="currency-input"
                intlConfig={{ locale: 'ru-RU', currency: currency }}
              />
            </div>
          </div>

          {/* Блок наличия детей */}
          <div className="filter-group">
            <label htmlFor="children">
              Наличие детей
            </label>
            <select
              id="children"
              value={hasChildren}
              onChange={(e) => setHasChildren(e.target.value)}
            >
              <option value="Да">Да</option>
              <option value="Нет">Нет</option>
            </select>
          </div>

          {/* Блок цели путешествия */}
          <div className="filter-group">
            <label>Цель путешествия</label>
            <div className="radio-group">
              {['Гастрономический туризм', 'Праздники и фестивали', 'Музеи и исторические памятники'].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="purpose"
                    checked={purpose === option}
                    onChange={() => setPurpose(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Блок исторических событий */}
          <div className="filter-group historical-events">
            <label>Ближайшие события</label>
            <div className="events-timeline">
              {[
                { date: '2023-09-17', event: 'День народного единства', url: '/folk' },
                { date: '2023-07-03', event: 'День Независимости', url: '/independence' },
                { date: '2023-05-09', event: 'День Победы', url: '/victory' }
              ].map((item) => (
                <a href={item.url} key={item.date} className="event-item-link">
                  <div className="event-item">
                    <span className="event-date">{new Date(item.date).toLocaleDateString('ru-RU')}</span>
                    <span className="event-name">{item.event}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="map-container">
          <RoutePlanner places={selectedPlaces} />
        </div>
      </div>
    </>
  );
}

export { App };