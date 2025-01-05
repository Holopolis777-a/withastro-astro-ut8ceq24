export interface Recommendation {
  id: string;
  referrerId: string;
  companyName: string;
  recipientName: string; // Added field
  recipientEmail: string;
  status: 'pending' | 'accepted' | 'declined';
  sentAt: Date;
  acceptedAt?: Date;
}

export interface RecommendationStats {
  totalSent: number;
  accepted: number;
  pending: number;
  acceptanceRate: number;
}