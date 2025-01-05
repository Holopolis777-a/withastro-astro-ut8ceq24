import React from 'react';
import { useSalarySacrificeStore } from '../../store/salarySacrificeStore';
import { VehicleGrid } from '../../components/vehicles/VehicleGrid';
import { VehicleFormDialog } from '../../components/vehicles/dialogs/VehicleFormDialog';
import { usePermissions } from '../../hooks/usePermissions';
import { PageTitle } from './components/PageTitle';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';

export default function SalaryVehicleList() {
  const { vehicles, loading } = useSalarySacrificeStore();
  const [isAddModalOpen, setAddModalOpen] = React.useState(false);
  const { canManageVehicles, isAdmin } = usePermissions();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle />
        {isAdmin && (
          <Button onClick={() => setAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Neues Fahrzeug anlegen
          </Button>
        )}
      </div>
      
      <div className="w-full">
        <VehicleGrid vehicles={vehicles} loading={loading} />
      </div>

      {canManageVehicles && (
        <VehicleFormDialog
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          type="salary"
          store={useSalarySacrificeStore}
        />
      )}
    </div>
  );
}