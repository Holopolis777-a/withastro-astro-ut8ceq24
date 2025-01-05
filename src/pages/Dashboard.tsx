import React from 'react';
import { useAuthStore } from '../store/authStore';
import { AdminStats } from '../components/dashboard/AdminStats';
import { BrokerStats } from '../components/dashboard/BrokerStats';
import { UserStats } from '../components/dashboard/UserStats';
import { NewsFeed } from '../components/dashboard/NewsFeed';

export default function Dashboard() {
  const { user } = useAuthStore();

  const renderStats = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminStats />;
      case 'broker':
        return <BrokerStats />;
      case 'user':
        return <UserStats />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {renderStats()}
      <NewsFeed />
    </div>
  );
}