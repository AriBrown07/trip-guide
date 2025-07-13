import { useEffect, useRef, useCallback } from 'react';

type Point = [number, number]; // [lat, lng]

interface MapPoint {
  coordinates: Point;
  name: string;
}

interface MapViewerProps {
  route: Point[];
  points: MapPoint[];
}

declare global {
  interface Window {
    ymaps: any;
  }
}

export default function MapViewer({ route, points }: MapViewerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const geoObjects = useRef<any>(null);

  // Функция обновления карты
  const updateMap = useCallback(() => {
    if (!mapInstance.current || !geoObjects.current) return;

    // Очищаем все объекты
    geoObjects.current.removeAll();

    // Добавляем маршрут
    if (route.length > 1) {
      const polyline = new window.ymaps.Polyline(
        route,
        {},
        { strokeColor: '#0000FF', strokeWidth: 4, strokeOpacity: 0.7 }
      );
      geoObjects.current.add(polyline);
    }

    // Добавляем точки
    points.forEach((point) => {
      const placemark = new window.ymaps.Placemark(
        point.coordinates,
        { balloonContent: point.name },
        { preset: 'islands#blueStretchyIcon' }
      );
      geoObjects.current.add(placemark);
    });

    // Автомасштабирование
    if (geoObjects.current.getLength() > 0) {
      mapInstance.current.setBounds(
        geoObjects.current.getBounds(),
        { checkZoomRange: true, zoomMargin: 50 }
      );
    }
  }, [route, points]);

  // Инициализация карты (выполняется один раз)
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const loadYandexMaps = () => {
      if (window.ymaps) {
        initMap();
      } else {
        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=3562d98a-f820-4a49-9f8b-5c0b232b10b9&lang=ru_RU';
        script.onload = () => {
          window.ymaps.ready(initMap);
        };
        document.body.appendChild(script);
      }
    };

    const initMap = () => {
      window.ymaps.ready(() => {
        // Создаем карту только если ее еще нет
        if (!mapInstance.current) {
          mapInstance.current = new window.ymaps.Map(mapRef.current, {
            center: [53.9, 27.5],
            zoom: 8,
            controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
          });

          // Создаем коллекцию для всех объектов
          geoObjects.current = new window.ymaps.GeoObjectCollection();
          mapInstance.current.geoObjects.add(geoObjects.current);
        }

        updateMap();
      });
    };

    loadYandexMaps();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [updateMap]);

  // Обновление данных на карте
  useEffect(() => {
    if (mapInstance.current) {
      updateMap();
    }
  }, [updateMap]);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
}