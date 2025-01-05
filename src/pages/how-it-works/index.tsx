import React from 'react';
import { OrderTimeline } from './components/OrderTimeline';

export default function HowItWorks() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          So funktioniert der Bestellprozess
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          In wenigen Schritten zu Ihrem Wunschfahrzeug – transparent, digital und unkompliziert.
        </p>
      </div>

      <OrderTimeline />

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-primary-400 to-primary-500 rounded-2xl p-8 lg:p-12 text-white text-center">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
          Bereit für Ihr neues Fahrzeug?
        </h2>
        <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Starten Sie jetzt Ihre unverbindliche Anfrage und profitieren Sie von unseren attraktiven Konditionen.
        </p>
        <button className="bg-white text-primary-500 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/90 transition-colors">
          Fahrzeuge entdecken
        </button>
      </div>
    </div>
  );
}