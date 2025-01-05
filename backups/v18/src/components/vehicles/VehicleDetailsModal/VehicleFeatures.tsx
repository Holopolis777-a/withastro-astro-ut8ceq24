import React from 'react';
import { Check } from 'lucide-react';

interface VehicleFeaturesProps {
  features: string[];
}

export function VehicleFeatures({ features }: VehicleFeaturesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Ausstattung</h3>
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center space-x-2 text-gray-700"
          >
            <Check className="w-5 h-5 text-green-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}