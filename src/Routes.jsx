import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MealDetails from './pages/MealDetails';


export default function AppRoutes({ quickOnly }) {
  return (
    <Routes>
      <Route path="/" element={<Home quickOnly={quickOnly} />} />
      <Route path="/meal/:id" element={<MealDetails />} />
    </Routes>
  );
}
