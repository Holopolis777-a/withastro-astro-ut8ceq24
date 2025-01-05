import { create } from 'zustand';
import type { AuthState, UserRole } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  profileImage: null,

  login: async (email: string, password: string, role: UserRole) => {
    // Mock login - replace with actual auth implementation
    const mockUser = {
      id: '1',
      email,
      name: 'John Doe',
      role,
      createdAt: new Date(),
    };
    set({ user: mockUser, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, profileImage: null });
  },

  updateProfileImage: (imageUrl: string) => {
    set({ profileImage: imageUrl });
  },

  // Add new method to update user profile
  updateProfile: async (updates: Partial<{ name: string; email: string }>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },
}));