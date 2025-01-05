import { create } from 'zustand';
import type { FAQ, FAQCategory, FAQStatistics } from '../types/faq';

interface FAQState {
  faqs: FAQ[];
  categories: FAQCategory[];
  loading: boolean;
  error: string | null;
  statistics: FAQStatistics;
  fetchFAQs: () => Promise<void>;
  addFAQ: (faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'helpfulVotes'>) => Promise<void>;
  updateFAQ: (id: string, updates: Partial<FAQ>) => Promise<void>;
  deleteFAQ: (id: string) => Promise<void>;
  addCategory: (category: Omit<FAQCategory, 'id'>) => Promise<void>;
  updateCategory: (id: string, updates: Partial<FAQCategory>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  incrementViews: (faqId: string) => Promise<void>;
  voteHelpful: (faqId: string) => Promise<void>;
  recordSearchQuery: (query: string) => void;
}

// Mock data
const mockCategories: FAQCategory[] = [
  {
    id: '1',
    name: 'Allgemein',
    description: 'Allgemeine Fragen zur Plattform',
    order: 0,
    visibility: 'all'
  },
  {
    id: '2',
    name: 'Leasing',
    description: 'Fragen zum Leasingprozess',
    order: 1,
    visibility: 'member'
  },
  {
    id: '3',
    name: 'Makler',
    description: 'Informationen für Makler',
    order: 2,
    visibility: 'broker'
  }
];

const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'Wie funktioniert der Leasingprozess?',
    answer: 'Der Leasingprozess beginnt mit der Auswahl eines Fahrzeugs. Nach der Konfiguration können Sie eine unverbindliche Anfrage stellen. Ein Makler wird sich dann mit Ihnen in Verbindung setzen.',
    visibility: 'member',
    category: '2',
    priority: 'high',
    views: 150,
    helpfulVotes: 45,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    order: 0,
    searchTerms: ['leasing', 'prozess', 'anfrage', 'ablauf']
  },
  {
    id: '2',
    question: 'Wie kann ich neue Mitglieder einladen?',
    answer: 'Als Makler können Sie neue Mitglieder über die Mitgliederverwaltung einladen. Dort haben Sie die Möglichkeit, entweder eine direkte E-Mail-Einladung zu versenden oder einen Einladungslink zu generieren.',
    visibility: 'broker',
    category: '3',
    priority: 'high',
    views: 89,
    helpfulVotes: 32,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    order: 0,
    searchTerms: ['einladung', 'mitglieder', 'registrierung']
  }
];

export const useFAQStore = create<FAQState>((set, get) => ({
  faqs: mockFAQs,
  categories: mockCategories,
  loading: false,
  error: null,
  statistics: {
    totalViews: 0,
    helpfulVotes: 0,
    searchQueries: [],
    categoryViews: []
  },

  fetchFAQs: async () => {
    set({ loading: true });
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ 
        faqs: mockFAQs,
        categories: mockCategories,
        loading: false 
      });
    } catch (error) {
      set({ error: 'Failed to fetch FAQs', loading: false });
    }
  },

  addFAQ: async (faq) => {
    set({ loading: true });
    try {
      const newFAQ: FAQ = {
        ...faq,
        id: Date.now().toString(),
        views: 0,
        helpfulVotes: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      set(state => ({
        faqs: [...state.faqs, newFAQ],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add FAQ', loading: false });
    }
  },

  updateFAQ: async (id, updates) => {
    set({ loading: true });
    try {
      set(state => ({
        faqs: state.faqs.map(faq =>
          faq.id === id
            ? { ...faq, ...updates, updatedAt: new Date() }
            : faq
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update FAQ', loading: false });
    }
  },

  deleteFAQ: async (id) => {
    set({ loading: true });
    try {
      set(state => ({
        faqs: state.faqs.filter(faq => faq.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete FAQ', loading: false });
    }
  },

  addCategory: async (category) => {
    set({ loading: true });
    try {
      const newCategory: FAQCategory = {
        ...category,
        id: Date.now().toString()
      };
      set(state => ({
        categories: [...state.categories, newCategory],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add category', loading: false });
    }
  },

  updateCategory: async (id, updates) => {
    set({ loading: true });
    try {
      set(state => ({
        categories: state.categories.map(cat =>
          cat.id === id ? { ...cat, ...updates } : cat
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update category', loading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ loading: true });
    try {
      set(state => ({
        categories: state.categories.filter(cat => cat.id !== id),
        faqs: state.faqs.filter(faq => faq.category !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete category', loading: false });
    }
  },

  incrementViews: async (faqId) => {
    const faq = get().faqs.find(f => f.id === faqId);
    if (faq) {
      await get().updateFAQ(faqId, { views: faq.views + 1 });
    }
  },

  voteHelpful: async (faqId) => {
    const faq = get().faqs.find(f => f.id === faqId);
    if (faq) {
      await get().updateFAQ(faqId, { helpfulVotes: faq.helpfulVotes + 1 });
    }
  },

  recordSearchQuery: (query) => {
    set(state => {
      const existingQuery = state.statistics.searchQueries.find(q => q.term === query);
      const updatedQueries = existingQuery
        ? state.statistics.searchQueries.map(q =>
            q.term === query ? { ...q, count: q.count + 1 } : q
          )
        : [...state.statistics.searchQueries, { term: query, count: 1 }];

      return {
        statistics: {
          ...state.statistics,
          searchQueries: updatedQueries.sort((a, b) => b.count - a.count)
        }
      };
    });
  }
}));