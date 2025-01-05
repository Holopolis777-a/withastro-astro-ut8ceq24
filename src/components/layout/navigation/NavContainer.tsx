import React from 'react';
import clsx from 'clsx';
import { useNavigationState } from './hooks/useNavigationState';

interface NavContainerProps {
  children: React.ReactNode;
}

export function NavContainer({ children }: NavContainerProps) {
  const { isCollapsed } = useNavigationState();

  return (
    <aside 
      className={clsx(
        'hidden lg:flex flex-col border-r border-gray-200 bg-white',
        isCollapsed ? 'w-20' : 'w-64',
        'transition-all duration-200'
      )}
    >
      {children}
    </aside>
  );
}