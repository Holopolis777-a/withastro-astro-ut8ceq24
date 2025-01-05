import React from 'react';
import { Info } from 'lucide-react';
import { Checkbox } from '../ui/Checkbox';
import { getServiceConfig } from '../../utils/serviceConfig';
import type { VehicleServices, ServicePrices } from '../../types/vehicle';

interface InclusiveServicesProps {
  services: VehicleServices;
  prices: ServicePrices;
  selectedServices: string[];
  onServicesChange: (services: string[]) => void;
}

export function InclusiveServices({
  services,
  prices,
  selectedServices,
  onServicesChange,
}: InclusiveServicesProps) {
  const serviceConfig = getServiceConfig();

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Inklusive Leistungen</h3>
      </div>

      {/* Insurance is now included by default */}
      <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <serviceConfig.insurance.icon className="w-5 h-5 text-gray-600" />
            <span className="font-medium">{serviceConfig.insurance.title}</span>
            <div className="group relative">
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <ul className="text-sm space-y-1">
                  {serviceConfig.insurance.description?.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show all other included services */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-500 mb-4">Weitere inklusive Leistungen:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(services).map(([key, isAvailable]) => {
            if (key === 'insurance' || !isAvailable) return null;
            const service = serviceConfig[key as keyof typeof serviceConfig];
            
            return (
              <div key={key} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <service.icon className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">{service.title}</div>
                  {service.description && (
                    <div className="text-sm text-gray-500 mt-1">
                      {service.description[0]}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}