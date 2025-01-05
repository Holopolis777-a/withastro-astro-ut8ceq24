import React from 'react';
import { VehicleBasicInfo } from './sections/VehicleBasicInfo';
import { VehicleTechnicalInfo } from './sections/VehicleTechnicalInfo';
import { VehiclePriceMatrix } from './sections/VehiclePriceMatrix';
import { VehicleFeatures } from './sections/VehicleFeatures';
import { VehicleServices } from './sections/VehicleServices';
import { VehicleImages } from './sections/VehicleImages';
import { ColorManagement } from './sections/ColorManagement';
import { ActionButtons } from './sections/ActionButtons';
import { OneTimeCostsSection } from './sections/OneTimeCostsSection';
import type { Vehicle, VehicleFormData } from '../../../types/vehicle';

interface VehicleFormProps {
  initialData?: Vehicle;
  onSubmit: (data: Partial<Vehicle>) => Promise<void>;
  onCancel: () => void;
  type?: 'regular' | 'pool';
}

export function VehicleForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  type = 'regular'
}: VehicleFormProps) {
  const [formData, setFormData] = React.useState<VehicleFormData>({
    make: initialData?.make || '',
    model: initialData?.model || '',
    year: initialData?.year || new Date().getFullYear(),
    type: initialData?.type || 'limousine',
    fuelType: initialData?.fuelType || 'benzin',
    transmission: initialData?.transmission || 'automatik',
    power: initialData?.power || 0,
    engineSize: initialData?.engineSize || 0,
    mileage: initialData?.mileage || 0,
    color: initialData?.color || '',
    features: initialData?.features || [],
    services: initialData?.services || {
      maintenance: true,
      delivery: true,
      winterTires: true,
      gap: true,
      roadside: true,
      damageManagement: true,
      insurance: true
    },
    servicePrices: initialData?.servicePrices || {
      insurance: 89,
      maintenance: 0,
      winterTires: 0,
      gap: 0,
      roadside: 0,
      damageManagement: 0,
    },
    images: initialData?.images || [],
    leasingRates: initialData?.leasingRates || {
      '36_10000': 0,
      '36_15000': 0,
      '36_20000': 0,
      '48_10000': 0,
      '48_15000': 0,
      '48_20000': 0,
    },
    equipmentVariant: initialData?.equipmentVariant || '',
    deliveryTime: initialData?.deliveryTime || 3,
    customEquipment: initialData?.customEquipment || [],
    availableColors: initialData?.availableColors || [],
    customFeatures: initialData?.customFeatures || {},
    oneTimeCosts: initialData?.oneTimeCosts || {
      registration: 0,
      homeDelivery: 0,
      transfer: 0,
    },
    grossListPrice: initialData?.grossListPrice || 0,
  });

  const handleChange = React.useCallback((updates: Partial<VehicleFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      // Add a prefix to the ID based on the type
      id: type === 'pool' ? `pool-${Date.now()}` : `vehicle-${Date.now()}`
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <VehicleBasicInfo 
        data={formData} 
        onChange={handleChange} 
      />

      <VehicleTechnicalInfo 
        data={formData} 
        onChange={handleChange} 
      />

      <ColorManagement
        data={formData}
        onChange={handleChange}
      />

      <VehiclePriceMatrix 
        data={formData} 
        onChange={handleChange} 
      />

      <VehicleFeatures 
        data={formData} 
        onChange={handleChange} 
      />

      <VehicleServices 
        data={formData} 
        onChange={handleChange} 
      />

      <OneTimeCostsSection
        costs={formData.oneTimeCosts}
        onChange={(costs) => handleChange({ oneTimeCosts: costs })}
      />

      <VehicleImages 
        images={formData.images}
        onChange={(images) => handleChange({ images })}
      />

      <ActionButtons
        vehicleId={initialData?.id}
        onCancel={onCancel}
        vehicle={initialData}
      />
    </form>
  );
}