import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '../../ui/Button';
import { usePermissions } from '../../../hooks/usePermissions';
import { useVehicleStore } from '../../../store/vehicleStore';
import { toast } from 'react-hot-toast';

interface VehicleCardActionsProps {
  vehicleId: string;
}

export function VehicleCardActions({ vehicleId }: VehicleCardActionsProps) {
  const navigate = useNavigate();
  const { canManageVehicles, canOrderVehicles } = usePermissions();
  const { deleteVehicle } = useVehicleStore();

  const handleView = () => {
    navigate(`/vehicles/${vehicleId}`);
  };

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
    } catch (error) {
      toast.error('Fehler beim Löschen des Fahrzeugs');
    }
  };

  const handleOrder = () => {
    navigate(`/vehicles/${vehicleId}?action=order`);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleView}
        title="Details anzeigen"
      >
        <Eye className="w-4 h-4 text-gray-600" />
      </Button>
      
      {canOrderVehicles && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleOrder}
          title="Fahrzeug bestellen"
        >
          <ShoppingCart className="w-4 h-4 text-green-600" />
        </Button>
      )}
      
      {canManageVehicles && (
        <>
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
        </>
      )}
    </div>
  );
}