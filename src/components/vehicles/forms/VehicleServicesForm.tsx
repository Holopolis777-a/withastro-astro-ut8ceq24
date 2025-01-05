import React from 'react';
import { Checkbox } from '../../ui/Checkbox';
import { 
  Shield,
  Wrench,
  Snowflake,
  FileText,
  WrenchScrewdriver,
  Settings,
  Car
} from 'lucide-react';
import type { VehicleFormData } from '../../../types/vehicle';

interface VehicleServicesFormProps {
  data: VehicleFormData;
  onChange: (data: Partial<VehicleFormData>) => void;
}

export function VehicleServicesForm({ data, onChange }: VehicleServicesFormProps) {
  const handleServiceChange = (key: keyof VehicleFormData['services'], checked: boolean) => {
    onChange({
      services: {
        ...data.services,
        [key]: checked
      }
    });
  };

  const services = [
    {
      id: 'insurance',
      label: 'Vollkasko- & Haftpflichtversicherung',
      icon: Shield,
      description: 'Inkl. Vollkasko, Teilkasko und Haftpflicht'
    },
    {
      id: 'maintenance',
      label: 'Wartung & Verschleiß',
      icon: Wrench
    },
    {
      id: 'winterTires',
      label: 'Winterreifen',
      icon: Snowflake,
      description: 'Inkl. Einlagerung und Wechsel'
    },
    {
      id: 'gap',
      label: 'GAP Deckung Premium',
      icon: FileText
    },
    {
      id: 'roadside',
      label: 'KFZ-Schutzbrief & Pannenhilfe',
      icon: WrenchScrewdriver
    },
    {
      id: 'damageManagement',
      label: 'Schadensmanagement',
      icon: Settings
    },
    {
      id: 'delivery',
      label: 'Überführung & Zulassung',
      icon: Car
    }
  ] as const;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Inklusive Leistungen</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(({ id, label, icon: Icon, description }) => (
          <div 
            key={id} 
            className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100"
          >
            <Checkbox
              id={id}
              checked={data.services[id as keyof VehicleFormData['services']]}
              onChange={(checked) => handleServiceChange(id as keyof VehicleFormData['services'], checked)}
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5 text-gray-600" />
                <label 
                  htmlFor={id}
                  className="text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {label}
                </label>
              </div>
              {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}