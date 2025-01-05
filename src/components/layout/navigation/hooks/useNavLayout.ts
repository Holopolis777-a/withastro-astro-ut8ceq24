import { useCallback } from 'react';
import { useNavigationState } from './useNavigationState';
import { useWindowSize } from '../../../../hooks/useWindowSize';

export function useNavLayout() {
  const { width } = useWindowSize();
  const { isCollapsed, setIsMobileMenuOpen } = useNavigationState();

  const isMobile = width < 1024;
  const sidebarWidth = isCollapsed ? 80 : 256;

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, [setIsMobileMenuOpen]);

  return {
    isMobile,
    sidebarWidth,
    closeMobileMenu,
  };
}