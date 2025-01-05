import React from 'react';
import { usePoolVehicleStore } from '../../../store/poolVehicleStore';
import { VehicleGrid } from '../../../components/vehicles/VehicleGrid';
import { Button } from '../../../components/ui/Button';
import { Plus } from 'lucide-react';
import { VehicleFormDialog } from '../../../components/vehicles/dialogs/VehicleFormDialog';

export default function PoolVehicleList() {
  const poolVehicleStore = usePoolVehicleStore();
  const { vehicles, loading } = poolVehicleStore;
  const [isAddModalOpen, setAddModalOpen] = React.useState(false);

  // Fetch pool vehicles when component mounts
  React.useEffect(() => {
    poolVehicleStore.fetchVehicles();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Pool-Fahrzeuge</h1>
          <p className="text-gray-600 mt-1">
            Verwalten Sie hier die Fahrzeugflotte für Ihre Firmenkunden
          </p>
        </div>
        <Button onClick={() => setAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Pool-Fahrzeug hinzufügen
        </Button>
      </div>

      <div className="w-full">
        <VehicleGrid vehicles={vehicles} loading={loading} />
      </div>

      <VehicleFormDialog
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        type="pool"
        store={poolVehicleStore}
      />
    </div>
  );
}