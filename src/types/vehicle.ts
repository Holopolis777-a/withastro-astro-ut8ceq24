// Add electricRange to Vehicle interface
export interface Vehicle {
  id: string;
  monthlyStartingRate?: number;
  standardEquipment: string;
  make: string;
  model: string;
  year: number;
  electricRange?: number; // Optional since not all vehicles are electric
  engineSize?: number;
  equipmentVariant: string;
  deliveryTime: number;
  customEquipment: string[];
  images: string[];
  features: string[];
}