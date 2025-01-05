import React from 'react';
import { DurationSelector } from '../subscription/DurationSelector';
import { KilometerSelector } from '../subscription/KilometerSelector';
import type { Vehicle } from '../../types/vehicle';

interface LeaseConfigurationProps {
  vehicle: Vehicle;
  onConfigurationChange: (months: number, kilometers: number, monthlyRate: number) => void;
}

export function LeaseConfiguration({ vehicle, onConfigurationChange }: LeaseConfigurationProps) {
  const [selectedMonths, setSelectedMonths] = React.useState<36 | 48>(36);
  const [selectedKilometers, setSelectedKilometers] = React.useState<10000 | 15000 | 20000>(10000);

  // Berechne monatliche Rate aus der Preismatrix
  const monthlyRate = React.useMemo(() => {
    const key = `${selectedMonths}_${selectedKilometers}` as keyof typeof vehicle.leasingRates;
    return vehicle.leasingRates[key] || 0;
  }, [vehicle.leasingRates, selectedMonths, selectedKilometers]);

  // Benachrichtige Parent-Komponente über Änderungen
  React.useEffect(() => {
    onConfigurationChange(selectedMonths, selectedKilometers, monthlyRate);
  }, [selectedMonths, selectedKilometers, monthlyRate, onConfigurationChange]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-semibold">Leasingkonfiguration</h3>
        
        <DurationSelector
          selectedMonths={selectedMonths}
          onChange={(months) => setSelectedMonths(months)}
        />

        <KilometerSelector
          selectedKilometers={selectedKilometers}
          onChange={(kilometers) => setSelectedKilometers(kilometers)}
        />

        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Monatliche Rate:</span>
            <span className="text-2xl font-bold text-primary-600">{monthlyRate.toFixed(2)}€</span>
          </div>
        </div>
      </div>
    </div>
  );
}