import { LucideIcon } from 'lucide-react';

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  fullPath?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}