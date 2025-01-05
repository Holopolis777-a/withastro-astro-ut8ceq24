import { create } from 'zustand';
import type { Broker } from '../types/broker';

interface BrokerState {
  brokers: Broker[];
  loading: boolean;
  error: string | null;
  fetchBrokers: () => Promise<void>;
  addBroker: (broker: Omit<Broker, 'id' | 'createdAt'>) => Promise<void>;
  updateBroker: (id: string, updates: Partial<Broker>) => Promise<void>;
  deleteBroker: (id: string) => Promise<void>;
}

// Mock data
const mockBrokers: Broker[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+49 123 456789',
    company: 'Auto Lease Pro GmbH',
    address: {
      street: 'Hauptstraße 123',
      city: 'Berlin',
      postalCode: '10115',
      country: 'Germany',
    },
    status: 'active',
    createdAt: new Date(),
    membersCount: 45,
    activeOrders: 12,
  },
];

export const useBrokerStore = create<BrokerState>((set) => ({
  brokers: [],
  loading: false,
  error: null,
  fetchBrokers: async () => {
    set({ loading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ brokers: mockBrokers, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch brokers', loading: false });
    }
  },
  addBroker: async (broker) => {
    set({ loading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newBroker: Broker = {
        ...broker,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      set((state) => ({
        brokers: [...state.brokers, newBroker],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add broker', loading: false });
    }
  },
  updateBroker: async (id, updates) => {
    set({ loading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({
        brokers: state.brokers.map((b) =>
          b.id === id ? { ...b, ...updates } : b
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update broker', loading: false });
    }
  },
  deleteBroker: async (id) => {
    set({ loading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({
        brokers: state.brokers.filter((b) => b.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete broker', loading: false });
    }
  },
}));