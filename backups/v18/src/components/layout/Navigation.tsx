import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  LayoutDashboard,
  Users,
  Car,
  ShoppingCart,
  HelpCircle,
  Info,
  InboxIcon,
  FileText,
  Gift,
  UserPlus,
  Wallet,
  Building2,
} from 'lucide-react';
import clsx from 'clsx';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
}

export function Navigation() {
  const { user } = useAuthStore();
  const location = useLocation();

  const navItems = React.useMemo(() => {
    switch (user?.role) {
      case 'admin':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
          { path: '/brokers', label: 'Makler', icon: Users, exact: true },
          { path: '/admin/members', label: 'Mitglieder', icon: UserPlus, exact: true },
          { path: '/vehicles', label: 'Fahrzeuge', icon: Car, exact: true },
          { path: '/vehicles/pool', label: 'Pool-Fahrzeuge', icon: Building2, exact: true },
          { path: '/salary-sacrifice', label: 'Gehaltsumwandlung', icon: Wallet },
          { path: '/new-orders', label: 'Neue Bestellungen', icon: InboxIcon, exact: true },
          { path: '/orders', label: 'Bestellungen', icon: ShoppingCart, exact: true },
          { path: '/news', label: 'News', icon: FileText, exact: true },
          { path: '/faq', label: 'FAQ', icon: HelpCircle, exact: true },
        ];
      // ... rest of the cases remain the same
      default:
        return [
          { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
          { path: '/vehicles', label: 'Fahrzeuge', icon: Car, exact: true },
          { path: '/faq', label: 'FAQ', icon: HelpCircle, exact: true },
        ];
    }
  }, [user?.role]);

  return (
    <nav className="space-y-1 py-2">
      {navItems.map((item) => {
        const isActive = item.exact 
          ? location.pathname === item.path
          : location.pathname.startsWith(item.path);

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={clsx(
              'flex items-center px-6 py-3 text-base font-medium rounded-lg transition-colors',
              {
                'bg-primary-400 text-white': isActive,
                'text-gray-900 hover:bg-gray-100 hover:text-primary-400': !isActive,
              }
            )}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}