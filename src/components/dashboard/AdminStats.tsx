import React from 'react';
import { TrendingUp, Users, ShoppingBag, UserPlus } from 'lucide-react';
import { StatCard } from './StatCard';

export function AdminStats() {
  const stats = [
    {
      title: 'Gesamtumsatz',
      value: '€31k',
      change: { value: '+15% seit gestern', positive: true },
      icon: TrendingUp,
      color: 'bg-pink-500',
    },
    {
      title: 'Bestellungen',
      value: '300',
      change: { value: '+5% seit gestern', positive: true },
      icon: ShoppingBag,
      color: 'bg-orange-500',
    },
    {
      title: 'Verkaufte Fahrzeuge',
      value: '5',
      change: { value: '+12% seit gestern', positive: true },
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Neue Kunden',
      value: '8',
      change: { value: '+8.5% seit gestern', positive: true },
      icon: UserPlus,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}