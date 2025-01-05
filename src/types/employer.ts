export interface Employer {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  status: 'active' | 'inactive';
  createdAt: Date;
  employeeCount: number;
  activeOrders: number;
  taxId: string;
  industry: string;
  contractStart: Date;
  contractEnd?: Date;
  maxEmployees: number;
  settings: {
    allowEmployeeRegistration: boolean;
    requireApproval: boolean;
    maxOrdersPerEmployee: number;
  };
}

export interface EmployerDashboardStats {
  totalEmployees: number;
  activeOrders: number;
  pendingOrders: number;
  totalVehicles: number;
  monthlyCosts: number;
  savingsThisMonth: number;
}

export interface EmployerFilters {
  search?: string;
  status?: 'active' | 'inactive';
  industry?: string;
  minEmployees?: number;
  maxEmployees?: number;
}