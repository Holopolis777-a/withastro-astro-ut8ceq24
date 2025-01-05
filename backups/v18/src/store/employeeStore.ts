import { create } from 'zustand';
import type { Employee } from '../types/employee';

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  fetchEmployees: (employerId: string) => Promise<void>;
  addEmployee: (employee: Omit<Employee, 'id' | 'employeeNumber'>) => Promise<void>;
  updateEmployee: (id: string, updates: Partial<Employee>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  inviteEmployee: (employerId: string, email: string) => Promise<void>;
}

// Mock data
const mockEmployees: Employee[] = [
  {
    id: '1',
    employerId: '1',
    firstName: 'Anna',
    lastName: 'Schmidt',
    email: 'anna.schmidt@technik-gmbh.de',
    employeeNumber: 'EMP001',
    department: 'IT',
    position: 'Software Developer',
    status: 'active',
    joinDate: new Date('2023-01-15'),
    salaryInfo: {
      grossSalary: 65000,
      taxClass: '1',
      hasChurchTax: false,
      distanceToWork: 25,
    },
  },
];

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  loading: false,
  error: null,

  fetchEmployees: async (employerId) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const filteredEmployees = mockEmployees.filter(
        (emp) => emp.employerId === employerId
      );
      set({ employees: filteredEmployees, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch employees', loading: false });
    }
  },

  addEmployee: async (employee) => {
    set({ loading: true });
    try {
      const newEmployee: Employee = {
        ...employee,
        id: Date.now().toString(),
        employeeNumber: `EMP${Date.now().toString().slice(-3)}`,
      };
      set((state) => ({
        employees: [...state.employees, newEmployee],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add employee', loading: false });
    }
  },

  updateEmployee: async (id, updates) => {
    set({ loading: true });
    try {
      set((state) => ({
        employees: state.employees.map((e) =>
          e.id === id ? { ...e, ...updates } : e
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update employee', loading: false });
    }
  },

  deleteEmployee: async (id) => {
    set({ loading: true });
    try {
      set((state) => ({
        employees: state.employees.filter((e) => e.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete employee', loading: false });
    }
  },

  inviteEmployee: async (employerId, email) => {
    set({ loading: true });
    try {
      const newEmployee: Employee = {
        id: Date.now().toString(),
        employerId,
        firstName: '',
        lastName: '',
        email,
        employeeNumber: `EMP${Date.now().toString().slice(-3)}`,
        status: 'pending',
        joinDate: new Date(),
      };
      set((state) => ({
        employees: [...state.employees, newEmployee],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to invite employee', loading: false });
    }
  },
}));