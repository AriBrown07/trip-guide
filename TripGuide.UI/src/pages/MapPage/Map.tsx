import './Map.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';
import RoutePlanner from '../../components/RoutePlanner/RoutePlanner';
import YandexSearch from '../../components/YandexSearch/YandexSearch';
import WelcomeBanner from './WelcomeBanner';
import { Menu, X, MapPin, Calendar as CalendarIcon, Wallet, Users, Target, Sparkles } from 'lucide-react';

interface SelectedPlace {
  name: string;
  coordinates: [number, number];
}

interface PredefinedRoute {
  id: number;
  title: string;
  description: string;
  duration: string;
  distance: string;
  places: SelectedPlace[];
  budgetLevel?: 'low' | 'medium' | 'high';
  childFriendly?: boolean;
  purpose?: 'gastronomy' | 'festivals' | 'history';
}

interface CityRoutes {
  city: string;
  coordinates: [number, number];
  routes: PredefinedRoute[];
}

interface CountrywideRoute extends PredefinedRoute {
  cities: string[];
}

function App() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [budget, setBudget] = useState<string>('');
  const [hasChildren, setHasChildren] = useState<string>('Нет');
  const [currency, setCurrency] = useState<string>('BYN');
  const [purpose, setPurpose] = useState<string>('');
  const [selectedPlaces, setSelectedPlaces] = useState<SelectedPlace[]>([]);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeRoute, setActiveRoute] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('Минск');
  const [filteredRoutes, setFilteredRoutes] = useState<PredefinedRoute[]>([]);

  const citiesRoutes: CityRoutes[] = [
    {
      city: 'Минск',
      coordinates: [53.902284, 27.561831],
      routes: [
        {
          id: 1,
          title: "Исторический центр Минска",
          description: "Знакомство с главными достопримечательностями столицы",
          duration: "3-4 часа",
          distance: "5 км",
          places: [
            { name: "Площадь Независимости", coordinates: [53.8939, 27.5464] },
            { name: "Октябрьская площадь", coordinates: [53.9025, 27.5618] },
            { name: "Национальный художественный музей", coordinates: [53.8969, 27.5578] },
            { name: "Верхний город", coordinates: [53.9047, 27.5553] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 2,
          title: "Зеленый маршрут",
          description: "Парки и скверы Минска",
          duration: "5-6 часов",
          distance: "12 км",
          places: [
            { name: "Парк Горького", coordinates: [53.9061, 27.5547] },
            { name: "Ботанический сад", coordinates: [53.9172, 27.6089] },
            { name: "Парк Победы", coordinates: [53.9133, 27.5503] },
            { name: "Лошицкий парк", coordinates: [53.8522, 27.6811] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        },
        {
          id: 3,
          title: "Гастрономический тур",
          description: "Лучшие места белорусской кухни",
          duration: "4-5 часов",
          distance: "8 км",
          places: [
            { name: "Ресторан Раковский Бровар", coordinates: [53.9028, 27.5544] },
            { name: "Камяница", coordinates: [53.9048, 27.5548] },
            { name: "Васильки", coordinates: [53.9006, 27.5594] },
            { name: "Талака", coordinates: [53.8968, 27.5478] }
          ],
          budgetLevel: 'medium',
          childFriendly: true,
          purpose: 'gastronomy'
        }
      ]
    },
    {
      city: 'Брест',
      coordinates: [52.0976, 23.7341],
      routes: [
        {
          id: 6,
          title: "Брестская крепость и город",
          description: "Исторический маршрут по местам воинской славы",
          duration: "1 день",
          distance: "5 км",
          places: [
            { name: "Брестская крепость", coordinates: [52.0826, 23.6553] },
            { name: "Музей обороны Брестской крепости", coordinates: [52.0826, 23.6553] },
            { name: "Пешеходная улица Советская", coordinates: [52.0947, 23.6889] },
            { name: "Музей спасенных ценностей", coordinates: [52.0975, 23.6874] }
          ],
          budgetLevel: 'low',
          childFriendly: true,
          purpose: 'history'
        }
      ]
    }
  ];

  const countrywideRoutes: CountrywideRoute[] = [
    {
      id: 31,
      title: "Замки Беларуси",
      description: "Путешествие по самым известным замкам страны",
      duration: "3 дня",
      distance: "450 км",
      cities: ["Минск", "Гродно", "Мир", "Несвиж"],
      places: [
        { name: "Мирский замок", coordinates: [53.4515, 26.4730] },
        { name: "Несвижский замок", coordinates: [53.2223, 26.6919] },
        { name: "Лидский замок", coordinates: [53.8879, 25.3027] },
        { name: "Гродненский Старый замок", coordinates: [53.6775, 23.8236] }
      ],
      budgetLevel: 'medium',
      childFriendly: true,
      purpose: 'history'
    }
  ];

  useEffect(() => {
    let routesToFilter: PredefinedRoute[] = [];

    if (selectedCity === 'countrywide') {
      routesToFilter = [...countrywideRoutes];
    } else {
      routesToFilter = citiesRoutes.find(city => city.city === selectedCity)?.routes || [];
    }

    let filtered = [...routesToFilter];

    if (budget) {
      const budgetValue = parseFloat(budget);
      if (!isNaN(budgetValue)) {
        filtered = filtered.filter(route => {
          if (route.budgetLevel === 'low' && budgetValue < 100) return true;
          if (route.budgetLevel === 'medium' && budgetValue >= 100 && budgetValue < 300) return true;
          if (route.budgetLevel === 'high' && budgetValue >= 300) return true;
          return false;
        });
      }
    }

    if (hasChildren === 'Да') {
      filtered = filtered.filter(route => route.childFriendly);
    }

    if (purpose) {
      let purposeFilter: 'gastronomy' | 'festivals' | 'history' | '' = '';
      if (purpose === 'Гастрономический туризм') purposeFilter = 'gastronomy';
      if (purpose === 'Праздники и фестивали') purposeFilter = 'festivals';
      if (purpose === 'Музеи и исторические памятники') purposeFilter = 'history';

      if (purposeFilter) {
        filtered = filtered.filter(route => route.purpose === purposeFilter);
      }
    }

    setFilteredRoutes(filtered);
  }, [selectedCity, budget, hasChildren, purpose]);

  const handleRouteSelect = (route: PredefinedRoute) => {
    setSelectedPlaces(route.places);
    setActiveRoute(route.id);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setActiveRoute(null);
    setSelectedPlaces([]);
  };

  const getDaysCount = () => {
    if (startDate && endDate) {
      return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  return (
    <>
      {showWelcomeBanner && (
        <WelcomeBanner onClose={() => setShowWelcomeBanner(false)} />
      )}

      <div className="app-container">
        <button
          className="burger-button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Переключить меню"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h1 className="sidebar-title">Belarus Travel</h1>
            <p className="sidebar-subtitle">Планирование маршрутов</p>
          </div>

          <div className="sidebar-content">
            <div className="filter-section">
              <div className="section-header">
                <MapPin size={18} />
                <h3>Поиск мест</h3>
              </div>
              <YandexSearch
                onPlaceSelect={(place) => {
                  setSelectedPlaces([...selectedPlaces, place]);
                  setActiveRoute(null);
                }}
              />
            </div>

            {selectedPlaces.length > 0 && (
              <div className="filter-section">
                <div className="section-header">
                  <Sparkles size={18} />
                  <h3>Выбранные места</h3>
                </div>
                <div className="selected-places">
                  {selectedPlaces.map((place, index) => (
                    <div key={index} className="place-tag">
                      <MapPin size={14} />
                      <span>{place.name}</span>
                      <button
                        onClick={() => {
                          setSelectedPlaces(selectedPlaces.filter((_, i) => i !== index));
                          setActiveRoute(null);
                        }}
                        className="remove-place"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="filter-section">
              <div className="section-header">
                <MapPin size={18} />
                <h3>Город или регион</h3>
              </div>
              <select
                value={selectedCity}
                onChange={(e) => handleCitySelect(e.target.value)}
                className="select-input"
              >
                <optgroup label="Города">
                  {citiesRoutes.map(city => (
                    <option key={city.city} value={city.city}>{city.city}</option>
                  ))}
                </optgroup>
                <optgroup label="По всей Беларуси">
                  <option value="countrywide">Все маршруты</option>
                </optgroup>
              </select>
            </div>

            <div className="filter-section">
              <div className="section-header">
                <CalendarIcon size={18} />
                <h3>Период путешествия</h3>
              </div>
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                minDate={new Date()}
                monthsShown={1}
                inline
                calendarClassName="custom-calendar"
              />
              {startDate && endDate && (
                <div className="date-summary">
                  <div className="date-info">
                    <span className="date-label">Начало:</span>
                    <span className="date-value">{startDate.toLocaleDateString('ru-RU')}</span>
                  </div>
                  <div className="date-info">
                    <span className="date-label">Окончание:</span>
                    <span className="date-value">{endDate.toLocaleDateString('ru-RU')}</span>
                  </div>
                  <div className="date-info highlight">
                    <span className="date-label">Всего дней:</span>
                    <span className="date-value">{getDaysCount()}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="filter-section">
              <div className="section-header">
                <Wallet size={18} />
                <h3>Бюджет на человека</h3>
              </div>
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
                  name="budget"
                  placeholder="0"
                  defaultValue={0}
                  decimalsLimit={2}
                  onValueChange={(value) => setBudget(value || '')}
                  className="currency-input"
                  intlConfig={{ locale: 'ru-RU', currency: currency }}
                />
              </div>
              {budget && parseFloat(budget) > 0 && (
                <div className="budget-hint">
                  Категория: <strong>
                    {parseFloat(budget) < 100 ? 'Эконом' :
                      parseFloat(budget) < 300 ? 'Средний' : 'Премиум'}
                  </strong>
                </div>
              )}
            </div>

            <div className="filter-section">
              <div className="section-header">
                <Users size={18} />
                <h3>Наличие детей</h3>
              </div>
              <select
                value={hasChildren}
                onChange={(e) => setHasChildren(e.target.value)}
                className="select-input"
              >
                <option value="Да">Да</option>
                <option value="Нет">Нет</option>
              </select>
            </div>

            <div className="filter-section">
              <div className="section-header">
                <Target size={18} />
                <h3>Цель путешествия</h3>
              </div>
              <div className="radio-group">
                {['Гастрономический туризм', 'Праздники и фестивали', 'Музеи и исторические памятники'].map((option) => (
                  <label key={option} className="radio-label">
                    <input
                      type="radio"
                      name="purpose"
                      checked={purpose === option}
                      onChange={() => setPurpose(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section routes-section">
              <div className="section-header">
                <Sparkles size={18} />
                <h3>Готовые маршруты</h3>
                <span className="routes-count">{filteredRoutes.length}</span>
              </div>
              {filteredRoutes.length > 0 ? (
                <div className="routes-list">
                  {filteredRoutes.map(route => (
                    <div
                      key={route.id}
                      className={`route-card ${activeRoute === route.id ? 'active' : ''}`}
                      onClick={() => handleRouteSelect(route)}
                    >
                      <h4 className="route-title">{route.title}</h4>
                      <p className="route-description">{route.description}</p>
                      <div className="route-meta">
                        <span className="meta-item">{route.duration}</span>
                        <span className="meta-divider">•</span>
                        <span className="meta-item">{route.distance}</span>
                        <span className="meta-divider">•</span>
                        <span className="meta-item">{route.places.length} мест</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-routes">
                  Нет маршрутов, соответствующих выбранным фильтрам
                </div>
              )}
            </div>
          </div>
        </aside>

        <main className="main-content">
          <RoutePlanner places={selectedPlaces} />
        </main>
      </div>
    </>
  );
}

export default App;
