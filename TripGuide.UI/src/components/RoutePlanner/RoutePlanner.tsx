import { useState, useEffect } from 'react';
import { decode } from '@mapbox/polyline';
import axios from 'axios';
import Map from '../MapViewer/MapViewer';

type Point = [number, number];

interface MapPoint {
  coordinates: Point;
  name: string;
}

interface RoutePlannerProps {
  places: MapPoint[];
}

export default function RoutePlanner({ places }: RoutePlannerProps) {
  const [points, setPoints] = useState<Point[]>([]);
  const [route, setRoute] = useState<Point[]>([]);
  const [routeInfo, setRouteInfo] = useState<{distance: number, duration: number} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (places.length > 0) {
      setPoints(places.map(p => p.coordinates));
    } else {
      setPoints([]);
      setRoute([]);
      setRouteInfo(null);
    }
  }, [places]);

  const fetchRoute = async () => {
    if (points.length < 2) return;
    
    setIsLoading(true);
    try {
      const coords = points.map(p => `${p[1]},${p[0]}`).join(';');
      
      const response = await axios.get(
        `http://localhost:5000/route/v1/driving/${coords}?overview=full`
      );
      
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

  useEffect(() => {
    if (points.length >= 2) {
      fetchRoute();
    }
  }, [points]);

  return (
    <div className="route-planner">
      <div className="controls">
        <button onClick={fetchRoute} disabled={isLoading || points.length < 2}>
          {isLoading ? 'Загрузка...' : 'Обновить маршрут'}
        </button>
      </div>
      
      <Map route={route} points={places} />
      
      {routeInfo && (
        <div className="route-info">
          <p>Дистанция: {(routeInfo.distance / 1000).toFixed(1)} км</p>
          <p>Время: {Math.floor(routeInfo.duration / 60)} минут</p>
        </div>
      )}
    </div>
  );
}