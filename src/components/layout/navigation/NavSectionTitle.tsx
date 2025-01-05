import React from 'react';
import clsx from 'clsx';

interface NavSectionTitleProps {
  children: React.ReactNode;
  collapsed?: boolean;
}

export function NavSectionTitle({ children, collapsed }: NavSectionTitleProps) {
  if (collapsed) return null;

  return (
    <h3 className={clsx(
      'px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2'
    )}>
      {children}
    </h3>
  );
}