import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface NavItemProps {
  path: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

export function NavItem({ path, label, icon: Icon, exact }: NavItemProps) {
  const location = useLocation();
  
  const isActive = React.useMemo(() => {
    if (exact) {
      return location.pathname === path;
    }
    // Special handling for vehicle and salary sacrifice paths
    if (path === '/vehicles') {
      return location.pathname.startsWith('/vehicles') && !location.pathname.startsWith('/vehicles/pool');
    }
    if (path === '/salary-sacrifice') {
      return location.pathname.startsWith('/salary-sacrifice');
    }
    return location.pathname.startsWith(path);
  }, [location.pathname, path, exact]);

  return (
    <NavLink
      to={path}
      className={clsx(
        'flex items-center px-6 py-3 text-base font-medium rounded-lg transition-colors',
        {
          'bg-primary-400 text-white': isActive,
          'text-gray-900 hover:bg-gray-100 hover:text-primary-400': !isActive,
        }
      )}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span>{label}</span>
    </NavLink>
  );
}