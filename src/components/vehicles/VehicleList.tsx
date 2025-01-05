import React from 'react';
import { useVehicleStore } from '../../store/vehicleStore';
import { VehicleCard } from './VehicleCard';
import { VehicleFilters } from './VehicleFilters';
import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { VehicleForm } from './VehicleForm';

export default function VehicleList() {
  const { vehicles, loading, addVehicle } = useVehicleStore();
  const [isAddModalOpen, setAddModalOpen] = React.useState(false);

  const handleAddVehicle = async (vehicleData: any) => {
    try {
      await addVehicle(vehicleData);
      setAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add vehicle:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Fahrzeuge</h1>
        <Button onClick={() => setAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Neues Fahrzeug anlegen
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <VehicleFilters />
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </div>

      <Dialog
        open={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />

          <div className="relative bg-white rounded-xl max-w-3xl w-full p-6">
            <Dialog.Title className="text-xl font-semibold mb-6">
              Neues Fahrzeug anlegen
            </Dialog.Title>

            <VehicleForm
              onSubmit={handleAddVehicle}
              onCancel={() => setAddModalOpen(false)}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}