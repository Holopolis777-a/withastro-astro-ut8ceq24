import { useState, useEffect } from 'react';
import type { FAQ, FAQStatistics } from '../../../types/faq';

export function useFAQStatistics(faqs: FAQ[]) {
  const [statistics, setStatistics] = useState<FAQStatistics>({
    totalViews: 0,
    helpfulVotes: 0,
    searchQueries: [],
    categoryViews: [],
  });

  useEffect(() => {
    const totalViews = faqs.reduce((sum, faq) => sum + faq.views, 0);
    const helpfulVotes = faqs.reduce((sum, faq) => sum + faq.helpfulVotes, 0);

    const categoryViews = faqs.reduce((acc, faq) => {
      const existing = acc.find(c => c.categoryId === faq.category);
      if (existing) {
        existing.views += faq.views;
      } else {
        acc.push({ categoryId: faq.category, views: faq.views });
      }
      return acc;
    }, [] as { categoryId: string; views: number }[]);

    setStatistics({
      ...statistics,
      totalViews,
      helpfulVotes,
      categoryViews: categoryViews.sort((a, b) => b.views - a.views),
    });
  }, [faqs]);

  return statistics;
}