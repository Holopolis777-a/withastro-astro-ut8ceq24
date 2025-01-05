import { useAuthStore } from '../store/authStore';

export function usePermissions() {
  const { user } = useAuthStore();

  return {
    // Admin-only permissions
    canManageVehicles: user?.role === 'admin',
    canManageBrokers: user?.role === 'admin',
    
    // Broker permissions
    canManageMembers: user?.role === 'broker' || user?.role === 'admin',
    
    // Member/User permissions
    canOrderVehicles: user?.role === 'user',
    
    // Universal permissions
    canViewVehicles: true, // All roles can view vehicles
    
    // Role checks
    isAdmin: user?.role === 'admin',
    isBroker: user?.role === 'broker',
    isUser: user?.role === 'user',
  };
}