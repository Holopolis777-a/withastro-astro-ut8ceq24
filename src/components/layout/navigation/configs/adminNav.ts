import { 
  LayoutDashboard, 
  Users, 
  Car, 
  ShoppingCart, 
  FileText, 
  Building2, 
  Wallet,
  Settings,
  MessageCircle,
  Mail,
  Bell,
  HelpCircle
} from 'lucide-react';
import type { NavSection } from '../types';

export const adminNav: NavSection[] = [
  {
    title: 'Verwaltung',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/companies', label: 'Unternehmen', icon: Building2 },
      { path: '/brokers', label: 'Makler', icon: Users },
      { path: '/admin/members', label: 'Mitglieder', icon: Users },
      { path: '/admin/settings', label: 'Einstellungen', icon: Settings },
    ],
  },
  {
    title: 'Fahrzeuge & Bestellungen',
    items: [
      { path: '/vehicles', label: 'Fahrzeuge', icon: Car },
      { path: '/vehicles/pool', label: 'Pool-Fahrzeuge', icon: Building2 },
      { path: '/salary-sacrifice', label: 'Gehaltsumwandlung', icon: Wallet },
      { path: '/new-orders', label: 'Neue Bestellungen', icon: ShoppingCart },
      { path: '/orders', label: 'Bestellungen', icon: FileText },
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