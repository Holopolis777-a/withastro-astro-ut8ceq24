import { LayoutDashboard, Car, FileText, MessageCircle, Mail, Bell, HelpCircle } from 'lucide-react';
import type { NavSection } from '../types';

export const employeeNav: NavSection[] = [
  {
    title: 'Übersicht',
    items: [
      { path: '/employee/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/employee/vehicles', label: 'Fahrzeuge', icon: Car },
      { path: '/employee/requests', label: 'Anfragen', icon: FileText },
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