import React from 'react';
import clsx from 'clsx';

interface NavItemLabelProps {
  children: React.ReactNode;
  isActive?: boolean;
  collapsed?: boolean;
}

export function NavItemLabel({ children, isActive, collapsed }: NavItemLabelProps) {
  if (collapsed) return null;

  return (
    <span
      className={clsx(
        'truncate',
        isActive ? 'text-white' : 'text-gray-900 group-hover:text-primary-400'
      )}
    >
      {children}
    </span>
  );
}