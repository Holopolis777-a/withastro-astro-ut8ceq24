import React from 'react';
import { formatDate } from '../../utils/dateUtils';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MessageCircle, AlertCircle } from 'lucide-react';
import type { Ticket } from '../../types/ticket';

interface TicketListProps {
  tickets: Ticket[];
  onSelect: (ticket: Ticket) => void;
}

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  waiting_for_response: 'bg-purple-100 text-purple-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

export function TicketList({ tickets, onSelect }: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Keine Tickets</h3>
        <p className="text-gray-500">Es wurden noch keine Tickets erstellt.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium">{ticket.title}</h3>
                <Badge className={priorityColors[ticket.priority]}>
                  {ticket.priority}
                </Badge>
                <Badge className={statusColors[ticket.status]}>
                  {ticket.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                Erstellt am {formatDate(ticket.created_at)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSelect(ticket)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}