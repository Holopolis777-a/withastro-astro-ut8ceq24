import React from 'react';
import { useOrderStore } from '../../../store/orderStore';
import { useMemberStore } from '../../../store/memberStore';
import { useAuthStore } from '../../../store/authStore';
import { OrderCard } from './OrderCard';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { Clock } from 'lucide-react';

export function BrokerOrderList() {
  const { user } = useAuthStore();
  const { orders } = useOrderStore();
  const { getMembersForBroker } = useMemberStore();
  const [loading, setLoading] = React.useState(true);

  // Get members associated with the broker
  const brokerMembers = React.useMemo(() => {
    if (!user?.id) return [];
    return getMembersForBroker(user.id);
  }, [user?.id, getMembersForBroker]);

  // Filter orders for broker's members and sort by date
  const brokerOrders = React.useMemo(() => {
    const memberIds = brokerMembers.map(member => member.id);
    return orders
      .filter(order => memberIds.includes(order.userId))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [orders, brokerMembers]);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (brokerOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Keine Bestellungen</h3>
        <p className="text-gray-500">Ihre Mitglieder haben noch keine Bestellungen aufgegeben.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {brokerOrders.map(order => (
        <OrderCard 
          key={order.id}
          order={order}
          member={brokerMembers.find(m => m.id === order.userId)}
          showActions={false}
        />
      ))}
    </div>
  );
}