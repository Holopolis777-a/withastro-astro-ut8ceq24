import React from 'react';
import { useOrderStore } from '../../store/orderStore';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatDate } from '../../utils/dateUtils';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewOrders() {
  const { orders, updateOrderStatus } = useOrderStore();

  // Filter only pending orders and sort by creation date (newest first)
  const pendingOrders = orders
    .filter(order => order.status === 'pending')
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const handleApprove = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, 'confirmed');
      toast.success('Bestellung wurde bestätigt');
    } catch (error) {
      toast.error('Fehler beim Bestätigen der Bestellung');
    }
  };

  const handleReject = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, 'cancelled');
      toast.success('Bestellung wurde abgelehnt');
    } catch (error) {
      toast.error('Fehler beim Ablehnen der Bestellung');
    }
  };

  if (pendingOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Keine neuen Bestellungen</h3>
        <p className="text-gray-500">Aktuell liegen keine neuen Bestellungen zur Prüfung vor.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Neue Bestellungen</h1>
        <Badge variant="info">{pendingOrders.length} neue Bestellung(en)</Badge>
      </div>

      <div className="grid gap-6">
        {pendingOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                <div className="mt-4 space-x-2">
                  <Button
                    onClick={() => handleApprove(order.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Bestätigen
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleReject(order.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Ablehnen
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium mb-2">Gewählte Services:</h4>
              <div className="grid grid-cols-2 gap-2">
                {order.configuration.services.map((service) => (
                  <div key={service} className="text-sm text-gray-600">
                    • {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}