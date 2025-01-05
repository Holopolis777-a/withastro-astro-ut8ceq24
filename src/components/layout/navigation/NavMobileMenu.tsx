import React from 'react';
import { X } from 'lucide-react';
import { NavHeader } from './NavHeader';
import { NavSection } from './NavSection';
import { LogoutButton } from './LogoutButton';
import { useNavigationState } from './hooks/useNavigationState';
import type { NavSection as NavSectionType } from './types';

interface NavMobileMenuProps {
  sections: NavSectionType[];
}

export function NavMobileMenu({ sections }: NavMobileMenuProps) {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useNavigationState();

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div 
        className="fixed inset-0 bg-gray-600 bg-opacity-75" 
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      <div className="relative flex flex-col w-full max-w-xs bg-white h-full">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <NavHeader />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sections.map((section, index) => (
            <NavSection key={section.title || index} {...section} />
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}