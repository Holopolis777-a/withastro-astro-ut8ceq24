import React from 'react';
import { useTicketStore } from '../../store/ticketStore';
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../utils/dateUtils';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { MessageCircle, Send } from 'lucide-react';
import type { Ticket, TicketMessage } from '../../types/ticket';

interface TicketDetailsProps {
  ticket: Ticket;
  onClose: () => void;
}

export function TicketDetails({ ticket, onClose }: TicketDetailsProps) {
  const { user } = useAuthStore();
  const { updateTicketStatus, updateTicketPriority, addMessage, getMessages } = useTicketStore();
  const [messages, setMessages] = React.useState<TicketMessage[]>([]);
  const [newMessage, setNewMessage] = React.useState('');
  const [isInternal, setIsInternal] = React.useState(false);
  const isAdmin = user?.role === 'admin';

  React.useEffect(() => {
    const loadMessages = async () => {
      const ticketMessages = await getMessages(ticket.id);
      setMessages(ticketMessages);
    };
    loadMessages();
  }, [ticket.id, getMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await addMessage(ticket.id, newMessage, isInternal);
    const updatedMessages = await getMessages(ticket.id);
    setMessages(updatedMessages);
    setNewMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{ticket.title}</h2>
          <div className="flex items-center space-x-2 mt-2">
            <Badge>{ticket.status}</Badge>
            <Badge>{ticket.priority}</Badge>
          </div>
        </div>
        {isAdmin && (
          <div className="space-x-2">
            <Select
              value={ticket.status}
              onChange={(e) => updateTicketStatus(ticket.id, e.target.value as any)}
              className="text-sm"
            >
              <option value="open">Offen</option>
              <option value="in_progress">In Bearbeitung</option>
              <option value="waiting_for_response">Warte auf Antwort</option>
              <option value="resolved">Gelöst</option>
              <option value="closed">Geschlossen</option>
            </Select>
            <Select
              value={ticket.priority}
              onChange={(e) => updateTicketPriority(ticket.id, e.target.value as any)}
              className="text-sm"
            >
              <option value="low">Niedrig</option>
              <option value="medium">Mittel</option>
              <option value="high">Hoch</option>
              <option value="urgent">Dringend</option>
            </Select>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="whitespace-pre-wrap">{ticket.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Erstellt am {formatDate(ticket.created_at)}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Kommunikationsverlauf
        </h3>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-lg ${
                message.is_internal
                  ? 'bg-yellow-50 border border-yellow-100'
                  : 'bg-gray-50'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                {formatDate(message.created_at)}
                {message.is_internal && ' (Intern)'}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="space-y-4">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ihre Nachricht..."
          />
          {isAdmin && (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
                className="rounded border-gray-300 text-primary-400 focus:ring-primary-400"
              />
              <span className="text-sm text-gray-700">Interne Notiz</span>
            </label>
          )}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Schließen
            </Button>
            <Button type="submit">
              <Send className="w-4 h-4 mr-2" />
              Senden
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}