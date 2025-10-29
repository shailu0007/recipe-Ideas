import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from './Routes';
import Header from './components/Header';

export default function App() {
  const [quickOnly, setQuickOnly] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header quickOnly={quickOnly} setQuickOnly={setQuickOnly} />

      <main className="w-full mx-auto px-4 py-6">
        <AppRoutes quickOnly={quickOnly} />
      </main>

      <footer className="border-t border-orange-100">
        <div className="max-w-5xl mx-auto px-4 py-6 text-xs text-orange-700">
          Uses TheMealDB public API (no auth) • Test key 1
        </div>
      </footer>
    </div>
  );
}
