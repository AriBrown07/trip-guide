import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Фикс для иконок маркеров
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

type Point = [number, number]; // [lat, lng]

export default function MapViewer({ 
  route, 
  points 
}: {
  route: Point[];
  points: Point[];
}) {
  return (
    <MapContainer 
      center={[53.9, 27.5]} 
      zoom={8} 
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Маршрут */}
      {route.length > 0 && (
        <Polyline positions={route} color="blue" />
      )}

      {/* Точки */}
      {points.map((point, idx) => (
        <Marker key={idx} position={point}>
          <Popup>Точка {idx + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}