import { create } from 'zustand';

interface VehicleRequest {
  id: string;
  userId: string;
  vehicle: {
    make: string;
    model: string;
    type: string;
    image: string;
  };
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  bookingReference?: string;
}

interface VehicleRequestStore {
  requests: VehicleRequest[];
  loading: boolean;
  error: string | null;
  fetchRequests: (userId: string) => Promise<void>;
  cancelRequest: (requestId: string) => Promise<void>;
}

export const useVehicleRequestStore = create<VehicleRequestStore>((set) => ({
  requests: [],
  loading: false,
  error: null,

  fetchRequests: async (userId) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock data
      const mockRequests: VehicleRequest[] = [
        {
          id: '1',
          userId,
          vehicle: {
            make: 'BMW',
            model: '3er',
            type: 'Limousine',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800',
          },
          startDate: new Date('2024-04-01'),
          endDate: new Date('2024-04-15'),
          status: 'pending',
          bookingReference: 'REQ-2024-001',
        },
        {
          id: '2',
          userId,
          vehicle: {
            make: 'Tesla',
            model: 'Model 3',
            type: 'Limousine',
            image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800',
          },
          startDate: new Date('2024-05-01'),
          endDate: new Date('2024-05-31'),
          status: 'approved',
          bookingReference: 'REQ-2024-002',
        },
      ];

      set({ requests: mockRequests, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch requests', loading: false });
    }
  },

  cancelRequest: async (requestId) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      set((state) => ({
        requests: state.requests.filter((request) => request.id !== requestId),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to cancel request', loading: false });
      throw error;
    }
  },
}));