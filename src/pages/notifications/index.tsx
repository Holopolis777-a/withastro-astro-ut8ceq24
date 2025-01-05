import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { NotificationItem } from './components/NotificationItem';

export default function Notifications() {
  const { notifications, markAsRead } = useNotifications();

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary-400 rounded-xl">
          <Bell className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Benachrichtigungen</h1>
          <p className="text-gray-500">Ihre aktuellen Mitteilungen und Updates</p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
          />
        ))}
      </div>
    </div>
  );
}