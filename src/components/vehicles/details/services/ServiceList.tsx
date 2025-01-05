import React from 'react';
import { ServiceItem } from './ServiceItem';
import { getServiceConfig } from './serviceConfig';
import type { VehicleServices as VehicleServicesType } from '../../../../types/vehicle';

interface ServiceListProps {
  services: VehicleServicesType;
}

export function ServiceList({ services }: ServiceListProps) {
  const serviceConfig = getServiceConfig();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Inklusive Leistungen</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* No deposit is always included */}
        <ServiceItem {...serviceConfig.noDeposit} />

        {/* Conditional services based on vehicle configuration */}
        {services.maintenance && <ServiceItem {...serviceConfig.maintenance} />}
        {services.delivery && <ServiceItem {...serviceConfig.delivery} />}
        {services.insurance && <ServiceItem {...serviceConfig.insurance} />}
        {services.winterTires && <ServiceItem {...serviceConfig.winterTires} />}
        {services.gap && <ServiceItem {...serviceConfig.gap} />}
        {services.roadside && <ServiceItem {...serviceConfig.roadside} />}
        {services.damageManagement && <ServiceItem {...serviceConfig.damageManagement} />}

        {/* Free delivery is always included */}
        <ServiceItem {...serviceConfig.freeDelivery} />
      </div>
    </div>
  );
}