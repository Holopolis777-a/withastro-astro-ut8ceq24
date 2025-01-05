import React from 'react';
import { Check } from 'lucide-react';

interface VehicleFeaturesProps {
  features: string[];
  customFeatures?: { [key: string]: string };
}

const FEATURE_LABELS: { [key: string]: string } = {
  ledHeadlights: 'LED Scheinwerfer',
  navigation: 'Navigation',
  leatherSeats: 'Ledersitze',
  heatedSeats: 'Sitzheizung',
  bluetooth: 'Bluetooth',
  parkingSensors: 'Einparkhilfe',
  cruiseControl: 'Tempomat',
  allWheelDrive: 'Allradantrieb',
  sunroof: 'Panoramadach',
  climateControl: 'Klimaautomatik',
  keylessEntry: 'Keyless Entry',
  electricMirrors: 'Elektrische Außenspiegel'
};

export function VehicleFeatures({ features, customFeatures = {} }: VehicleFeaturesProps) {
  // Separate standard and custom features
  const standardFeatures = features.filter(id => !id.startsWith('custom_'));
  const customFeatureIds = features.filter(id => id.startsWith('custom_'));

  // Prepare features for display
  const displayFeatures = [
    // Standard features with their labels
    ...standardFeatures.map(id => ({
      id,
      label: FEATURE_LABELS[id] || id
    })),
    // Custom features with their actual labels from customFeatures
    ...customFeatureIds.map(id => ({
      id,
      label: customFeatures[id] || id
    }))
  ];

  if (displayFeatures.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Ausstattung</h3>
      <div className="grid grid-cols-2 gap-3">
        {displayFeatures.map(({ id, label }) => (
          <div
            key={id}
            className="flex items-center space-x-2 text-gray-700"
          >
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}