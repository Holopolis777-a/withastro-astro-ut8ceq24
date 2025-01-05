export type NewsTargetAudience = 
  | 'broker' 
  | 'member' 
  | 'employer' 
  | 'employee' 
  | 'salary-employee';

export type NewsStatus = 'draft' | 'published' | 'archived';

interface NewsLink {
  url: string;
  text: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  htmlContent?: string;
  useHtml?: boolean;
  images: string[];
  links?: NewsLink[];
  targetAudiences: NewsTargetAudience[]; // Changed to array
  publishDate: Date;
  status: NewsStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  readCount: number;
  archived: boolean;
  archivedAt?: Date;
}

export interface NewsFilters {
  search?: string;
  targetAudience?: NewsTargetAudience;
  status?: NewsStatus;
  dateFrom?: Date;
  dateTo?: Date;
}