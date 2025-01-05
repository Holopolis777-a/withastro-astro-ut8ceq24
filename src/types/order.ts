export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'ready' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  vehicleId: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: Date;
  estimatedDeliveryDate: Date;
  configuration: {
    color: string;
    materials: string[];
    monthlyRate: number;
    duration: number;
    kilometers: number;
    services: string[];
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
    image: string;
  };
  totalMonthlyRate: number;
}