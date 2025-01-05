import React from 'react';
import { Button } from '../../ui/Button';

interface LeasingOptionsProps {
  rates: Record<string, number>;
  onSubmit: (config: { months: number; kilometers: number }) => void;
}

export function LeasingOptions({ rates, onSubmit }: LeasingOptionsProps) {
  const [months, setMonths] = React.useState(36);
  const [kilometers, setKilometers] = React.useState(10000);

  const monthlyRate = rates[`${months}_${kilometers}`];

  const handleSubmit = () => {
    onSubmit({ months, kilometers });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Leasing-Optionen</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Laufzeit
          </label>
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500"
          >
            <option value={36}>36 Monate</option>
            <option value={48}>48 Monate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jahreskilometer
          </label>
          <select
            value={kilometers}
            onChange={(e) => setKilometers(Number(e.target.value))}
            className="w-full rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500"
          >
            <option value={10000}>10.000 km</option>
            <option value={15000}>15.000 km</option>
            <option value={20000}>20.000 km</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Monatliche Rate</p>
        <p className="text-3xl font-bold">€{monthlyRate}/Monat</p>
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Jetzt bestellen
      </Button>
    </div>
  );
}