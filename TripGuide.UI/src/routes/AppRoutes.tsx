// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Weather } from '../pages/Weather/Weather';
import { Introductory } from '../pages/Introductory/Introductory';
import { CountryIntro } from "../pages/CountryIntro/CountryIntro";

import { LoginPage } from '../pages/Login/LoginPage';
import { RegisterPage } from '../pages/Signin/RegisterPage';
import { NotFound } from '../pages/NotFound';
import { App } from '../pages/MapPage/Map';



interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem('authToken') !== null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
     
      <Route path="/" element={<Home />} />
      <Route path="/introductory" element={<Introductory />} />
      <Route path="/CountryIntro" element={<CountryIntro />} />
      <Route path="/weather" element={<Weather />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/sign" element={<RegisterPage />}/>
       <Route path="/map" element={<App />}/>


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
