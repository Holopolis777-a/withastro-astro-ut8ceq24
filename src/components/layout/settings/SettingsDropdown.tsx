import React from 'react';
import { User, Palette, Bell, Globe } from 'lucide-react';

interface SettingsDropdownProps {
  onClose: () => void;
}

export function SettingsDropdown({ onClose }: SettingsDropdownProps) {
  const menuItems = [
    {
      icon: User,
      label: 'Benutzerprofil bearbeiten',
      onClick: () => console.log('Profil bearbeiten'),
    },
    {
      icon: Palette,
      label: 'Darstellung anpassen',
      onClick: () => console.log('Darstellung anpassen'),
    },
    {
      icon: Bell,
      label: 'Benachrichtigungseinstellungen',
      onClick: () => console.log('Benachrichtigungen anpassen'),
    },
    {
      icon: Globe,
      label: 'Sprache ändern',
      onClick: () => console.log('Sprache ändern'),
    },
  ];

  return (
    <div
      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="settings-menu"
    >
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={item.onClick}
            role="menuitem"
          >
            <Icon className="w-4 h-4 mr-3" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}