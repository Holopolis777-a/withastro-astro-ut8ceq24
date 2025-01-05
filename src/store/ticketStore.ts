import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Ticket, TicketMessage, TicketFormData, TicketStatus, TicketPriority } from '../types/ticket';

interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  createTicket: (data: TicketFormData) => Promise<void>;
  updateTicketStatus: (id: string, status: TicketStatus) => Promise<void>;
  updateTicketPriority: (id: string, priority: TicketPriority) => Promise<void>;
  assignTicket: (id: string, userId: string) => Promise<void>;
  addMessage: (ticketId: string, message: string, isInternal?: boolean) => Promise<void>;
  getMessages: (ticketId: string) => Promise<TicketMessage[]>;
  fetchTickets: () => Promise<void>;
}

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: [],
  loading: false,
  error: null,

  createTicket: async (data) => {
    set({ loading: true });
    try {
      const { data: ticket, error } = await supabase
        .from('tickets')
        .insert([data])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        tickets: [...state.tickets, ticket],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to create ticket', loading: false });
    }
  },

  updateTicketStatus: async (id, status) => {
    set({ loading: true });
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        tickets: state.tickets.map(ticket =>
          ticket.id === id ? { ...ticket, status } : ticket
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update ticket status', loading: false });
    }
  },

  updateTicketPriority: async (id, priority) => {
    set({ loading: true });
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ priority })
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        tickets: state.tickets.map(ticket =>
          ticket.id === id ? { ...ticket, priority } : ticket
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update ticket priority', loading: false });
    }
  },

  assignTicket: async (id, userId) => {
    set({ loading: true });
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ assigned_to: userId })
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        tickets: state.tickets.map(ticket =>
          ticket.id === id ? { ...ticket, assigned_to: userId } : ticket
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to assign ticket', loading: false });
    }
  },

  addMessage: async (ticketId, message, isInternal = false) => {
    set({ loading: true });
    try {
      const { error } = await supabase
        .from('ticket_messages')
        .insert([{ ticket_id: ticketId, message, is_internal: isInternal }]);

      if (error) throw error;
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to add message', loading: false });
    }
  },

  getMessages: async (ticketId) => {
    try {
      const { data, error } = await supabase
        .from('ticket_messages')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      return [];
    }
  },

  fetchTickets: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ tickets: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tickets', loading: false });
    }
  },
}));