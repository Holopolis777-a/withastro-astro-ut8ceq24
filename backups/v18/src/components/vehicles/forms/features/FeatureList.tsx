import React from 'react';
import { Checkbox } from '../../../ui/Checkbox';
import { Check } from 'lucide-react';
import type { VehicleFormData } from '../../../../types/vehicle';

interface FeatureListProps {
  features: string[];
  onToggleFeature: (featureId: string, checked: boolean) => void;
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

export function FeatureList({ features, onToggleFeature }: FeatureListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {AVAILABLE_FEATURES.map(feature => (
        <div 
          key={feature.id}
          className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100"
        >
          <Checkbox
            id={feature.id}
            checked={features.includes(feature.id)}
            onChange={(checked) => onToggleFeature(feature.id, checked)}
          />
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-gray-600" />
            <label 
              htmlFor={feature.id}
              className="text-sm font-medium text-gray-900 cursor-pointer"
            >
              {feature.label}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}