import { create } from 'zustand';
import type { Employee } from '../types/employee';

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  fetchEmployees: (employerId: string) => Promise<void>;
  inviteEmployee: (employerId: string, email: string, portalType: 'employee' | 'salary') => Promise<void>;
  generateInviteLink: (employerId: string, portalType: 'employee' | 'salary') => Promise<string>;
  deleteEmployee: (id: string) => Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  loading: false,
  error: null,

  fetchEmployees: async (employerId) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ employees: [], loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch employees', loading: false });
    }
  },

  inviteEmployee: async (employerId, email, portalType) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEmployee: Employee = {
        id: Date.now().toString(),
        employerId,
        firstName: '',
        lastName: '',
        email,
        employeeNumber: `EMP${Date.now().toString().slice(-3)}`,
        status: 'pending',
        portalType,
        joinDate: new Date(),
      };

      set(state => ({
        employees: [...state.employees, newEmployee],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to invite employee', loading: false });
      throw error;
    }
  },

  generateInviteLink: async (employerId, portalType) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const token = Math.random().toString(36).substring(7);
      return `https://vilocar.com/invite/${employerId}/${portalType}/${token}`;
    } catch (error) {
      throw error;
    }
  },

  deleteEmployee: async (id) => {
    set({ loading: true });
    try {
      set(state => ({
        employees: state.employees.filter(emp => emp.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete employee', loading: false });
    }
  },
}));