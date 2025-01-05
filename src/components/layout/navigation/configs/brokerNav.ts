import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Car, 
  Gift, 
  Info,
  MessageCircle,
  Mail,
  Bell,
  HelpCircle 
} from 'lucide-react';
import type { NavSection } from '../types';

export const brokerNav: NavSection[] = [
  {
    title: 'Übersicht',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/members', label: 'Mitglieder', icon: Users },
      { path: '/member-orders', label: 'Bestellungen', icon: ShoppingCart },
    ],
  },
  {
    title: 'Fahrzeuge',
    items: [
      { path: '/vehicles', label: 'Fahrzeuge', icon: Car },
      { path: '/benefits', label: 'Vorteile', icon: Gift },
      { path: '/how-it-works', label: 'Funktionsweise', icon: Info },
    ],
  },
  {
    title: 'Kommunikation',
    items: [
      { path: '/tickets', label: 'Support-Tickets', icon: MessageCircle },
      { path: '/messages', label: 'Nachrichten', icon: Mail },
      { path: '/notifications', label: 'Benachrichtigungen', icon: Bell },
      { path: '/faq', label: 'FAQ', icon: HelpCircle }
    ],
  },
];