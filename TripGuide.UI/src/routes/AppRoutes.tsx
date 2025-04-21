import React from "react";
import { Routes, Route } from "react-router-dom";
import { Weather } from "../pages/Weather/Weather";
import { Home } from "../pages/Home/Home";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/weather" element={<Weather />} />
  </Routes>
);

export { AppRoutes };
