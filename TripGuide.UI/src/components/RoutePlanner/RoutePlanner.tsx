import { useState } from 'react';
import { decode } from '@mapbox/polyline';
import axios from 'axios';
import Map from '../MapViewer/MapViewer';

type Point = [number, number];

export default function RoutePlanner() {
  const [points, setPoints] = useState<Point[]>([
    [53.9028, 27.5615], // Минск
    [53.8837, 27.4724],
    [53.7837, 27.2724]  // Другая точка
  ]);
  const [route, setRoute] = useState<Point[]>([]);
  const [routeInfo, setRouteInfo] = useState<{distance: number, duration: number} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoute = async () => {
    setIsLoading(true);
    try {
      // Формат координат для OSRM: lon,lat;lon,lat
      const coords = points.map(p => `${p[1]},${p[0]}`).join(';');
      
      const response = await axios.get(
        `http://localhost:5000/route/v1/driving/${coords}?overview=full`
      );
      
      // Декодируем полилайн
      const decodedRoute = decode(response.data.routes[0].geometry);
      setRoute(decodedRoute.map(p => [p[0], p[1]]));
      setRouteInfo({
        distance: response.data.routes[0].distance,
        duration: response.data.routes[0].duration
      });
    } catch (error) {
      console.error('Ошибка при построении маршрута:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="route-planner">
      <div className="controls">
        <button onClick={fetchRoute} disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Построить маршрут'}
        </button>
      </div>
      
      <Map route={route} points={points} />
      
      <div className="route-info">
        {routeInfo && (
          <>
            <p>Дистанция: {(routeInfo.distance / 1000).toFixed(1)} км</p>
            <p>Время: {Math.floor(routeInfo.duration / 60)} минут</p>
          </>
        )}
      </div>
    </div>
  );
}