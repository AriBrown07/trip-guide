import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';

const GlobeComponent: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const globe = useRef<any>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    globe.current = new Globe(globeRef.current)
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
      .showAtmosphere(false)
      .pointRadius(150);

    const world = globe.current;
    const controls = world.controls();
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    const resize = () => {
      if (!globeRef.current) return;
      const { clientWidth: w, clientHeight: h } = globeRef.current;
      world.width(w).height(h);
      world.globeOffset([0, 0]);
      world.camera().position.z = window.innerWidth <= 768 ? 300 : 260;
    };

    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
      globeRef.current && (globeRef.current.innerHTML = '');
    };
  }, []);

  return (
    <div
      ref={globeRef}
      style={{ width: '100%', height: '100%', overflow: 'hidden', background: 'transparent' }}
    />
  );
};

export default GlobeComponent;