import { create } from 'zustand';
import type { Recommendation, RecommendationStats } from '../types/recommendation';

interface RecommendationState {
  recommendations: Recommendation[];
  loading: boolean;
  error: string | null;
  stats: RecommendationStats;
  sendRecommendation: (
    referrerId: string, 
    companyName: string, 
    recipientName: string, // Added parameter
    recipientEmail: string
  ) => Promise<void>;
  getRecommendationStats: (referrerId: string) => RecommendationStats;
}

export const useRecommendationStore = create<RecommendationState>((set, get) => ({
  recommendations: [],
  loading: false,
  error: null,
  stats: {
    totalSent: 0,
    accepted: 0,
    pending: 0,
    acceptanceRate: 0,
  },

  sendRecommendation: async (referrerId, companyName, recipientName, recipientEmail) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRecommendation: Recommendation = {
        id: Date.now().toString(),
        referrerId,
        companyName,
        recipientName,
        recipientEmail,
        status: 'pending',
        sentAt: new Date(),
      };

      set(state => ({
        recommendations: [...state.recommendations, newRecommendation],
        loading: false,
      }));

      // Update stats
      const stats = get().getRecommendationStats(referrerId);
      set({ stats });

      return Promise.resolve();
    } catch (error) {
      set({ error: 'Failed to send recommendation', loading: false });
      return Promise.reject(error);
    }
  },

  getRecommendationStats: (referrerId: string) => {
    const recommendations = get().recommendations.filter(r => r.referrerId === referrerId);
    const totalSent = recommendations.length;
    const accepted = recommendations.filter(r => r.status === 'accepted').length;
    const pending = recommendations.filter(r => r.status === 'pending').length;
    const acceptanceRate = totalSent > 0 ? (accepted / totalSent) * 100 : 0;

    return {
      totalSent,
      accepted,
      pending,
      acceptanceRate,
    };
  },
}));