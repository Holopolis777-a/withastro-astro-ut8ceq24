import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { AdminFAQView } from './views/AdminFAQView';
import { UserFAQView } from './views/UserFAQView';

export default function FAQPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  return isAdmin ? <AdminFAQView /> : <UserFAQView />;
}