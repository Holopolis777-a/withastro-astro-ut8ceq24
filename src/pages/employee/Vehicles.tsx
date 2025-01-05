import React from 'react';
import { useVehicleStore } from '../../store/vehicleStore';
import { VehicleGrid } from '../../components/vehicles/VehicleGrid';
import { Car } from 'lucide-react';

export default function EmployeeVehicles() {
  const { vehicles, loading } = useVehicleStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary-400 rounded-xl">
          <Car className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Verfügbare Fahrzeuge</h1>
          <p className="text-gray-500">Entdecken Sie unsere Auswahl an Fahrzeugen</p>
        </div>
      </div>

      {/* Vehicle Grid */}
      <VehicleGrid vehicles={vehicles} loading={loading} />
    </div>
  );
}