import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../ui/Button';

interface VehicleListHeaderProps {
  onAddVehicle: () => void;
  showAddButton: boolean;
}

export function VehicleListHeader({ onAddVehicle, showAddButton }: VehicleListHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Fahrzeuge</h1>
      {showAddButton && (
        <Button onClick={onAddVehicle}>
          <Plus className="w-4 h-4 mr-2" />
          Neues Fahrzeug anlegen
        </Button>
      )}
    </div>
  );
}