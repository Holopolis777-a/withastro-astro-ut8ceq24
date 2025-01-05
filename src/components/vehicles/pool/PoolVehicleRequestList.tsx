import React from 'react';
import { usePoolVehicleRequestStore } from '../../../store/poolVehicleRequestStore';
import { useAuthStore } from '../../../store/authStore';
import { formatDate } from '../../../utils/dateUtils';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { XCircle, Calendar, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { PoolVehicleRequestStatus } from '../../../types/poolVehicleRequest';

export function PoolVehicleRequestList() {
  const { user } = useAuthStore();
  const { requests, loading, fetchRequests, cancelRequest } = usePoolVehicleRequestStore();
  const [statusFilter, setStatusFilter] = React.useState<PoolVehicleRequestStatus | 'all'>('all');
  const [dateFilter, setDateFilter] = React.useState({
    from: '',
    to: '',
  });

  React.useEffect(() => {
    if (user?.id) {
      fetchRequests(user.id);
    }
  }, [user?.id, fetchRequests]);

  const filteredRequests = React.useMemo(() => {
    return requests.filter(request => {
      // Status filter
      if (statusFilter !== 'all' && request.status !== statusFilter) {
        return false;
      }

      // Date filter
      if (dateFilter.from && new Date(dateFilter.from) > request.startDate) {
        return false;
      }
      if (dateFilter.to && new Date(dateFilter.to) < request.endDate) {
        return false;
      }

      return true;
    }).sort((a, b) => b.requestDate.getTime() - a.requestDate.getTime());
  }, [requests, statusFilter, dateFilter]);

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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Meine Fahrzeuganfragen</h2>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PoolVehicleRequestStatus | 'all')}
          >
            <option value="all">Alle Status</option>
            <option value="pending">Ausstehend</option>
            <option value="approved">Genehmigt</option>
            <option value="rejected">Abgelehnt</option>
          </Select>

          <Input
            type="date"
            value={dateFilter.from}
            onChange={(e) => setDateFilter(prev => ({ ...prev, from: e.target.value }))}
            placeholder="Von"
          />

          <Input
            type="date"
            value={dateFilter.to}
            onChange={(e) => setDateFilter(prev => ({ ...prev, to: e.target.value }))}
            placeholder="Bis"
          />
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fahrzeug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Zeitraum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Anfragedatum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Buchungsnummer
              </th>
              <th className="px-6 py-3 relative">
                <span className="sr-only">Aktionen</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={request.vehicle.image}
                        alt={`${request.vehicle.make} ${request.vehicle.model}`}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {request.vehicle.make} {request.vehicle.model}
                      </div>
                      <div className="text-sm text-gray-500">
                        {request.vehicle.type}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    {formatDate(request.startDate)} - {formatDate(request.endDate)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : request.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status === 'approved'
                      ? 'Genehmigt'
                      : request.status === 'rejected'
                      ? 'Abgelehnt'
                      : 'Ausstehend'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(request.requestDate)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.bookingReference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {request.status === 'pending' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancel(request.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Stornieren
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Keine Anfragen gefunden</p>
          </div>
        )}
      </div>
    </div>
  );
}