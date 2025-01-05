import React from 'react';
import { ChevronDown, ThumbsUp } from 'lucide-react';
import type { FAQ } from '../../../types/faq';

interface FAQItemProps {
  faq: FAQ;
  onVoteHelpful: (faqId: string) => void;
}

export function FAQItem({ faq, onVoteHelpful }: FAQItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-3 flex items-center justify-between bg-white hover:bg-gray-50"
      >
        <span className="font-medium">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {isOpen && (
        <div className="px-4 py-3 bg-gray-50">
          <p className="text-gray-600 mb-4">{faq.answer}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <button
              onClick={() => onVoteHelpful(faq.id)}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              War das hilfreich? ({faq.helpfulVotes})
            </button>
            <span>{faq.views} Aufrufe</span>
          </div>
        </div>
      )}
    </div>
  );
}