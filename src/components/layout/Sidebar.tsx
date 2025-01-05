import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../hooks/useTranslation';
import {
  LayoutDashboard,
  Users,
  Car,
  ShoppingCart,
  AlertCircle,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import clsx from 'clsx';

export function Sidebar() {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();

  const adminRoutes = [
    { path: '/dashboard', label: t('navigation.dashboard'), icon: LayoutDashboard },
    { path: '/brokers', label: t('navigation.brokers'), icon: Users },
    { path: '/vehicles', label: t('navigation.vehicles'), icon: Car },
    { path: '/orders', label: t('navigation.orders'), icon: ShoppingCart },
    { path: '/damages', label: t('navigation.damages'), icon: AlertCircle },
    { path: '/faq', label: t('navigation.faq'), icon: HelpCircle },
  ];

  const brokerRoutes = [
    { path: '/dashboard', label: t('navigation.dashboard'), icon: LayoutDashboard },
    { path: '/members', label: t('navigation.members'), icon: Users },
    { path: '/member-orders', label: t('navigation.memberOrders'), icon: ShoppingCart },
    { path: '/available-vehicles', label: t('navigation.availableVehicles'), icon: Car },
    { path: '/how-it-works', label: t('navigation.howItWorks'), icon: HelpCircle },
    { path: '/faq', label: t('navigation.faq'), icon: HelpCircle },
  ];

  const userRoutes = [
    { path: '/dashboard', label: t('navigation.dashboard'), icon: LayoutDashboard },
    { path: '/vehicles', label: t('navigation.availableVehicles'), icon: Car },
    { path: '/my-orders', label: t('navigation.myOrders'), icon: ShoppingCart },
    { path: '/faq', label: t('navigation.faq'), icon: HelpCircle },
  ];

  const routes = React.useMemo(() => {
    switch (user?.role) {
      case 'admin':
        return adminRoutes;
      case 'broker':
        return brokerRoutes;
      case 'user':
        return userRoutes;
      default:
        return [];
    }
  }, [user?.role]);

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-gray-900 text-white">
      <div className="p-5">
        <h1 className="text-2xl font-bold">Vilonda Portal</h1>
      </div>

      <nav className="flex-1 px-3 py-4">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center px-4 py-3 text-sm rounded-lg mb-1 transition-colors',
                {
                  'bg-gray-800 text-white': isActive,
                  'text-gray-300 hover:bg-gray-800 hover:text-white': !isActive,
                }
              )
            }
          >
            <route.icon className="w-5 h-5 mr-3" />
            {route.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-sm text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          {t('navigation.logout')}
        </button>
      </div>
    </aside>
  );
}