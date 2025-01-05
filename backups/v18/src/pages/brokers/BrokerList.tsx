import React from 'react';
import { useBrokerStore } from '../../store/brokerStore';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { BrokerForm } from './components/BrokerForm';
import { toast } from 'react-hot-toast';
import type { Broker } from '../../types/broker';

export default function BrokerList() {
  const { brokers, loading, addBroker, updateBroker, deleteBroker } = useBrokerStore();
  const [isFormOpen, setFormOpen] = React.useState(false);
  const [editingBroker, setEditingBroker] = React.useState<Broker | null>(null);

  React.useEffect(() => {
    // Fetch brokers when component mounts
    const fetchData = async () => {
      try {
        await useBrokerStore.getState().fetchBrokers();
      } catch (error) {
        toast.error('Fehler beim Laden der Makler');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (data: Partial<Broker>) => {
    try {
      if (editingBroker) {
        await updateBroker(editingBroker.id, data);
        toast.success('Makler erfolgreich aktualisiert');
      } else {
        await addBroker(data);
        toast.success('Makler erfolgreich hinzugefügt');
      }
      setFormOpen(false);
      setEditingBroker(null);
    } catch (error) {
      toast.error('Fehler beim Speichern des Maklers');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diesen Makler löschen möchten?')) {
      return;
    }

    try {
      await deleteBroker(id);
      toast.success('Makler erfolgreich gelöscht');
    } catch (error) {
      toast.error('Fehler beim Löschen des Maklers');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Makler</h1>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Makler hinzufügen
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unternehmen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kontakt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mitglieder
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktive Bestellungen
              </th>
              <th className="px-6 py-3 relative">
                <span className="sr-only">Aktionen</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {brokers.map((broker) => (
              <tr key={broker.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{broker.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{broker.company}</div>
                  <div className="text-sm text-gray-500">
                    {broker.address.city}, {broker.address.country}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{broker.email}</div>
                  <div className="text-sm text-gray-500">{broker.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    broker.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {broker.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {broker.membersCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {broker.activeOrders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingBroker(broker);
                      setFormOpen(true);
                    }}
                  >
                    Bearbeiten
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(broker.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Löschen
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingBroker(null);
        }}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />

          <div className="relative bg-white rounded-xl max-w-2xl w-full p-6">
            <Dialog.Title className="text-xl font-semibold mb-6">
              {editingBroker ? 'Makler bearbeiten' : 'Neuen Makler hinzufügen'}
            </Dialog.Title>

            <BrokerForm
              broker={editingBroker || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setFormOpen(false);
                setEditingBroker(null);
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}