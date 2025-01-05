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
  portalType: 'employee' | 'salary'; // Added field
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