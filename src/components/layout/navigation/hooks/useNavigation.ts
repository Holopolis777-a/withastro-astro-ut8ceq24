import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigationState } from './useNavigationState';

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsMobileMenuOpen } = useNavigationState();

  const handleNavigation = useCallback((path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  }, [navigate, setIsMobileMenuOpen]);

  const isActive = useCallback((path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  }, [location]);

  return {
    handleNavigation,
    isActive,
  };
}