import React from 'react';
import { useVehicleRequestStore } from '../../store/vehicleRequestStore';
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../utils/dateUtils';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Button } from '../../components/ui/Button';
import { XCircle, Clock, Car, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function MyRequests() {
  const { user } = useAuthStore();
  const { requests, loading, fetchRequests, cancelRequest } = useVehicleRequestStore();

  React.useEffect(() => {
    if (user?.id) {
      fetchRequests(user.id);
    }
  }, [user?.id, fetchRequests]);

  const handleCancel = async (requestId: string) => {
    if (!confirm('Möchten Sie diese Anfrage wirklich stornieren?')) {
      return;
    }

    try {
      await cancelRequest(requestId);
      toast.success('Anfrage wurde erfolgreich storniert');
    } catch (error) {
      toast.error('Fehler beim Stornieren der Anfrage');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Keine Anfragen</h3>
        <p className="text-gray-500">Sie haben noch keine Fahrzeuganfragen gestellt.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Meine Anfragen</h1>

      <div className="grid gap-6">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <div className="w-32 h-24 rounded-lg overflow-hidden">
                  <img
                    src={request.vehicle.image}
                    alt={`${request.vehicle.make} ${request.vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold">
                    {request.vehicle.make} {request.vehicle.model}
                  </h3>
                  <div className="mt-2 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-2" />
                      <span>{request.vehicle.type}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        Gewünschter Zeitraum: {formatDate(request.startDate)} - {formatDate(request.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right space-y-3">
                <Badge
                  variant={
                    request.status === 'approved'
                      ? 'success'
                      : request.status === 'rejected'
                      ? 'error'
                      : 'warning'
                  }
                >
                  {request.status === 'approved'
                    ? 'Genehmigt'
                    : request.status === 'rejected'
                    ? 'Abgelehnt'
                    : 'Ausstehend'}
                </Badge>

                {request.status === 'pending' && (
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancel(request.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Stornieren
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {request.bookingReference && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Buchungsreferenz: <span className="font-medium">{request.bookingReference}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}