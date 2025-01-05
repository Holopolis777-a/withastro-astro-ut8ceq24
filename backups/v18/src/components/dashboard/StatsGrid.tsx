import React from 'react';
import { StatCard } from './StatCard';
import { TrendingUp, Users, ShoppingBag, UserPlus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function StatsGrid() {
  const { user } = useAuthStore();

  const adminStats = [
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

  const brokerStats = [
    {
      title: 'Aktive Mitglieder',
      value: '45',
      change: { value: '+3% seit letztem Monat', positive: true },
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Offene Anfragen',
      value: '12',
      change: { value: '+2 seit gestern', positive: true },
      icon: ShoppingBag,
      color: 'bg-orange-500',
    },
    {
      title: 'Abgeschlossene Verträge',
      value: '8',
      change: { value: '+1 diese Woche', positive: true },
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Neue Interessenten',
      value: '3',
      change: { value: '+3 diese Woche', positive: true },
      icon: UserPlus,
      color: 'bg-purple-500',
    },
  ];

  const userStats = [
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

  const stats = user?.role === 'admin' 
    ? adminStats 
    : user?.role === 'broker'
    ? brokerStats
    : userStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}