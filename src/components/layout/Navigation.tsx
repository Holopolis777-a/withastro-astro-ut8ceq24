import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../hooks/useTranslation';
import { NavHeader } from './navigation/NavHeader';
import { NavSection } from './navigation/NavSection';
import { LogoutButton } from './navigation/LogoutButton';
import { adminNav } from './navigation/configs/adminNav';
import { brokerNav } from './navigation/configs/brokerNav';
import { employerNav } from './navigation/configs/employerNav';
import { employeeNav } from './navigation/configs/employeeNav';
import { salaryEmployeeNav } from './navigation/configs/salaryEmployeeNav';
import { Logo } from '../common/Logo';

export default function Navigation() {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();

  const navSections = React.useMemo(() => {
    switch (user?.role) {
      case 'admin':
        return adminNav;
      case 'broker':
        return brokerNav;
      case 'employer':
        return employerNav;
      case 'employee':
        return employeeNav;
      case 'salary-employee':
        return salaryEmployeeNav;
      default:
        return [];
    }
  }, [user?.role]);

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-5">
        <Logo />
      </div>
      
      <nav className="flex-1 px-3 py-4">
        {navSections.map((section, index) => (
          <NavSection key={section.title || index} {...section} />
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <LogoutButton />
      </div>
    </aside>
  );
}