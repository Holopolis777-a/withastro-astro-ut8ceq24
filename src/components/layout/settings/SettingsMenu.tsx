import React from 'react';
import { Settings } from 'lucide-react';
import { SettingsDropdown } from './SettingsDropdown';

export function SettingsMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        aria-label="Einstellungen öffnen"
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && <SettingsDropdown onClose={() => setIsOpen(false)} />}
    </div>
  );
}