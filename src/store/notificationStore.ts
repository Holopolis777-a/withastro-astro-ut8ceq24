import { create } from 'zustand';
import type { Notification } from '../types/notifications';

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  loading: false,
  error: null,

  fetchNotifications: async () => {
    set({ loading: true });
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'Neue Bestellung',
          message: 'Eine neue Bestellung wurde eingereicht',
          type: 'info',
          read: false,
          timestamp: new Date(),
        },
        {
          id: '2',
          title: 'Bestellung bestätigt',
          message: 'Ihre Bestellung wurde erfolgreich bestätigt',
          type: 'success',
          read: false,
          timestamp: new Date(Date.now() - 3600000),
        },
      ];
      set({ notifications: mockNotifications, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch notifications', loading: false });
    }
  },

  markAsRead: async (id) => {
    set(state => ({
      notifications: state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  markAllAsRead: async () => {
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
    }));
  },
}));