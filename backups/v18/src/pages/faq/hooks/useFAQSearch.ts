import { useState, useCallback } from 'react';
import type { FAQ } from '../../../types/faq';

export function useFAQSearch(faqs: FAQ[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFAQs = useCallback(() => {
    if (!searchTerm) return faqs;

    const searchLower = searchTerm.toLowerCase();
    return faqs.filter(faq => {
      const matchesQuestion = faq.question.toLowerCase().includes(searchLower);
      const matchesAnswer = faq.answer.toLowerCase().includes(searchLower);
      const matchesSearchTerms = faq.searchTerms?.some(term => 
        term.toLowerCase().includes(searchLower)
      );

      return matchesQuestion || matchesAnswer || matchesSearchTerms;
    });
  }, [faqs, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredFAQs: filteredFAQs(),
  };
}