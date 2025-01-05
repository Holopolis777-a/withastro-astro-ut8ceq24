import React from 'react';
import { Check, X } from 'lucide-react';

export function PriceComparison() {
  const features = [
    'Keine Anzahlung',
    'Wartung & Verschleiß',
    'Versicherung',
    'Winterreifen',
    'Zulassung',
    'Steuern & GEZ'
  ];

  return (
    <div className="overflow-hidden bg-white rounded-lg border border-gray-200">
      <div className="grid grid-cols-2">
        <div className="p-6 border-r border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Klassisches Leasing</h4>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 mb-3">
              <X className="w-5 h-5 text-red-500" />
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-gray-50">
          <h4 className="text-lg font-semibold mb-4">ViloCar All-Inclusive</h4>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 mb-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-900 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}