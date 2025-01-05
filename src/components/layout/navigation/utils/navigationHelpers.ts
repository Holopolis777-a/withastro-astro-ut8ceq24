import type { NavItem } from '../types';

export function filterVisibleItems(items: NavItem[], userPermissions: string[]): NavItem[] {
  return items.filter(item => {
    if (!item.requiredPermission) return true;
    return userPermissions.includes(item.requiredPermission);
  });
}

export function groupNavItems(items: NavItem[]): { [key: string]: NavItem[] } {
  return items.reduce((groups, item) => {
    const group = item.group || 'default';
    return {
      ...groups,
      [group]: [...(groups[group] || []), item],
    };
  }, {} as { [key: string]: NavItem[] });
}