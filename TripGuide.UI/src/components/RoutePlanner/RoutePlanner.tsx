import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { decode } from '@mapbox/polyline';
import axios from 'axios';
import MapViewer from '../MapViewer/MapViewer';
import GuideModal from '../GuideModal/GuideModal';
import './RoutePlanner.scss'

type Point = [number, number];

interface MapPoint {
  coordinates: Point;
  name: string;
}

interface RoutePlannerProps {
  places: MapPoint[];
}

// Функция расчета расстояния между двумя точками (упрощенная формула гаверсинусов)
function calculateDistance(point1: Point, point2: Point): number {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;
  const R = 6371; // Радиус Земли в км
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Функция оптимизации порядка точек по алгоритму ближайшего соседа
function optimizeRoutePoints(points: Point[]): Point[] {
  if (points.length <= 2) return points;

  const result = [points[0]]; // Начинаем с первой точки
  let remainingPoints = [...points.slice(1)];

  while (remainingPoints.length > 0) {
    const lastPoint = result[result.length - 1];
    let closestIndex = 0;
    let closestDistance = calculateDistance(lastPoint, remainingPoints[0]);

    for (let i = 1; i < remainingPoints.length; i++) {
      const distance = calculateDistance(lastPoint, remainingPoints[i]);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }

    result.push(remainingPoints[closestIndex]);
    remainingPoints.splice(closestIndex, 1);
  }

  return result;
}

export default function RoutePlanner({ places }: RoutePlannerProps) {
  const navigate = useNavigate();
  const [points, setPoints] = useState<Point[]>([]);
  const [optimizedPoints, setOptimizedPoints] = useState<Point[]>([]);
  const [route, setRoute] = useState<Point[]>([]);
  const [routeInfo, setRouteInfo] = useState<{ distance: number, duration: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startPoint, setStartPoint] = useState<MapPoint | null>(null);

  useEffect(() => {
    if (places.length > 0) {
      const newPoints = places.map(p => p.coordinates);
      setPoints(newPoints);

      // Первая выбранная точка - начало маршрута
      if (places.length === 1) {
        setStartPoint(places[0]);
      }

      // Оптимизируем порядок точек при изменении
      if (newPoints.length > 1) {
        const optimized = optimizeRoutePoints(newPoints);
        setOptimizedPoints(optimized);
      } else {
        setOptimizedPoints(newPoints);
      }

      // Сбрасываем маршрут при изменении точек
      setRoute([]);
      setRouteInfo(null);
    } else {
      setPoints([]);
      setOptimizedPoints([]);
      setRoute([]);
      setRouteInfo(null);
      setStartPoint(null);
    }
  }, [places]);

  const fetchRoute = useCallback(async () => {
    if (optimizedPoints.length < 2) {
      setError('Необходимо выбрать как минимум 2 точки');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const coords = optimizedPoints.map(p => `${p[1]},${p[0]}`).join(';');

      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=polyline`
      );

      if (response.data.routes && response.data.routes.length > 0) {
        const decodedRoute = decode(response.data.routes[0].geometry);
        setRoute(decodedRoute.map(p => [p[0], p[1]]));
        setRouteInfo({
          distance: response.data.routes[0].distance,
          duration: response.data.routes[0].duration
        });
      } else {
        throw new Error('Маршрут не найден');
      }
    } catch (error) {
      console.error('Ошибка при построении маршрута:', error);
      setError('Не удалось построить маршрут. Попробуйте изменить точки.');
      setRoute([]);
      setRouteInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, [optimizedPoints]);

  const clearRoute = () => {
    setRoute([]);
    setRouteInfo(null);
  };

  const [isGuideOpen, setIsGuideOpen] = useState(false);
  // prepare attractions names to pass into guide modal
  const attractions = places.map(p => p.name);

  const handleHomeClick = () => {
    navigate('/home');
  };

  return (
    <div className="route-planner">
      <div className="controls">
        {startPoint && (
          <div className="start-point-info">
            <strong>Начальная точка:</strong> {startPoint.name}
          </div>
        )}

        <div className="controls-row">
          <div className="route-buttons">
            <button
              onClick={fetchRoute}
              disabled={isLoading || optimizedPoints.length < 2}
              className={`route-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? 'Построение маршрута...' : 'Построить маршрут'}
            </button>

            {route.length > 0 && (
              <>
                <button
                  onClick={clearRoute}
                  disabled={isLoading}
                  className="route-button clear-button"
                >
                  Удалить маршрут
                </button>

                <button
                  onClick={() => setIsGuideOpen(true)}
                  disabled={isLoading}
                  className="route-button guide-button"
                  title="Открыть аудиогида"
                >
                  ГИД
                </button>
              </>
            )}
          </div>

          <button
            onClick={handleHomeClick}
            className="home-button-corner"
            title="Вернуться на главную"
          >
            <svg className="home-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            Домой
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <MapViewer route={route} points={places} />

      {routeInfo && (
        <div className="route-info">
          <p><strong>Дистанция:</strong> {(routeInfo.distance / 1000).toFixed(1)} км</p>
          <p><strong>Время в пути:</strong> {Math.floor(routeInfo.duration / 60)} мин</p>
          {optimizedPoints.length > 2 && (
            <p className="optimized-notice">
              Оптимизированный маршрут по кратчайшему расстоянию между точками
            </p>
          )}
        </div>
      )}

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        attractions={attractions}
        defaultDescription={`Аудиогид для маршрута из ${places.length} точек`}
      />
    </div>
  );
}