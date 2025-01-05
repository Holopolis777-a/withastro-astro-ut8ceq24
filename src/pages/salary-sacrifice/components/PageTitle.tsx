import React from 'react';
import { Car } from 'lucide-react';

export function PageTitle() {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 rounded-xl bg-[#419f49] flex items-center justify-center shadow-lg shadow-[#419f49]/20">
        <Car className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Gehaltsumwandlung
        </h1>
        <p className="text-[#419f49] font-medium mt-1">
          Ihr Weg zum nachhaltigen Dienstwagen
        </p>
      </div>
    </div>
  );
}