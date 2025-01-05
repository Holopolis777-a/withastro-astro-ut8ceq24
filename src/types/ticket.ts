export type TicketStatus = 'open' | 'in_progress' | 'waiting_for_response' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  created_by: string;
  assigned_to?: string;
  created_at: Date;
  updated_at: Date;
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  user_id: string;
  message: string;
  created_at: Date;
  is_internal: boolean;
}

export interface TicketFormData {
  title: string;
  description: string;
  priority: TicketPriority;
}