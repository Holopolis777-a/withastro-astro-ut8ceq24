import { create } from 'zustand';
import type { Vehicle, VehicleFormData } from '../types/vehicle';

interface VehicleState {
  vehicles: Vehicle[];
  filters: Record<string, any>;
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  addVehicle: (vehicle: VehicleFormData) => Promise<void>;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
}

// Mock data
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'BMW',
    model: '3 Series',
    year: 2024,
    type: 'limousine',
    status: 'available',
    color: 'Alpine White',
    mileage: 0,
    fuelType: 'benzin',
    transmission: 'automatik',
    power: 374,
    engineSize: 3000,
    equipmentVariant: 'M Sport',
    deliveryTime: 12,
    grossListPrice: 45000,
    customEquipment: [
      'Head-up Display',
      'Harman Kardon Soundsystem',
      'Driving Assistant Professional'
    ],
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800',
    ],
    features: ['LED Headlights', 'Navigation', 'Leather Seats'],
    customFeatures: {},
    availableColors: [
      {
        name: 'Alpine White',
        code: '#FFFFFF',
        type: 'solid',
      },
      {
        name: 'Black Sapphire',
        code: '#000000',
        type: 'metallic',
        price: 1200,
      }
    ],
    services: {
      insurance: true,
      maintenance: true,
      delivery: true,
      winterTires: true,
      gap: true,
      roadside: true,
      damageManagement: true,
    },
    servicePrices: {
      insurance: 89,
      maintenance: 59,
      winterTires: 39,
      gap: 19,
      roadside: 15,
      damageManagement: 29,
    },
    leasingRates: {
      '36_10000': 499,
      '36_15000': 549,
      '36_20000': 599,
      '48_10000': 459,
      '48_15000': 509,
      '48_20000': 559,
    },
    oneTimeCosts: {
      registration: 179,
      homeDelivery: 249,
      transfer: 890,
    }
  },
];

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicles: mockVehicles,
  filters: {},
  loading: false,
  error: null,

  fetchVehicles: async () => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ vehicles: mockVehicles, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch vehicles', loading: false });
    }
  },

  addVehicle: async (vehicleData) => {
    set({ loading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newVehicle: Vehicle = {
        ...vehicleData,
        id: Date.now().toString(),
        status: 'available',
      };
      set((state) => ({
        vehicles: [...state.vehicles, newVehicle],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add vehicle', loading: false });
    }
  },

  updateVehicle: async (id, updates) => {
    set({ loading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({
        vehicles: state.vehicles.map((v) =>
          v.id === id ? { ...v, ...updates } : v
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update vehicle', loading: false });
    }
  },

  deleteVehicle: async (id) => {
    set({ loading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({
        vehicles: state.vehicles.filter((v) => v.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete vehicle', loading: false });
    }
  },
}));