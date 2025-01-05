export interface Broker {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  status: 'active' | 'inactive';
  createdAt: Date;
  membersCount: number;
  activeOrders: number;
}