export interface Employee {
  id: string;
  employerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  employeeNumber: string;
  department?: string;
  position?: string;
  status: 'active' | 'pending' | 'inactive';
  joinDate: Date;
  lastLogin?: Date;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  salaryInfo?: {
    grossSalary: number;
    taxClass: string;
    hasChurchTax: boolean;
    distanceToWork: number;
  };
}

export interface EmployeeFilters {
  search?: string;
  status?: 'active' | 'pending' | 'inactive';
  department?: string;
  minSalary?: number;
  maxSalary?: number;
}