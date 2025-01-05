import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { formatDate } from '../../../utils/dateUtils';
import type { Notification } from '../../../types/notifications';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${
        !notification.read ? 'border-l-4 border-l-primary-400' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">{notification.title}</h3>
            <Badge variant={notification.type === 'success' ? 'success' : 'info'}>
              {notification.type === 'success' ? 'Erfolg' : 'Info'}
            </Badge>
          </div>
          <p className="text-gray-600">{notification.message}</p>
          <p className="text-sm text-gray-500">{formatDate(notification.timestamp)}</p>
        </div>
        {!notification.read && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onMarkAsRead(notification.id)}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Als gelesen markieren
          </Button>
        )}
      </div>
    </div>
  );
}