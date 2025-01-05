import { useState, useEffect } from 'react';
import type { Notification } from '../types/notifications';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Mock notifications
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

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = async (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
  };
}