import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigationState } from './hooks/useNavigationState';

export function NavCollapse() {
  const { isCollapsed, toggleCollapsed } = useNavigationState();

  return (
    <button
      onClick={toggleCollapsed}
      className="hidden lg:flex absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-gray-200 items-center justify-center text-gray-500 hover:text-gray-900"
    >
      {isCollapsed ? (
        <ChevronRight className="w-4 h-4" />
      ) : (
        <ChevronLeft className="w-4 h-4" />
      )}
    </button>
  );
}