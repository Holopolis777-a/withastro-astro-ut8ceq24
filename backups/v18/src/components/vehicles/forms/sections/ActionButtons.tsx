import React from 'react';
import { Button } from '../../../ui/Button';
import { Ban } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useVehicleStore } from '../../../../store/vehicleStore';
import type { Vehicle } from '../../../../types/vehicle';

interface ActionButtonsProps {
  vehicleId?: string;
  onCancel: () => void;
  vehicle?: Vehicle;
}

export function ActionButtons({ vehicleId, onCancel, vehicle }: ActionButtonsProps) {
  const { updateVehicle } = useVehicleStore();
  const [isDeactivating, setIsDeactivating] = React.useState(false);

  const handleDeactivate = async () => {
    if (!vehicleId) return;
    
    if (!confirm('Sind Sie sicher, dass Sie dieses Fahrzeug deaktivieren möchten?')) {
      return;
    }

    setIsDeactivating(true);
    try {
      await updateVehicle(vehicleId, { status: 'maintenance' });
      toast.success('Fahrzeug wurde deaktiviert');
      onCancel(); // Navigate back
    } catch (error) {
      toast.error('Fehler beim Deaktivieren des Fahrzeugs');
    } finally {
      setIsDeactivating(false);
    }
  };

  return (
    <div className="flex justify-between items-center">
      {vehicleId && (
        <Button
          type="button"
          variant="outline"
          onClick={handleDeactivate}
          disabled={isDeactivating || vehicle?.status === 'maintenance'}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Ban className="w-4 h-4 mr-2" />
          {vehicle?.status === 'maintenance' ? 'Deaktiviert' : 'Fahrzeug deaktivieren'}
        </Button>
      )}

      <div className="flex space-x-3 ml-auto">
        <Button type="button" variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button type="submit">
          Änderungen speichern
        </Button>
      </div>
    </div>
  );
}