import { useState, useEffect, useRef } from 'react';
import "./YandexSearch.scss"

const YANDEX_SUGGEST_API = 'https://suggest-maps.yandex.ru/v1/suggest';
const YANDEX_GEOCODER_API = 'https://geocode-maps.yandex.ru/1.x/';

interface Place {
  name: string;
  coordinates: [number, number];
}

interface YandexSearchProps {
  onPlaceSelect: (place: Place) => void;
}

export default function YandexSearch({ onPlaceSelect }: YandexSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const SUGGEST_API_KEY = '47d3d6a3-6021-4036-b604-ab5950c51572';
  const GEOCODER_API_KEY = '3562d98a-f820-4a49-9f8b-5c0b232b10b9';

  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `${YANDEX_SUGGEST_API}?apikey=${SUGGEST_API_KEY}&text=${encodeURIComponent(query)}&lang=ru_RU&bbox=23.1784,51.2626,32.7626,56.1721`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuggestions(data.results || []);
      setError(null);
    } catch (err) {
      console.error('Ошибка при запросе подсказок:', err);
      setError('Не удалось загрузить подсказки');
      setSuggestions([]);
    }
  };

  const geocodeAddress = async (address: string) => {
    try {
      const response = await fetch(
        `${YANDEX_GEOCODER_API}?apikey=${GEOCODER_API_KEY}&format=json&geocode=${encodeURIComponent(address)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const pos = data.response.GeoObjectCollection.featureMember[0]
        .GeoObject.Point.pos.split(' ');

      onPlaceSelect({
        name: address,
        coordinates: [parseFloat(pos[1]), parseFloat(pos[0])]
      });
      setError(null);
    } catch (err) {
      console.error('Ошибка геокодирования:', err);
      setError('Не удалось определить координаты места');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="yandex-search-container">
      <div className="search-input-container">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Начните вводить место..."
          className="search-input"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onMouseDown={() => {
                setQuery(suggestion.title.text);
                setShowSuggestions(false);
                geocodeAddress(suggestion.title.text);
              }}
            >
              <div className="suggestion-title">
                {suggestion.title.text}
              </div>
              {suggestion.subtitle?.text && (
                <div className="suggestion-subtitle">
                  {suggestion.subtitle.text}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}