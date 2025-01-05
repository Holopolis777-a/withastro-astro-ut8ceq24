import React from 'react';
import { NotificationBell } from './notifications/NotificationBell';
import { SettingsMenu } from './settings/SettingsMenu';
import { useAuthStore } from '../../store/authStore';

export function Header() {
  const { user } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome back, {user?.name}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationBell />
          <SettingsMenu />
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">
                {user?.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}