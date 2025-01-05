import { LayoutDashboard, Car, FileText, Wallet, MessageCircle, Mail, Bell, HelpCircle } from 'lucide-react';
import type { NavSection } from '../types';

export const salaryEmployeeNav: NavSection[] = [
  {
    title: 'Übersicht',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/vehicles', label: 'Reguläre Fahrzeuge', icon: Car },
      { path: '/salary-sacrifice', label: 'Gehaltsumwandlung', icon: Wallet },
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