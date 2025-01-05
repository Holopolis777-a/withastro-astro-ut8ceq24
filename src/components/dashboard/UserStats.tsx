import React from 'react';
import { ShoppingBag, TrendingUp } from 'lucide-react';
import { StatCard } from './StatCard';

export function UserStats() {
  const stats = [
    {
      title: 'Aktive Verträge',
      value: '1',
      change: { value: 'Läuft noch 24 Monate', positive: true },
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      title: 'Gefahrene Kilometer',
      value: '2.450',
      change: { value: '7.550 km verbleibend', positive: true },
      icon: TrendingUp,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}