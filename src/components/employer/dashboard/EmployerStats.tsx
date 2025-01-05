import React from 'react';
import { Users, ShoppingBag, Clock, Car, PiggyBank, TrendingUp } from 'lucide-react';
import type { EmployerDashboardStats } from '../../../types/employer';

interface EmployerStatsProps {
  stats: EmployerDashboardStats;
}

export function EmployerStats({ stats }: EmployerStatsProps) {
  const statCards = [
    {
      title: 'Mitarbeiter',
      value: stats.totalEmployees,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Aktive Bestellungen',
      value: stats.activeOrders,
      icon: ShoppingBag,
      color: 'bg-green-500',
    },
    {
      title: 'Ausstehende Bestellungen',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Fahrzeugflotte',
      value: stats.totalVehicles,
      icon: Car,
      color: 'bg-purple-500',
    },
    {
      title: 'Monatliche Kosten',
      value: `${stats.monthlyCosts.toLocaleString()}€`,
      icon: PiggyBank,
      color: 'bg-red-500',
    },
    {
      title: 'Ersparnis dieser Monat',
      value: `${stats.savingsThisMonth.toLocaleString()}€`,
      icon: TrendingUp,
      color: 'bg-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-4">
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}