import React from 'react';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface NavItemIconProps {
  icon: LucideIcon;
  isActive?: boolean;
  collapsed?: boolean;
}

export function NavItemIcon({ icon: Icon, isActive, collapsed }: NavItemIconProps) {
  return (
    <div
      className={clsx(
        'flex-shrink-0',
        collapsed ? 'mx-auto' : 'mr-3',
        isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-400'
      )}
    >
      <Icon className="w-5 h-5" />
    </div>
  );
}