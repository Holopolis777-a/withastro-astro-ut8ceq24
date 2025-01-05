import { create } from 'zustand';
import type { PoolVehicleRequest, PoolVehicleRequestStatus } from '../types/poolVehicleRequest';

interface PoolVehicleRequestState {
  requests: PoolVehicleRequest[];
  loading: boolean;
  error: string | null;
  fetchRequests: (userId: string) => Promise<void>;
  updateRequestStatus: (requestId: string, status: PoolVehicleRequestStatus) => Promise<void>;
  cancelRequest: (requestId: string) => Promise<void>;
}

export const usePoolVehicleRequestStore = create<PoolVehicleRequestState>((set) => ({
  requests: [],
  loading: false,
  error: null,

  fetchRequests: async (userId) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockRequests: PoolVehicleRequest[] = [
        {
          id: '1',
          userId,
          vehicleId: 'pool-1',
          vehicle: {
            make: 'BMW',
            model: '5er',
            type: 'Limousine',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800',
          },
          startDate: new Date('2024-04-01'),
          endDate: new Date('2024-04-15'),
          status: 'pending',
          requestDate: new Date('2024-03-15'),
          bookingReference: 'POOL-2024-001',
        },
        // Add more mock data as needed
      ];

      set({ requests: mockRequests, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch requests', loading: false });
    }
  },

  updateRequestStatus: async (requestId, status) => {
    set({ loading: true });
    try {
      set(state => ({
        requests: state.requests.map(request =>
          request.id === requestId ? { ...request, status } : request
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update request status', loading: false });
    }
  },

  cancelRequest: async (requestId) => {
    set({ loading: true });
    try {
      set(state => ({
        requests: state.requests.filter(request => request.id !== requestId),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to cancel request', loading: false });
    }
  },
}));