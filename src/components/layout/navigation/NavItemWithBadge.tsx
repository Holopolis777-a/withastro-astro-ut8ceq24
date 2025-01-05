import React from 'react';
import { NavItem } from './NavItem';
import { NavBadge } from './NavBadge';
import type { NavItem as NavItemType } from './types';

interface NavItemWithBadgeProps extends NavItemType {
  badgeCount?: number;
  badgeVariant?: 'primary' | 'error';
}

export function NavItemWithBadge({ badgeCount = 0, badgeVariant, ...props }: NavItemWithBadgeProps) {
  return (
    <div className="flex items-center">
      <NavItem {...props} />
      <NavBadge count={badgeCount} variant={badgeVariant} />
    </div>
  );
}