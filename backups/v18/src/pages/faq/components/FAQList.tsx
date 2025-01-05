import React from 'react';
import { FAQItem } from './FAQItem';
import type { FAQ } from '../../../types/faq';

interface FAQListProps {
  faqs: FAQ[];
  onVoteHelpful: (faqId: string) => void;
}

export function FAQList({ faqs, onVoteHelpful }: FAQListProps) {
  // Sort FAQs by priority and then by helpful votes
  const sortedFAQs = [...faqs].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return b.helpfulVotes - a.helpfulVotes;
  });

  return (
    <div className="space-y-4">
      {sortedFAQs.map(faq => (
        <FAQItem
          key={faq.id}
          faq={faq}
          onVoteHelpful={onVoteHelpful}
        />
      ))}
    </div>
  );
}