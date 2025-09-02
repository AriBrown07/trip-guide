// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Weather } from '../pages/Weather/Weather';
import { Introductory } from '../pages/Introductory/Introductory';
import { CountryIntro } from "../pages/CountryIntro/CountryIntro";
import { TestPage } from "../pages/Test/TestPage";
import { LoginPage } from '../pages/Login/LoginPage';
import { RegisterPage } from '../pages/Signin/RegisterPage';
import NotFound from "../pages/NotFound/NotFound"
import { App } from '../pages/MapPage/Map';

import Folk from '../pages/ExstraInform/Folk';
import Independence from '../pages/ExstraInform/Independence';
import Victory from '../pages/ExstraInform/Victory';
//theory pages
import { MirCastlePage } from '../pages/TheoryPages/Landmarks/MirCastlePage';
import { NesvizhCastlePage } from '../pages/TheoryPages/Landmarks/NesvizhCastlePage';
import { BrestFortressPage } from '../pages/TheoryPages/Landmarks/BrestFortressPage';
import { SophiaCathedralPage } from '../pages/TheoryPages/Landmarks/SophiaCathedralPage';
import { NarochPage } from '../pages/TheoryPages/Landmarks/NarochPage';
import { PalacePage } from '../pages/TheoryPages/Landmarks/RaPPalacePage';
import { HatynPage } from '../pages/TheoryPages/Landmarks/HatynPage';
import { PushchaPage } from '../pages/TheoryPages/Landmarks/BelovezhskayaPushchaPage';
import { PolockPage } from '../pages/TheoryPages/Events/FirstMentionOfPolock';
import { KolasPage } from '../pages/TheoryPages/People/YakubKolasPage';
import { BudnyPage } from '../pages/TheoryPages/People/SymonBudnyPage';
import { GusovskyPage } from '../pages/TheoryPages/People/MykolaGusovskyPage';
import { KupallePage } from '../pages/TheoryPages/Culture/KupallePage';
import { NemigaPage } from '../pages/TheoryPages/Events/NemigaPage';
import { SkarynaPage } from '../pages/TheoryPages/People/SkarynaPage';
import { TurovPage } from '../pages/TheoryPages/Events/Turov';

// my page 

import { BogachPage } from '../pages/TheoryPages/Culture/BogachPage';
import { PalmSunday } from '../pages/TheoryPages/Culture/PalmSunday';
import { Gromnitsy } from '../pages/TheoryPages/Culture/Gromnitsy';
import { Grandfathers } from '../pages/TheoryPages/Culture/Grandfathers';
import { Zazhinki } from '../pages/TheoryPages/Culture/Zazhinki';
import { Kolyada } from '../pages/TheoryPages/Culture/Kolyada';
import { Lyalnik } from '../pages/TheoryPages/Culture/Lyalnik';
import { Carnival } from '../pages/TheoryPages/Culture/Carnival';
import { NewYear } from '../pages/TheoryPages/Culture/NewYear';
import { October } from '../pages/TheoryPages/Culture/October';
import { Cover } from '../pages/TheoryPages/Culture/Cover';
import { Easter } from '../pages/TheoryPages/Culture/Easter';
import { Radunitsa } from '../pages/TheoryPages/Culture/Radunitsa';
import { Sorochiny } from '../pages/TheoryPages/Culture/Sorochiny';
import { Cleanup } from '../pages/TheoryPages/Culture/Cleanup';
import { Generous } from '../pages/TheoryPages/Culture/Generous';
import { Yuriev } from '../pages/TheoryPages/Culture/Yuriev';
import { Apple } from '../pages/TheoryPages/Culture/Apple';
import { Draniki } from '../pages/TheoryPages/Culture/Draniki';
import { Palette } from 'lucide-react';
import { BaptismPage } from '../pages/TheoryPages/Events/Baptism';
import { MenskPage } from '../pages/TheoryPages/Events/Mensk';
import { BorisovPage } from '../pages/TheoryPages/Events/Borisov';
import { UniyaPage } from '../pages/TheoryPages/Events/KrevskayaUniya';
// end my page 

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

      <Route path="/" element={<Introductory/>} />
      <Route path="/introductory" element={<Introductory />} />
      <Route path="/home" element={<CountryIntro />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign" element={<RegisterPage />} />
      <Route path="/map" element={<App />} />
      <Route path="/test" element={<TestPage />} />

      <Route path="/folk" element={<Folk />} />
      <Route path="/independence" element={<Independence />} />
      <Route path="/victory" element={<Victory />} />
      {/* theory pages */}
      <Route path="/kolas" element={<KolasPage />} />
      <Route path="/polock" element={<PolockPage />} />
    {/* 𖦹новые странички𖦹 */}
      <Route path='/turov' element={<TurovPage/>}/>
      <Route path='/baptism' element={<BaptismPage/>}/>
      <Route path='/mensk' element={<MenskPage/>}/>
      <Route path='/borisov' element={<BorisovPage/>}/>
      <Route path='/uniya' element={<UniyaPage/>}/>
    {/* 𖦹новые странички𖦹 */}
      <Route path="/mir" element={<MirCastlePage />} />
      <Route path="/nesvizh" element={<NesvizhCastlePage />} />
      <Route path="/brest" element={<BrestFortressPage />} />
      <Route path="/sophia" element={<SophiaCathedralPage />} />
      <Route path="/naroch" element={<NarochPage />} />
      <Route path="/palace" element={<PalacePage />} />
      <Route path="/hatyn" element={<HatynPage />} />
      <Route path="/pushcha" element={<PushchaPage />} />
      <Route path="/budny" element={<BudnyPage />} />
      <Route path="/gusovsky" element={<GusovskyPage />} />
      <Route path="/kupalle" element={<KupallePage />} />
      <Route path="/nemiga" element={<NemigaPage />} />
      <Route path="/skaryna" element={<SkarynaPage />} />
      <Route path="/bogach" element={<BogachPage />} />
      <Route path="/sunday" element={<PalmSunday />} />
      <Route path="/gromnitsy" element={<Gromnitsy />} />
      <Route path="/grandfathers" element={<Grandfathers/>} />
      <Route path="/zazhinki" element={<Zazhinki/>} />
      <Route path="/kolyada" element={<Kolyada/>} />
      <Route path="/lyalnik" element={<Lyalnik/>} />
      <Route path="/carnival" element={<Carnival/>} />
      <Route path="/newYear" element={<NewYear/>} />
      <Route path="/october" element={<October/>} />
      <Route path="/cover" element={<Cover/>} />
      <Route path="/easter" element={<Easter/>} />
      <Route path="/radunitsa" element={<Radunitsa/>} />
      <Route path="/sorochiny" element={<Sorochiny/>} />
      <Route path="/cleanup" element={<Cleanup/>} />
      <Route path="/generous" element={<Generous/>} />
      <Route path="/yuriev" element={<Yuriev/>} />
      <Route path="/apple" element={<Apple/>} />
      <Route path="/draniki" element={<Draniki/>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};