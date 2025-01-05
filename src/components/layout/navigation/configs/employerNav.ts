import { LayoutDashboard, Info, Users, Settings, MessageCircle, Mail, Bell, HelpCircle } from 'lucide-react';
import type { NavSection } from '../types';

export const employerNav: NavSection[] = [
  {
    title: 'Verwaltung',
    items: [
      { path: '/employer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/employer/information', label: 'Informationen', icon: Info },
      { path: '/employees', label: 'Mitarbeiter', icon: Users },
      { path: '/employer/settings', label: 'Einstellungen', icon: Settings },
    ],
  },
  {
    title: 'Kommunikation',
    items: [
      { path: '/tickets', label: 'Support-Tickets', icon: MessageCircle },
      { path: '/messages', label: 'Nachrichten', icon: Mail },
      { path: '/notifications', label: 'Benachrichtigungen', icon: Bell },
      { path: '/faq', label: 'FAQ', icon: HelpCircle },
    ],
  },
];