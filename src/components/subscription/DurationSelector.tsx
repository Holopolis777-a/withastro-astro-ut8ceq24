import React from 'react';

interface DurationSelectorProps {
  selectedMonths: 36 | 48;
  onChange: (months: 36 | 48) => void;
}

export function DurationSelector({ selectedMonths, onChange }: DurationSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Laufzeit</h3>
      <div className="grid grid-cols-2 gap-4">
        {[36, 48].map((months) => (
          <button
            key={months}
            onClick={() => onChange(months as 36 | 48)}
            className={`p-4 border rounded-lg text-center transition-colors ${
              selectedMonths === months ? 'border-black bg-gray-50' : 'border-gray-200'
            }`}
          >
            <span className="block font-medium">{months}</span>
            <span className="text-sm text-gray-500">Monate</span>
          </button>
        ))}
      </div>
    </div>
  );
}