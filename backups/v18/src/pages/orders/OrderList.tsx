import React from 'react';
import { useOrderStore } from '../../store/orderStore';
import { useVehicleStore } from '../../store/vehicleStore';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Button } from '../../components/ui/Button';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import toast from 'react-hot-toast';

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  processing: Clock,
  ready: CheckCircle,
  delivered: CheckCircle,
  cancelled: AlertCircle,
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  processing: 'bg-blue-100 text-blue-800',
  ready: 'bg-purple-100 text-purple-800',
  delivered: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function OrderList() {
  const { orders, loading, updateOrderStatus } = useOrderStore();
  const { vehicles } = useVehicleStore();

  const handleStatusUpdate = async (orderId: string, status: 'confirmed' | 'cancelled') => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success(`Bestellung wurde ${status === 'confirmed' ? 'bestätigt' : 'abgelehnt'}`);
    } catch (error) {
      toast.error('Fehler beim Aktualisieren des Status');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Bestellungen</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bestelldetails
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fahrzeug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leasing Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => {
              const StatusIcon = statusIcons[order.status];

              return (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Bestellung #{order.orderNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.vehicle.make} {order.vehicle.model}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.vehicle.year}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.configuration.duration} Monate
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.configuration.kilometers.toLocaleString()} km/Jahr
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      €{order.totalMonthlyRate}/Monat
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${
                        statusColors[order.status]
                      }`}
                    >
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {order.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Bestätigen
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                          className="text-red-600 hover:text-red-700"
                        >
                          Ablehnen
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}