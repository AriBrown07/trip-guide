import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three'; // Если используете Three.js

const GlobeComponent: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const world = new Globe(globeRef.current)
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')

      .showAtmosphere(false)
      .pointRadius(150);

    const controls = world.controls();
    controls.enableZoom = false; // Главное отключение
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.8;

    const camera = world.camera();
    camera.position.z = 260; // Уменьшаем это значение для увеличения

    return () => {
      if (globeRef.current) {
        globeRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={globeRef}
      style={{
        width: '120%',
        height: '120%',
        background: 'transparent',
        overflow: 'hidden'
      }}
    />
  );
};

export default GlobeComponent;  