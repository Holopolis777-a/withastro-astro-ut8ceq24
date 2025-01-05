import React from 'react';
import { useTicketStore } from '../../store/ticketStore';
import { Dialog } from '@headlessui/react';
import { Plus, MessageCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { TicketForm } from '../../components/tickets/TicketForm';
import { TicketList } from '../../components/tickets/TicketList';
import { TicketDetails } from '../../components/tickets/TicketDetails';
import { toast } from 'react-hot-toast';
import type { Ticket } from '../../types/ticket';

export default function TicketsPage() {
  const { tickets, loading, createTicket, fetchTickets } = useTicketStore();
  const [isFormOpen, setFormOpen] = React.useState(false);
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | null>(null);

  React.useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleCreateTicket = async (data: any) => {
    try {
      await createTicket(data);
      setFormOpen(false);
      toast.success('Ticket erfolgreich erstellt');
    } catch (error) {
      toast.error('Fehler beim Erstellen des Tickets');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary-400 rounded-xl">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Support-Tickets</h1>
            <p className="text-gray-500">Hier können Sie Ihre Support-Anfragen verwalten</p>
          </div>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Neues Ticket
        </Button>
      </div>

      <TicketList
        tickets={tickets}
        onSelect={setSelectedTicket}
      />

      <Dialog
        open={isFormOpen}
        onClose={() => setFormOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />

          <div className="relative bg-white rounded-xl max-w-2xl w-full p-6">
            <Dialog.Title className="text-xl font-semibold mb-6">
              Neues Ticket erstellen
            </Dialog.Title>

            <TicketForm
              onSubmit={handleCreateTicket}
              onCancel={() => setFormOpen(false)}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        open={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />

          <div className="relative bg-white rounded-xl max-w-3xl w-full p-6">
            {selectedTicket && (
              <TicketDetails
                ticket={selectedTicket}
                onClose={() => setSelectedTicket(null)}
              />
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}