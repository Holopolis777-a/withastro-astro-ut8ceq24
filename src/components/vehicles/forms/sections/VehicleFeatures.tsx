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

  const handleStandardEquipmentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ standardEquipment: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Ausstattungsmerkmale</h3>
      
      {/* Standard Equipment */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Serienausstattung *
        </label>
        <textarea
          value={data.standardEquipment || ''}
          onChange={handleStandardEquipmentChange}
          rows={6}
          placeholder="Geben Sie hier die Serienausstattung ein (z.B. Klimaanlage, Zentralverriegelung, etc.)"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          required
        />
        <p className="text-sm text-gray-500">
          Bitte geben Sie die Serienausstattung zeilenweise ein
        </p>
      </div>
      
      {/* Additional Features */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-medium mb-4">Zusatzausstattung</h4>
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
    </div>
  );
}