import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useOrderStore } from '../../store/orderStore';
import { Shield, XCircle } from 'lucide-react';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Button } from '../../components/ui/Button';
import { formatDate } from '../../utils/dateUtils';
import toast from 'react-hot-toast';

const SERVICE_NAMES = {
  insurance: 'Vollkasko- & Haftpflichtversicherung',
  maintenance: 'Wartung & Verschleiß',
  winterTires: 'Winterreifen',
  gap: 'GAP Deckung Premium',
  roadside: 'KFZ-Schutzbrief & Pannenhilfe',
  damageManagement: 'Schadensmanagement',
  delivery: 'Überführung & Zulassung'
};

export default function MyOrders() {
  const { user } = useAuthStore();
  const { orders, loading, updateOrderStatus } = useOrderStore();

  // Filter orders for current user and sort by date
  const userOrders = React.useMemo(() => {
    if (!user) return [];
    return orders
      .filter(order => order.userId === user.id)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [orders, user]);

  const handleCancel = async (orderId: string) => {
    if (window.confirm('Möchten Sie diese Anfrage wirklich stornieren?')) {
      try {
        await updateOrderStatus(orderId, 'cancelled');
        toast.success('Ihre Anfrage wurde erfolgreich storniert');
      } catch (error) {
        toast.error('Fehler beim Stornieren der Anfrage');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (userOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Sie haben noch keine Bestellungen.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Meine Bestellungen</h1>

      <div className="grid gap-6">
        {userOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden">
                    <img
                      src={order.vehicle.image}
                      alt={`${order.vehicle.make} ${order.vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">
                      {order.vehicle.make} {order.vehicle.model}
                    </h3>
                    <div className="mt-1 space-y-1 text-sm text-gray-600">
                      <p>Bestellnummer: {order.orderNumber}</p>
                      <p>Bestellt am: {formatDate(order.createdAt)}</p>
                      <p>Farbe: {order.configuration.color}</p>
                      <p>Laufzeit: {order.configuration.duration} Monate</p>
                      <p>Kilometer/Jahr: {order.configuration.kilometers.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-semibold">
                    {order.totalMonthlyRate.toFixed(2)}€ <span className="text-sm text-gray-500">/Monat</span>
                  </div>
                  <div className="mt-2 space-y-2">
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                      order.status === 'cancelled' 
                        ? 'bg-red-100 text-red-800'
                        : order.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status === 'cancelled' 
                        ? 'Storniert'
                        : order.status === 'confirmed'
                        ? 'Bestätigt'
                        : 'Ausstehend'}
                    </span>
                    {order.status === 'pending' && (
                      <Button
                        onClick={() => handleCancel(order.id)}
                        variant="outline"
                        className="ml-2 text-red-600 hover:text-red-700"
                        size="sm"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Stornieren
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {order.configuration.services.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center mb-3">
                    <Shield className="w-5 h-5 text-gray-600 mr-2" />
                    <h4 className="font-medium text-lg">Optionale Leistungen:</h4>
                  </div>
                  <div className="grid gap-3">
                    {order.configuration.services.map((service) => (
                      <div 
                        key={service} 
                        className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100 w-full"
                      >
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                          <span className="text-gray-700 font-medium">
                            {SERVICE_NAMES[service as keyof typeof SERVICE_NAMES] || service}
                          </span>
                        </div>
                        {service === 'insurance' && (
                          <span className="text-sm font-semibold text-blue-600">
                            +89,00€/Monat
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}