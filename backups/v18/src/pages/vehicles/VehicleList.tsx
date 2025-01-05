import React from 'react';
import { useVehicleStore } from '../../store/vehicleStore';
import { VehicleGrid } from '../../components/vehicles/VehicleGrid';
import { VehicleListHeader } from '../../components/vehicles/VehicleList/VehicleListHeader';
import { VehicleFormDialog } from '../../components/vehicles/dialogs/VehicleFormDialog';
import { usePermissions } from '../../hooks/usePermissions';

export default function VehicleList() {
  const { vehicles, loading } = useVehicleStore();
  const [isAddModalOpen, setAddModalOpen] = React.useState(false);
  const { canManageVehicles, isAdmin } = usePermissions();

  return (
    <div className="space-y-6">
      <VehicleListHeader 
        onAddVehicle={() => setAddModalOpen(true)}
        showAddButton={isAdmin}
      />

      <div className="w-full">
        <VehicleGrid vehicles={vehicles} loading={loading} />
      </div>

      {canManageVehicles && (
        <VehicleFormDialog
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}