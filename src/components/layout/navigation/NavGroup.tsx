import React from 'react';
import type { NavItem } from './types';

interface NavGroupProps {
  title: string;
  children: React.ReactNode;
}

export function NavGroup({ title, children }: NavGroupProps) {
  return (
    <div className="mb-6">
      <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}