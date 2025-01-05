import { useAuthStore } from '../../../../store/authStore';

export function useNavPermissions() {
  const { user } = useAuthStore();

  return {
    canAccessAdmin: user?.role === 'admin',
    canAccessBroker: user?.role === 'broker',
    canAccessEmployer: user?.role === 'employer',
    canAccessEmployee: ['employee', 'salary-employee'].includes(user?.role || ''),
  };
}