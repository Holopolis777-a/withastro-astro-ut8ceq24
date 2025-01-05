import React from 'react';

interface KilometerSelectorProps {
  selectedKilometers: 10000 | 15000 | 20000;
  onChange: (kilometers: 10000 | 15000 | 20000) => void;
}

export function KilometerSelector({ selectedKilometers, onChange }: KilometerSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Inklusivkilometer pro Jahr</h3>
      <div className="grid grid-cols-3 gap-4">
        {[10000, 15000, 20000].map((km) => (
          <button
            key={km}
            onClick={() => onChange(km as 10000 | 15000 | 20000)}
            className={`p-4 border rounded-lg text-center transition-colors ${
              selectedKilometers === km ? 'border-black bg-gray-50' : 'border-gray-200'
            }`}
          >
            <span className="block font-medium">{km.toLocaleString()}</span>
            <span className="text-sm text-gray-500">km/Jahr</span>
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Zusatz-km werden mit 0,99€ pro km berechnet
      </p>
    </div>
  );
}