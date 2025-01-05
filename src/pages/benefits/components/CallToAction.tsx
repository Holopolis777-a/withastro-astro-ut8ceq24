import React from 'react';
import { useNavigate } from 'react-router-dom';

export function CallToAction() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/vehicles'); // Navigate to the vehicles page
  };

  return (
    <div className="mt-16 bg-gradient-to-r from-primary-400 to-primary-500 rounded-2xl p-8 lg:p-12 text-white text-center">
      <h2 className="text-2xl lg:text-3xl font-bold mb-4">
        Bereit für Ihr neues Fahrzeug?
      </h2>
      <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Starten Sie jetzt Ihre unverbindliche Anfrage und profitieren Sie von unseren attraktiven Konditionen.
      </p>
      <button 
        onClick={handleClick}
        className="bg-white text-primary-500 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/90 transition-colors"
      >
        Fahrzeuge entdecken
      </button>
    </div>
  );
}