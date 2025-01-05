import React from 'react';
import { Car } from 'lucide-react';
import type { Vehicle } from '../../../types/vehicle';

interface VehicleHeaderProps {
  vehicle: Vehicle;
}

export function VehicleHeader({ vehicle }: VehicleHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
          <Car className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {vehicle.make} {vehicle.model}
          </h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <span>{vehicle.type}</span>
            <span>•</span>
            <span>{vehicle.year}</span>
            {vehicle.vin && (
              <>
                <span>•</span>
                <span>VIN: {vehicle.vin}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          {vehicle.status}
        </span>
        {vehicle.licensePlate && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {vehicle.licensePlate}
          </span>
        )}
      </div>
    </div>
  );
}