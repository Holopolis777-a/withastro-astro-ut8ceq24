interface CompanyAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Company {
  id: string;
  name: string;
  recipientName: string; // Added recipient name
  legalForm: string;
  email: string;
  phone: string;
  industry: string;
  status: 'active' | 'pending';
  employeeCount: number;
  activeVehicles: number;
  createdAt: Date;
  logo?: string;
  address: CompanyAddress;
}

export interface CompanyInvitation {
  name: string;
  recipientName: string; // Added recipient name
  legalForm: string;
  email: string;
  phone: string;
  industry: string;
  employeeCount: number;
  logo?: string;
  address: CompanyAddress;
}