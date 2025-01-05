import React from 'react';
import { usePoolVehicleStore } from '../../../store/poolVehicleStore';
import { VehicleGrid } from '../../../components/vehicles/VehicleGrid';
import { PoolVehicleRequestList } from '../../../components/vehicles/pool/PoolVehicleRequestList';
import { Button } from '../../../components/ui/Button';
import { Plus, Car, ClipboardList } from 'lucide-react';
import { VehicleFormDialog } from '../../../components/vehicles/dialogs/VehicleFormDialog';
import { usePermissions } from '../../../hooks/usePermissions';

type TabType = 'vehicles' | 'requests';

export default function PoolVehicleList() {
  const poolVehicleStore = usePoolVehicleStore();
  const { vehicles, loading } = poolVehicleStore;
  const [isAddModalOpen, setAddModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<TabType>('vehicles');
  const { isAdmin } = usePermissions();

  // Fetch pool vehicles when component mounts
  React.useEffect(() => {
    poolVehicleStore.fetchVehicles();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`flex items-center space-x-2 pb-2 border-b-2 transition-colors ${
              activeTab === 'vehicles'
                ? 'border-primary-400 text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Car className="w-5 h-5" />
            <span className="font-medium">Pool-Fahrzeuge</span>
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center space-x-2 pb-2 border-b-2 transition-colors ${
              activeTab === 'requests'
                ? 'border-primary-400 text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="font-medium">Meine Anfragen</span>
          </button>
        </div>

        {isAdmin && activeTab === 'vehicles' && (
          <Button onClick={() => setAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Pool-Fahrzeug hinzufügen
          </Button>
        )}
      </div>

      {activeTab === 'vehicles' ? (
        <div className="w-full">
          <VehicleGrid vehicles={vehicles} loading={loading} />
        </div>
      ) : (
        <PoolVehicleRequestList />
      )}

      {isAdmin && (
        <VehicleFormDialog
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          type="pool"
          store={usePoolVehicleStore()}
        />
      )}
    </div>
  );
}