import { create } from 'zustand';
import type { Message } from '../types/message';

interface MessageState {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  fetchMessages: () => Promise<void>;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  loading: false,
  error: null,

  sendMessage: async (content: string) => {
    set({ loading: true });
    try {
      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        fromUser: true,
        timestamp: new Date(),
      };
      set((state) => ({
        messages: [...state.messages, newMessage],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to send message', loading: false });
    }
  },

  fetchMessages: async () => {
    set({ loading: true });
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ messages: [], loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch messages', loading: false });
    }
  },
}));