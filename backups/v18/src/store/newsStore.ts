import { create } from 'zustand';
import type { News, NewsTargetAudience, NewsStatus } from '../types/news';

interface NewsState {
  news: News[];
  loading: boolean;
  error: string | null;
  addNews: (news: Omit<News, 'id' | 'createdAt' | 'updatedAt' | 'readCount'>) => Promise<void>;
  updateNews: (id: string, updates: Partial<News>) => Promise<void>;
  archiveNews: (id: string) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  getNewsByAudience: (audience: NewsTargetAudience) => News[];
}

export const useNewsStore = create<NewsState>((set, get) => ({
  news: [],
  loading: false,
  error: null,

  addNews: async (newsData) => {
    set({ loading: true });
    try {
      const newNews: News = {
        ...newsData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        readCount: 0,
        archived: false,
      };
      set(state => ({ news: [...state.news, newNews], loading: false }));
    } catch (error) {
      set({ error: 'Failed to add news', loading: false });
    }
  },

  updateNews: async (id, updates) => {
    set({ loading: true });
    try {
      set(state => ({
        news: state.news.map(item =>
          item.id === id
            ? { ...item, ...updates, updatedAt: new Date() }
            : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update news', loading: false });
    }
  },

  archiveNews: async (id) => {
    set({ loading: true });
    try {
      set(state => ({
        news: state.news.map(item =>
          item.id === id
            ? { ...item, archived: true, archivedAt: new Date(), status: 'archived' as NewsStatus }
            : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to archive news', loading: false });
    }
  },

  deleteNews: async (id) => {
    set({ loading: true });
    try {
      set(state => ({
        news: state.news.filter(item => item.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete news', loading: false });
    }
  },

  getNewsByAudience: (audience) => {
    const { news } = get();
    return news
      .filter(item => 
        !item.archived && 
        (item.targetAudience === audience || item.targetAudience === 'all') &&
        item.status === 'published' &&
        new Date(item.publishDate) <= new Date()
      )
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
  },
}));