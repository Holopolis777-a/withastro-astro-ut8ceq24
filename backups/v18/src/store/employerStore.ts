import { create } from 'zustand';
import type { Employer, EmployerDashboardStats } from '../types/employer';

interface EmployerState {
  employers: Employer[];
  loading: boolean;
  error: string | null;
  stats: EmployerDashboardStats | null;
  fetchEmployers: () => Promise<void>;
  addEmployer: (employer: Omit<Employer, 'id' | 'createdAt'>) => Promise<void>;
  updateEmployer: (id: string, updates: Partial<Employer>) => Promise<void>;
  deleteEmployer: (id: string) => Promise<void>;
  fetchStats: (employerId: string) => Promise<void>;
}

// Mock data
const mockEmployers: Employer[] = [
  {
    id: '1',
    name: 'Max Mustermann',
    companyName: 'Technik GmbH',
    email: 'max.mustermann@technik-gmbh.de',
    phone: '+49 123 456789',
    address: {
      street: 'Hauptstraße 1',
      city: 'Berlin',
      postalCode: '10115',
      country: 'Deutschland',
    },
    status: 'active',
    createdAt: new Date(),
    employeeCount: 250,
    activeOrders: 15,
    taxId: 'DE123456789',
    industry: 'Technology',
    contractStart: new Date(),
    maxEmployees: 500,
    settings: {
      allowEmployeeRegistration: true,
      requireApproval: true,
      maxOrdersPerEmployee: 1,
    },
  },
];

export const useEmployerStore = create<EmployerState>((set) => ({
  employers: [],
  loading: false,
  error: null,
  stats: null,

  fetchEmployers: async () => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ employers: mockEmployers, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch employers', loading: false });
    }
  },

  addEmployer: async (employer) => {
    set({ loading: true });
    try {
      const newEmployer: Employer = {
        ...employer,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      set((state) => ({
        employers: [...state.employers, newEmployer],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add employer', loading: false });
    }
  },

  updateEmployer: async (id, updates) => {
    set({ loading: true });
    try {
      set((state) => ({
        employers: state.employers.map((e) =>
          e.id === id ? { ...e, ...updates } : e
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update employer', loading: false });
    }
  },

  deleteEmployer: async (id) => {
    set({ loading: true });
    try {
      set((state) => ({
        employers: state.employers.filter((e) => e.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete employer', loading: false });
    }
  },

  fetchStats: async (employerId) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockStats: EmployerDashboardStats = {
        totalEmployees: 250,
        activeOrders: 15,
        pendingOrders: 5,
        totalVehicles: 20,
        monthlyCosts: 25000,
        savingsThisMonth: 5000,
      };
      set({ stats: mockStats, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch stats', loading: false });
    }
  },
}));