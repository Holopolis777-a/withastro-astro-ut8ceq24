import React from 'react';

interface KilometerPackageProps {
  selectedKilometers: number;
  onKilometersChange: (km: number) => void;
  additionalCosts: Record<number, number>;
}

export function KilometerPackage({ 
  selectedKilometers, 
  onKilometersChange,
  additionalCosts 
}: KilometerPackageProps) {
  const kilometers = [500, 1000, 1500, 2000, 2500, 3000];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Inklusivkilometer pro Monat</h3>
      <div className="grid grid-cols-3 gap-4">
        {kilometers.map((km) => (
          <button
            key={km}
            onClick={() => onKilometersChange(km)}
            className={`p-4 border rounded-lg text-center transition-colors ${
              selectedKilometers === km ? 'border-black' : 'border-gray-200'
            }`}
          >
            <span className="block font-medium">{km}km</span>
            <span className="text-sm text-gray-500">
              {km <= 1000 ? 'inklusive' : `+${additionalCosts[km]}€`}
            </span>
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Zusatz-km, die über die gebuchte Kilometeranzahl hinausgehen, kosten 0.99€ /KM und
        werden am Ende der Laufzeit berechnet.
      </p>
    </div>
  );
}