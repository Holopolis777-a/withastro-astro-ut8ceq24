export type FAQVisibility = 
  | 'broker' 
  | 'member' 
  | 'employer' 
  | 'employee' 
  | 'salary-employee';

export type FAQPriority = 'high' | 'medium' | 'low';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  visibilities: FAQVisibility[];
  category: string;
  priority: FAQPriority;
  views: number;
  helpfulVotes: number;
  createdAt: Date;
  updatedAt: Date;
  order: number;
  searchTerms?: string[];
}

export interface FAQCategory {
  id: string;
  name: string;
  description: string;
  order: number;
  visibility: FAQVisibility;
}

export interface FAQStatistics {
  totalViews: number;
  helpfulVotes: number;
  searchQueries: {
    term: string;
    count: number;
  }[];
  categoryViews: {
    categoryId: string;
    views: number;
  }[];
}