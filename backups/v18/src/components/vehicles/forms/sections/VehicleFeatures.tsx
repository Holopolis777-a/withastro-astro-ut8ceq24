import React from 'react';
import { Checkbox } from '../../../ui/Checkbox';
import { CustomEquipmentInput } from './CustomEquipmentInput';
import type { VehicleFormData } from '../../../../types/vehicle';

interface VehicleFeaturesProps {
  data: VehicleFormData;
  onChange: (data: Partial<VehicleFormData>) => void;
}

const AVAILABLE_FEATURES = [
  { id: 'ledHeadlights', label: 'LED Scheinwerfer' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'leatherSeats', label: 'Ledersitze' },
  { id: 'heatedSeats', label: 'Sitzheizung' },
  { id: 'bluetooth', label: 'Bluetooth' },
  { id: 'parkingSensors', label: 'Einparkhilfe' },
  { id: 'cruiseControl', label: 'Tempomat' },
  { id: 'allWheelDrive', label: 'Allradantrieb' },
  { id: 'sunroof', label: 'Panoramadach' },
  { id: 'climateControl', label: 'Klimaautomatik' },
  { id: 'keylessEntry', label: 'Keyless Entry' },
  { id: 'electricMirrors', label: 'Elektrische Außenspiegel' }
] as const;

export function VehicleFeatures({ data, onChange }: VehicleFeaturesProps) {
  const handleFeatureToggle = (featureId: string, checked: boolean) => {
    const newFeatures = checked
      ? [...data.features, featureId]
      : data.features.filter(f => f !== featureId);
    
    onChange({ features: newFeatures });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Ausstattungsmerkmale</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {AVAILABLE_FEATURES.map(feature => (
          <div
            key={feature.id}
            className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100"
          >
            <Checkbox
              id={feature.id}
              checked={data.features.includes(feature.id)}
              onChange={(checked) => handleFeatureToggle(feature.id, checked)}
            />
            <label
              htmlFor={feature.id}
              className="text-sm font-medium text-gray-900 cursor-pointer"
            >
              {feature.label}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <CustomEquipmentInput
          customEquipment={data.customEquipment}
          onChange={(equipment) => onChange({ customEquipment: equipment })}
        />
      </div>
    </div>
  );
}