import React from 'react';
import { Menu } from 'lucide-react';
import { useNavigationState } from './hooks/useNavigationState';

export function NavToggle() {
  const { setIsMobileMenuOpen } = useNavigationState();

  return (
    <button
      onClick={() => setIsMobileMenuOpen(true)}
      className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}