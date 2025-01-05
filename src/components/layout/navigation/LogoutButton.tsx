import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';

export function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <button
      onClick={logout}
      className="flex items-center px-6 py-3 text-base font-medium rounded-lg text-gray-900 hover:bg-gray-100 hover:text-primary-400 transition-colors w-full"
    >
      <LogOut className="w-5 h-5 mr-3" />
      <span>Abmelden</span>
    </button>
  );
}