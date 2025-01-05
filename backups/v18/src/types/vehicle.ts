export type VehicleType = 'limousine' | 'kombi' | 'suv' | 'coupe' | 'cabrio';
export type VehicleStatus = 'available' | 'leased' | 'maintenance';
export type FuelType = 'benzin' | 'diesel' | 'elektro' | 'hybrid';
export type Transmission = 'automatik' | 'manuell';

export interface OneTimeCosts {
  registration: number;  // Zulassungskosten
  homeDelivery: number; // Haustürlieferung
  transfer: number;     // Überführungskosten
}

export interface VehicleColor {
  name: string;
  code: string;
  type: 'solid' | 'metallic' | 'pearl';
  price?: number;
}

export interface VehicleServices {
  insurance: boolean;
  maintenance: boolean;
  delivery: boolean;
  winterTires: boolean;
  gap: boolean;
  roadside: boolean;
  damageManagement: boolean;
}

export interface ServicePrices {
  insurance: number;
  maintenance: number;
  winterTires: number;
  gap: number;
  roadside: number;
  damageManagement: number;
}

export interface LeasingRates {
  '36_10000': number;
  '36_15000': number;
  '36_20000': number;
  '48_10000': number;
  '48_15000': number;
  '48_20000': number;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  status: VehicleStatus;
  vin?: string;
  licensePlate?: string;
  color: string;
  availableColors: VehicleColor[];
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  power: number;
  engineSize?: number;
  images: string[];
  features: string[];
  customFeatures: Record<string, string>;
  services: VehicleServices;
  servicePrices: ServicePrices;
  leasingRates: LeasingRates;
  equipmentVariant: string;
  deliveryTime: number;
  customEquipment: string[];
  oneTimeCosts: OneTimeCosts;
  grossListPrice: number; // Added this field
}

export type VehicleFormData = Omit<Vehicle, 'id' | 'status'>;