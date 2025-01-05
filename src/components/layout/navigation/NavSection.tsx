import React from 'react';
import { NavItemWithBadge } from './NavItemWithBadge';
import type { NavSection as NavSectionType } from './types';

interface NavSectionProps extends NavSectionType {
  collapsed?: boolean;
}

export function NavSection({ title, items, collapsed }: NavSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="py-2">
      {title && !collapsed && (
        <h3 className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          {title}
        </h3>
      )}
      {items.map((item) => (
        <NavItemWithBadge key={item.path} {...item} />
      ))}
    </div>
  );
}