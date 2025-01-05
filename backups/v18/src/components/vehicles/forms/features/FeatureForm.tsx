import React from 'react';
import { FeatureList } from './FeatureList';
import { CustomFeatureInput } from './CustomFeatureInput';
import { CustomFeatureList } from './CustomFeatureList';
import type { VehicleFormData } from '../../../../types/vehicle';

interface FeatureFormProps {
  data: VehicleFormData;
  onChange: (data: Partial<VehicleFormData>) => void;
}

export function FeatureForm({ data, onChange }: FeatureFormProps) {
  const handleFeatureToggle = (featureId: string, checked: boolean) => {
    const newFeatures = checked
      ? [...data.features, featureId]
      : data.features.filter(f => f !== featureId);
    
    onChange({ features: newFeatures });
  };

  const handleAddCustomFeature = (feature: string) => {
    const customFeatureId = `custom_${Date.now()}`;
    onChange({
      features: [...data.features, customFeatureId],
      customFeatures: {
        ...data.customFeatures,
        [customFeatureId]: feature
      }
    });
  };

  const handleRemoveCustomFeature = (featureId: string) => {
    const { [featureId]: removed, ...remainingCustomFeatures } = data.customFeatures || {};
    onChange({
      features: data.features.filter(f => f !== featureId),
      customFeatures: remainingCustomFeatures
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Ausstattungsmerkmale</h3>
      
      <FeatureList 
        features={data.features}
        onToggleFeature={handleFeatureToggle}
      />

      <div className="mt-8">
        <h4 className="text-md font-medium mb-4">Weitere Ausstattungsmerkmale</h4>
        
        <CustomFeatureInput onAddFeature={handleAddCustomFeature} />

        {Object.keys(data.customFeatures || {}).length > 0 && (
          <div className="mt-4">
            <CustomFeatureList 
              features={data.customFeatures || {}}
              onRemoveFeature={handleRemoveCustomFeature}
            />
          </div>
        )}
      </div>
    </div>
  );
}