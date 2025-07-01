// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Weather } from '../pages/Weather/Weather';
import { Introductory } from '../pages/Introductory/Introductory';
import Login from '../pages/LoginPage';
import { NotFound } from '../pages/NotFound';
import { CountryIntro } from "../pages/CountryIntro/CountryIntro";

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
      <Route path="/login" element={<Login />} />
      <Route path="/introductory" element={<Introductory />} />
      <Route path="/CountryIntro" element={<CountryIntro />} />

      <Route
        path="/weather"
        element={
          <PrivateRoute>
            <Weather />
          </PrivateRoute>
        }
      />


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
