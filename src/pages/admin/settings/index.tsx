import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GeneralSettings from './GeneralSettings';
import AdminManagement from './AdminManagement';
import LogoSettings from './LogoSettings';

export default function AdminSettings() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-8">Einstellungen</h1>
      <Routes>
        <Route index element={<GeneralSettings />} />
        <Route path="admins" element={<AdminManagement />} />
        <Route path="logo" element={<LogoSettings />} />
      </Routes>
    </div>
  );
}