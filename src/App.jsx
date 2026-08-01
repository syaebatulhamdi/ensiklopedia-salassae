import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import LandingPage from './pages/LandingPage';
import EdukasiPage from './pages/EdukasiPage';
import PraktikPupukPage from './pages/PraktikPupukPage';

// Kita membuat komponen pembungkus agar bisa menggunakan useLocation()
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    // mode="wait" memastikan halaman lama menghilang dulu sebelum halaman baru muncul
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/edukasi" element={<EdukasiPage />} />
        <Route path="/praktik-pupuk" element={<PraktikPupukPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}