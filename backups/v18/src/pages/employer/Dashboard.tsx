import React from 'react';
import { useEmployerStore } from '../../store/employerStore';
import { useAuthStore } from '../../store/authStore';
import { EmployerStats } from '../../components/employer/dashboard/EmployerStats';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function EmployerDashboard() {
  const { user } = useAuthStore();
  const { stats, loading, fetchStats } = useEmployerStore();

  React.useEffect(() => {
    if (user?.id) {
      fetchStats(user.id);
    }
  }, [user?.id, fetchStats]);

  if (loading || !stats) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Arbeitgeber Dashboard</h1>
      <EmployerStats stats={stats} />
    </div>
  );
}