import { useMemo } from 'react';
import { useAuthStore } from '../../../../store/authStore';
import { getNavConfig } from '../config';
import { useNavBadges } from './useNavBadges';

export function useNavItems() {
  const { user } = useAuthStore();
  const badges = useNavBadges();

  return useMemo(() => {
    if (!user) return [];

    const sections = getNavConfig(user.role);

    // Add badges to navigation items
    return sections.map(section => ({
      ...section,
      items: section.items.map(item => {
        if (item.path === '/notifications') {
          return { ...item, badgeCount: badges.notifications, badgeVariant: 'error' };
        }
        if (item.path === '/messages') {
          return { ...item, badgeCount: badges.messages, badgeVariant: 'primary' };
        }
        return item;
      }),
    }));
  }, [user, badges]);
}