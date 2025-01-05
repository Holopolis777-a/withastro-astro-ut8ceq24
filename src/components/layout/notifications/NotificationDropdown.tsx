import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import type { Notification } from '../../../types/notifications';

interface NotificationDropdownProps {
  notifications: Notification[];
  onClose: () => void;
}

export function NotificationDropdown({ notifications, onClose }: NotificationDropdownProps) {
  return (
    <div 
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="notification-menu"
    >
      <div className="px-4 py-2 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Benachrichtigungen</h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-4 py-3 text-sm text-gray-500">
            Keine neuen Benachrichtigungen
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 hover:bg-gray-50 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <p className="text-sm text-gray-900">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(notification.createdAt, {
                  addSuffix: true,
                  locale: de,
                })}
              </p>
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-200">
          <button
            className="text-sm text-blue-600 hover:text-blue-800"
            onClick={onClose}
          >
            Alle als gelesen markieren
          </button>
        </div>
      )}
    </div>
  );
}