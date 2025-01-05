import React from 'react';
import { Banknote, Calculator, PiggyBank, BarChart } from 'lucide-react';

export function PricingFeatures() {
  const features = [
    {
      icon: Banknote,
      title: 'Keine Anzahlung',
      description: 'Starten Sie ohne hohe Anfangsinvestition'
    },
    {
      icon: Calculator,
      title: 'Fixe Monatsrate',
      description: 'Planen Sie mit konstanten monatlichen Kosten'
    },
    {
      icon: PiggyBank,
      title: 'Kostentransparenz',
      description: 'Alle Leistungen in einer Rate gebündelt'
    },
    {
      icon: BarChart,
      title: 'All-Inclusive Rate',
      description: 'Eine monatliche Rate - alle Leistungen inklusive'
    }
  ];

  return (
    <>
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <feature.icon className="w-6 h-6 text-gray-600" />
            </div>
            <h4 className="font-medium text-gray-900">{feature.title}</h4>
          </div>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </>
  );
}