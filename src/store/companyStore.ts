import { create } from 'zustand';
import type { Company, CompanyInvitation } from '../types/company';

interface CompanyState {
  companies: Company[];
  loading: boolean;
  error: string | null;
  fetchCompanies: () => Promise<void>;
  inviteCompany: (invitation: CompanyInvitation) => Promise<void>;
  updateCompany: (id: string, updates: Partial<Company>) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  companies: [],
  loading: false,
  error: null,

  fetchCompanies: async () => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ companies: [], loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch companies', loading: false });
    }
  },

  inviteCompany: async (invitation) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newCompany: Company = {
        id: Date.now().toString(),
        ...invitation,
        status: 'pending',
        activeVehicles: 0,
        createdAt: new Date(),
      };
      set(state => ({
        companies: [...state.companies, newCompany],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to invite company', loading: false });
      throw error;
    }
  },

  updateCompany: async (id, updates) => {
    set({ loading: true });
    try {
      set(state => ({
        companies: state.companies.map(company =>
          company.id === id ? { ...company, ...updates } : company
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update company', loading: false });
    }
  },

  deleteCompany: async (id) => {
    set({ loading: true });
    try {
      set(state => ({
        companies: state.companies.filter(company => company.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete company', loading: false });
    }
  },
}));