import { useState, useEffect } from 'react';
import type { Notification } from '../types/notifications';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Hier würde normalerweise die API-Abfrage stehen
    const mockNotifications: Notification[] = [
      {
        id: '1',
        message: 'Neue Bestellung eingegangen',
        read: false,
        createdAt: new Date(),
      },
      {
        id: '2',
        message: 'Fahrzeug zur Auslieferung bereit',
        read: false,
        createdAt: new Date(Date.now() - 3600000),
      },
      {
        id: '3',
        message: 'Wartungserinnerung',
        read: true,
        createdAt: new Date(Date.now() - 86400000),
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  return {
    notifications,
    unreadCount,
    markAllAsRead: () => {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    },
  };
}