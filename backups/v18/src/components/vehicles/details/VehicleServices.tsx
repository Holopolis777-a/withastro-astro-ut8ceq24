import React from 'react';
import { ServiceList } from '../../subscription/ServiceList';
import type { VehicleServices as VehicleServicesType } from '../../../types/vehicle';

interface VehicleServicesProps {
  services: VehicleServicesType;
}

export function VehicleServices({ services }: VehicleServicesProps) {
  return <ServiceList services={services} />;
}