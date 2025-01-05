import React from 'react';
import { Checkbox } from '../../ui/Checkbox';
import type { VehicleFormData } from '../../../types/vehicle';

interface VehicleFeaturesProps {
  data: VehicleFormData;
  onChange: (data: Partial<VehicleFormData>) => void;
}

const AVAILABLE_FEATURES = [
  { id: 'klimaanlage', label: 'Klimaanlage' },
  { id: 'navigation', label: 'Navigationssystem' },
  { id: 'sitzheizung', label: 'Sitzheizung' },
  { id: 'bluetooth', label: 'Bluetooth' },
  { id: 'einparkhilfe', label: 'Einparkhilfe' },
  { id: 'tempomat', label: 'Tempomat' },
  { id: 'ledscheinwerfer', label: 'LED-Scheinwerfer' },
  { id: 'allradantrieb', label: 'Allradantrieb' },
  { id: 'standheizung', label: 'Standheizung' },
  { id: 'panoramadach', label: 'Panoramadach' },
];

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
          <Checkbox
            key={feature.id}
            id={feature.id}
            label={feature.label}
            checked={data.features.includes(feature.id)}
            onChange={(checked) => handleFeatureToggle(feature.id, checked)}
          />
        ))}
      </div>
    </div>
  );
}