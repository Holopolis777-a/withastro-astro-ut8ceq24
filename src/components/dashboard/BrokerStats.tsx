import React from 'react';
import { Users, ShoppingBag } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useMemberStore } from '../../store/memberStore';
import { useOrderStore } from '../../store/orderStore';
import { StatCard } from './StatCard';

export function BrokerStats() {
  const { user } = useAuthStore();
  const { getMembersForBroker } = useMemberStore();
  const { orders } = useOrderStore();
  
  // Get members for current broker
  const brokerMembers = React.useMemo(() => {
    if (!user?.id) return [];
    return getMembersForBroker(user.id);
  }, [user?.id, getMembersForBroker]);

  // Calculate completed orders for broker's members
  const completedOrders = React.useMemo(() => {
    const memberIds = brokerMembers.map(member => member.id);
    return orders.filter(order => 
      memberIds.includes(order.userId) && 
      order.status === 'confirmed'
    ).length;
  }, [orders, brokerMembers]);

  // Calculate active members count
  const activeMembersCount = brokerMembers.filter(
    member => member.status === 'active'
  ).length;

  const stats = [
    {
      title: 'Aktive Mitglieder',
      value: activeMembersCount,
      change: { value: '+3% seit letztem Monat', positive: true },
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Abgeschlossene Verträge',
      value: completedOrders,
      change: { value: '+1 diese Woche', positive: true },
      icon: ShoppingBag,
      color: 'bg-green-500',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}