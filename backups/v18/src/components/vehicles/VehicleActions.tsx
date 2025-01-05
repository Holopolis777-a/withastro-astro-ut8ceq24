import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useVehicleStore } from '../../store/vehicleStore';
import { toast } from 'react-hot-toast';

interface VehicleActionsProps {
  vehicleId: string;
}

export function VehicleActions({ vehicleId }: VehicleActionsProps) {
  const navigate = useNavigate();
  const { deleteVehicle } = useVehicleStore();

  const handleEdit = () => {
    navigate(`/vehicles/edit/${vehicleId}`);
  };

  const handleDelete = async () => {
    if (!confirm('Sind Sie sicher, dass Sie dieses Fahrzeug löschen möchten?')) {
      return;
    }

    try {
      await deleteVehicle(vehicleId);
      toast.success('Fahrzeug erfolgreich gelöscht');
      navigate('/vehicles');
    } catch (error) {
      toast.error('Fehler beim Löschen des Fahrzeugs');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleEdit}
        title="Fahrzeug bearbeiten"
      >
        <Edit2 className="w-4 h-4 text-gray-600" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        title="Fahrzeug löschen"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </Button>
    </div>
  );
}