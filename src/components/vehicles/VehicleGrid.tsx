import React from 'react';
import { VehicleCard } from './VehicleCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import type { Vehicle } from '../../types/vehicle';

interface VehicleGridProps {
  vehicles: Vehicle[];
  loading: boolean;
}

export function VehicleGrid({ vehicles, loading }: VehicleGridProps) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Keine Fahrzeuge gefunden.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}