import React from 'react';
import { Checkbox } from '../../ui/Checkbox';
import type { VehicleFormData } from '../../../types/vehicle';

interface VehicleServicesFormProps {
  data: VehicleFormData;
  onChange: (data: Partial<VehicleFormData>) => void;
}

export function VehicleServices({ data, onChange }: VehicleServicesFormProps) {
  const handleServiceChange = (key: keyof VehicleFormData['services'], checked: boolean) => {
    onChange({
      services: {
        ...data.services,
        [key]: checked
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Inklusive Leistungen</h3>
      <div className="grid grid-cols-2 gap-4">
        <Checkbox
          id="insurance"
          label="Vollkasko- & Haftpflichtversicherung"
          checked={data.services.insurance}
          onChange={(checked) => handleServiceChange('insurance', checked)}
        />
        <Checkbox
          id="maintenance"
          label="Wartung & Verschleiß"
          checked={data.services.maintenance}
          onChange={(checked) => handleServiceChange('maintenance', checked)}
        />
        <Checkbox
          id="winterTires"
          label="Winterreifen"
          checked={data.services.winterTires}
          onChange={(checked) => handleServiceChange('winterTires', checked)}
        />
        <Checkbox
          id="gap"
          label="GAP Deckung Premium"
          checked={data.services.gap}
          onChange={(checked) => handleServiceChange('gap', checked)}
        />
        <Checkbox
          id="roadside"
          label="KFZ-Schutzbrief & Pannenhilfe"
          checked={data.services.roadside}
          onChange={(checked) => handleServiceChange('roadside', checked)}
        />
        <Checkbox
          id="damageManagement"
          label="Schadensmanagement"
          checked={data.services.damageManagement}
          onChange={(checked) => handleServiceChange('damageManagement', checked)}
        />
      </div>
    </div>
  );
}