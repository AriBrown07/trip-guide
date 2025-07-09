import './Map.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import RoutePlanner from "../../components/RoutePlanner/RoutePlanner"

const App: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [budget, setBudget] = useState<string>('');
  const [hasChildren, setHasChildren] = useState<string>('Нет');
  const [currency, setCurrency] = useState<string>('BYN');
  const [purpose, setPurpose] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);

  const popularDestinations = [
    'Минск', 'Брест', 'Гродно', 'Витебск', 'Гомель', 'Могилёв',
    'Брестская крепость', 'Несвижский замок', 'Мирский замок',
    'Беловежская пуща', 'Нарочь', 'Браславские озёра'
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      setSuggestions(
        popularDestinations.filter(dest =>
          dest.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const togglePlaceSelection = (place: string) => {
    setSelectedPlaces(prev =>
      prev.includes(place)
        ? prev.filter(p => p !== place)
        : [...prev, place]
    );
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        {/* Поле поиска */}
        <div className="search-container">
          <div className="search-input-container">

            <input
              type="text"
              placeholder="Куда вы хотите поехать?"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>
          {suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchQuery(suggestion);
                    setSuggestions([]);
                    if (!selectedPlaces.includes(suggestion)) {
                      setSelectedPlaces([...selectedPlaces, suggestion]);
                    }
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Блок выбора дат */}
        <div className="filter-group calendar-section">
          <label>
            Период путешествия
          </label>

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

        {/* Блок мест для посещения */}
        <div className="filter-group">
          <label>Выбранные места</label>
          {selectedPlaces.length > 0 ? (
            <div className="selected-places">
              {selectedPlaces.map((place, index) => (
                <div key={index} className="place-tag">
                  {place}
                  <button
                    onClick={() => togglePlaceSelection(place)}
                    className="remove-place"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-places">Выберите места из поиска выше</div>
          )}
        </div>

        {/* Блок исторических событий */}
        <div className="filter-group historical-events">
          <label>Ближайшие события</label>
          <div className="events-timeline">
            {[
              { date: '2023-09-17', event: 'День народного единства' },
              { date: '2023-07-03', event: 'День Независимости' },
              { date: '2023-05-09', event: 'День Победы' }
            ].map((item) => (
              <div key={item.date} className="event-item">
                <span className="event-date">{new Date(item.date).toLocaleDateString('ru-RU')}</span>
                <span className="event-name">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="map-container">
        <RoutePlanner /> 
      </div>
    </div>
  );
}

export { App };