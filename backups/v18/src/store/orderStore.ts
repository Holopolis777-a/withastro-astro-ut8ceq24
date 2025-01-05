import { create } from 'zustand';
import type { Order, OrderStatus } from '../types/order';
import type { Vehicle } from '../types/vehicle';

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  createOrder: (vehicleId: string, userId: string, configuration: Order['configuration'], vehicle: Vehicle) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getOrders: (userId: string) => Order[];
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  createOrder: async (vehicleId, userId, configuration, vehicle) => {
    set({ loading: true });
    try {
      const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;
      const estimatedDeliveryDate = new Date();
      estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 30); // Example: 30 days delivery time

      const newOrder: Order = {
        id: Date.now().toString(),
        userId,
        vehicleId,
        orderNumber,
        status: 'pending',
        createdAt: new Date(),
        estimatedDeliveryDate,
        configuration,
        vehicle: {
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          image: vehicle.images[0],
        },
        totalMonthlyRate: configuration.monthlyRate,
      };

      set(state => ({
        orders: [...state.orders, newOrder],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create order', loading: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    set({ loading: true });
    try {
      set(state => ({
        orders: state.orders.map(order =>
          order.id === orderId ? { ...order, status } : order
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update order status', loading: false });
    }
  },

  getOrders: (userId) => {
    return get().orders
      .filter(order => order.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
}));