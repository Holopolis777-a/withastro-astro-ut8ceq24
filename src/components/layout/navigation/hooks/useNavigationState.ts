import { create } from 'zustand';

interface NavigationState {
  isCollapsed: boolean;
  isMobileMenuOpen: boolean;
  toggleCollapsed: () => void;
  toggleMobileMenu: () => void;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const useNavigationState = create<NavigationState>((set) => ({
  isCollapsed: false,
  isMobileMenuOpen: false,
  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setIsMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}));