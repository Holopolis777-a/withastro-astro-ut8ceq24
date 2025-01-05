import React from 'react';
import { Shield, Wrench, Snowflake, Battery, FileText, WrenchIcon, Settings, Truck } from 'lucide-react';
import type { VehicleServices, ServicePrices } from '../../../types/vehicle';

interface InclusiveServicesProps {
  services: VehicleServices;
  prices: ServicePrices;
}

export function InclusiveServices({ services }: InclusiveServicesProps) {
  const serviceItems = [
    {
      id: 'insurance',
      icon: Shield,
      title: 'Vollkasko- & Haftpflichtversicherung',
      description: 'Inkl. Vollkasko, Teilkasko und Haftpflicht',
      enabled: services.insurance
    },
    {
      id: 'maintenance',
      icon: Wrench,
      title: 'Wartung & Verschleiß',
      enabled: services.maintenance
    },
    {
      id: 'winterTires',
      icon: Snowflake,
      title: 'Winterreifen',
      description: 'Inkl. Einlagerung und Wechsel',
      enabled: services.winterTires
    },
    {
      id: 'gap',
      icon: FileText,
      title: 'GAP Deckung Premium',
      enabled: services.gap
    },
    {
      id: 'roadside',
      icon: WrenchIcon,
      title: 'KFZ-Schutzbrief & Pannenhilfe',
      enabled: services.roadside
    },
    {
      id: 'damageManagement',
      icon: Settings,
      title: 'Schadensmanagement',
      enabled: services.damageManagement
    },
    {
      id: 'delivery',
      icon: Truck,
      title: 'Überführung & Zulassung',
      enabled: services.delivery
    }
  ];

  const enabledServices = serviceItems.filter(service => service.enabled);

  if (enabledServices.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Inklusive Leistungen</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enabledServices.map((service) => (
          <div
            key={service.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                <service.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{service.title}</h4>
                {service.description && (
                  <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}