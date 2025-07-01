import React from "react";
import { Routes, Route } from "react-router-dom";
import { Weather } from "../pages/Weather/Weather";
import { Home } from "../pages/Home/Home";
import { Introductory } from "../pages/Introductory/Introductory";
import { CountryIntro } from "../pages/CountryIntro/CountryIntro";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/weather" element={<Weather />} />
    <Route path="/Introductory" element={<Introductory />} />
    <Route path="/CountryIntro" element={<CountryIntro />} />
  </Routes>
);

export { AppRoutes };