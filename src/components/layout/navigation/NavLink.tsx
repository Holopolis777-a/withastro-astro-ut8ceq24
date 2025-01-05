import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
  badge?: number;
  badgeColor?: string;
}

export function NavLink({ to, icon: Icon, children, badge, badgeColor = 'bg-primary-400' }: NavLinkProps) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
          {
            'bg-primary-50 text-primary-600': isActive,
            'text-gray-700 hover:bg-gray-50 hover:text-gray-900': !isActive,
          }
        )
      }
    >
      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
      <span className="flex-1">{children}</span>
      {badge !== undefined && badge > 0 && (
        <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor} text-white`}>
          {badge}
        </span>
      )}
    </RouterNavLink>
  );
}