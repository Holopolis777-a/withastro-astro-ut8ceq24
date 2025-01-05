import React from 'react';
import { Check, X } from 'lucide-react';

export function CoverageTable() {
  const coverageItems = [
    { name: 'Vollkasko', included: true },
    { name: 'Teilkasko', included: true },
    { name: 'Haftpflicht', included: true },
    { name: 'Freier Fahrerkreis', included: true },
    { name: 'Akku-Versicherung', included: true },
    { name: 'GAP-Deckung', included: true },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Leistung
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {coverageItems.map((item) => (
            <tr key={item.name}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.included ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-red-500" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}