import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function GeneralSettings() {
  const navigate = useNavigate();

  const settingsSections = [
    {
      title: 'Logo & Branding',
      description: 'Verwalten Sie das Portal-Logo und Branding-Einstellungen',
      path: 'logo',
    },
    {
      title: 'Administrator-Verwaltung',
      description: 'Verwalten Sie Administrator-Zugänge und Berechtigungen',
      path: 'admins',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Settings className="w-5 h-5 text-gray-600" />
        </div>
        <h2 className="text-lg font-medium">Allgemeine Einstellungen</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map((section) => (
          <div
            key={section.path}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-medium mb-2">{section.title}</h3>
            <p className="text-gray-600 mb-4">{section.description}</p>
            <Button
              variant="outline"
              onClick={() => navigate(section.path)}
            >
              Einstellungen öffnen
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}