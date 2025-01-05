import { create } from 'zustand';

import { supabase } from '../lib/supabase';

interface Admin {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface AdminState {
  admins: Admin[];
  portalLogo: string | null;
  loading: boolean;
  error: string | null;
  inviteAdmin: (email: string) => Promise<void>;
  removeAdmin: (adminId: string) => Promise<void>;
  updatePortalLogo: (logoUrl: string) => Promise<void>;
  deletePortalLogo: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  admins: [],
  portalLogo: null,
  loading: false,
  error: null,

  inviteAdmin: async (email: string) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAdmin: Admin = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        createdAt: new Date(),
      };

      set(state => ({
        admins: [...state.admins, newAdmin],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to invite admin', loading: false });
      throw error;
    }
  },

  removeAdmin: async (adminId: string) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        admins: state.admins.filter(admin => admin.id !== adminId),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to remove admin', loading: false });
      throw error;
    }
  },

  updatePortalLogo: async (logoUrl: string) => {
    set({ loading: true });
    try {
      const { error: settingsError } = await supabase
        .from('settings')
        .upsert({ 
          key: 'portal_logo',
          value: { url: logoUrl }
        });

      if (settingsError) throw settingsError;

      set({ portalLogo: logoUrl, loading: false });
    } catch (error) {
      console.error('Error updating logo in settings:', error);
      set({ error: 'Failed to update logo', loading: false });
      throw error;
    }
  },

  deletePortalLogo: async () => {
    set({ loading: true });
    try {
      const { error: settingsError } = await supabase
        .from('settings')
        .delete()
        .eq('key', 'portal_logo');

      if (settingsError) throw settingsError;

      set({ portalLogo: null, loading: false });
    } catch (error) {
      console.error('Error deleting logo from settings:', error);
      set({ error: 'Failed to delete logo', loading: false });
      throw error;
    }
  },
}));