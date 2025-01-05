import React from 'react';
import { Button } from '../ui/Button';

interface SubscriptionDurationProps {
  selectedMonths: number;
  onDurationChange: (months: number) => void;
}

export function SubscriptionDuration({ selectedMonths, onDurationChange }: SubscriptionDurationProps) {
  const durations = [
    { months: 6, label: 'Monate' },
    { months: 12, label: 'Monate' },
    { months: 0, label: '+ Beliebig' }
  ];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Abo-Laufzeit</h3>
      <div className="grid grid-cols-3 gap-4">
        {durations.map(({ months, label }) => (
          <button
            key={months}
            onClick={() => onDurationChange(months)}
            className={`p-4 border rounded-lg text-center transition-colors ${
              selectedMonths === months ? 'border-black' : 'border-gray-200'
            }`}
          >
            <span className="block font-medium">{months || '+'}</span>
            <span className="text-sm text-gray-500">{label}</span>
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">*Bitte wähle von 6 bis 12 Monate.</p>
    </div>
  );
}