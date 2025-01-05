import React from 'react';
import { ServiceCheckbox } from './ServiceCheckbox';
import { Input } from '../../../ui/Input';
import { getServiceConfig } from '../../details/services/serviceConfig';
import type { VehicleFormData } from '../../../../types/vehicle';

interface ServiceFormProps {
  data: VehicleFormData;
  onChange: (data: Partial<VehicleFormData>) => void;
}

export function ServiceForm({ data, onChange }: ServiceFormProps) {
  const handleServiceChange = (key: keyof VehicleFormData['services'], checked: boolean) => {
    onChange({
      services: {
        ...data.services,
        [key]: checked
      }
    });
  };

  const handlePriceChange = (key: keyof VehicleFormData['servicePrices'], value: string) => {
    onChange({
      servicePrices: {
        ...data.servicePrices,
        [key]: value ? Number(value) : 0
      }
    });
  };

  const serviceConfig = getServiceConfig();
  const editableServices = [
    { key: 'insurance', config: serviceConfig.insurance },
    { key: 'maintenance', config: serviceConfig.maintenance },
    { key: 'winterTires', config: serviceConfig.winterTires },
    { key: 'gap', config: serviceConfig.gap },
    { key: 'roadside', config: serviceConfig.roadside },
    { key: 'damageManagement', config: serviceConfig.damageManagement },
    { key: 'delivery', config: serviceConfig.delivery }
  ] as const;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Inklusive Leistungen</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {editableServices.map(({ key, config }) => (
          <div key={key} className="space-y-2">
            <ServiceCheckbox
              id={key}
              label={config.title}
              icon={config.icon}
              description={config.description?.[0]}
              checked={data.services[key as keyof VehicleFormData['services']]}
              onChange={(checked) => handleServiceChange(key as keyof VehicleFormData['services'], checked)}
            />
            {key !== 'delivery' && (
              <div className="pl-12">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Monatlicher Preis"
                  value={data.servicePrices[key as keyof VehicleFormData['servicePrices']] || ''}
                  onChange={(e) => handlePriceChange(key as keyof VehicleFormData['servicePrices'], e.target.value)}
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1">€/Monat</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}