import React from 'react';
import {
  Calendar,
  Gauge,
  Car,
  Fuel,
  Settings,
  Power,
  Euro,
} from 'lucide-react';
import type { Vehicle } from '../../../types/vehicle';

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const specs = [
    { icon: Calendar, label: 'Baujahr', value: vehicle.year },
    {
      icon: Gauge,
      label: 'Kilometerstand',
      value: `${vehicle.mileage.toLocaleString()} km`,
    },
    { icon: Fuel, label: 'Kraftstoff', value: vehicle.fuelType },
    { icon: Settings, label: 'Getriebe', value: vehicle.transmission },
    { icon: Power, label: 'Leistung', value: `${vehicle.power} PS` },
    { icon: Car, label: 'Farbe', value: vehicle.color },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Technische Daten</h3>
      <div className="grid grid-cols-2 gap-4">
        {specs.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Icon className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="font-medium">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}