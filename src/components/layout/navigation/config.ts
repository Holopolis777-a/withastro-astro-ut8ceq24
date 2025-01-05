import { MessageCircle, Mail, Bell, HelpCircle } from 'lucide-react';
import { adminNav, brokerNav, employerNav, employeeNav, salaryEmployeeNav } from './configs';
import type { UserRole } from '../../types/auth';
import type { NavSection } from './types';

export const getNavConfig = (role: UserRole): NavSection[] => {
  const communicationSection = {
    title: 'Kommunikation',
    items: [
      { path: '/tickets', label: 'Support-Tickets', icon: MessageCircle },
      { path: '/messages', label: 'Nachrichten', icon: Mail },
      { path: '/notifications', label: 'Benachrichtigungen', icon: Bell },
      { path: '/faq', label: 'FAQ', icon: HelpCircle },
    ],
  };

  switch (role) {
    case 'admin':
      return [...adminNav, communicationSection];
    case 'broker':
      return [...brokerNav, communicationSection];
    case 'employer':
      return [...employerNav, communicationSection];
    case 'employee':
      return [...employeeNav, communicationSection];
    case 'salary-employee':
      return [...salaryEmployeeNav, communicationSection];
    default:
      return [communicationSection];
  }
};