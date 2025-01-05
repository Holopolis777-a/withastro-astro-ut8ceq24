import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Vehicle, VehicleFormData } from '../types/vehicle';

interface SalarySacrificeState {
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
    id: 'salary-1',
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    type: 'limousine',
    status: 'available',
    color: 'Pearl White',
    mileage: 0,
    fuelType: 'elektro',
    transmission: 'automatik',
    power: 325,
    engineSize: 0,
    equipmentVariant: 'Long Range',
    deliveryTime: 8,
    monthlyStartingRate: 599.00,
    standardEquipment: 'Autopilot\nPremium Interieur\nPanoramadach\nNavigationssystem\nKlimaautomatik',
    grossListPrice: 52000,
    customEquipment: [
      'Enhanced Autopilot',
      'Premium Interior',
      'Premium Connectivity'
    ],
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800',
    ],
    features: ['Autopilot', 'Premium Audio', 'Glass Roof'],
    customFeatures: {},
    availableColors: [
      {
        name: 'Pearl White',
        code: '#FFFFFF',
        type: 'pearl',
      },
      {
        name: 'Solid Black',
        code: '#000000',
        type: 'solid',
        price: 1000,
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
      '36_10000': 599,
      '36_15000': 649,
      '36_20000': 699,
      '48_10000': 559,
      '48_15000': 609,
      '48_20000': 659,
    },
    oneTimeCosts: {
      registration: 179,
      homeDelivery: 249,
      transfer: 890,
    }
  },
];

export const useSalarySacrificeStore = create<SalarySacrificeState>((set) => ({
  vehicles: mockVehicles,
  filters: {},
  loading: false,
  error: null,

  fetchVehicles: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('salary_vehicles')
        .select('*')

      if (error) throw error;
      set({ vehicles: data || [], loading: false });
    } catch (error) {
      console.error('Error fetching salary vehicles:', error);
      set({ error: 'Failed to fetch vehicles', loading: false });
    }
  },

  addVehicle: async (vehicleData) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('salary_vehicles')
        .insert([{
          ...vehicleData,
          status: 'available',
          created_by: supabase.auth.getUser()?.id
        }])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        set(state => ({
          vehicles: [...state.vehicles, data],
          loading: false
        }));
      }
    } catch (error) {
      console.error('Error adding salary vehicle:', error);
      set({ error: 'Failed to add vehicle', loading: false });
      throw error;
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