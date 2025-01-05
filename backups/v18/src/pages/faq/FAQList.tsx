import React from 'react';
import { Search } from 'lucide-react';
import type { FAQ, FAQCategory } from '../../types/faq';

interface FAQListProps {
  faqs: FAQ[];
  categories: FAQCategory[];
  loading: boolean;
}

export function FAQList({ faqs, categories, loading }: FAQListProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Häufig gestellte Fragen</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Suchen Sie nach Fragen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="all">Alle Kategorien</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map(category => {
          const categoryFAQs = filteredFAQs.filter(faq => faq.category === category.id);
          if (categoryFAQs.length === 0) return null;
          
          return (
            <div key={category.id} className="space-y-4">
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <div className="space-y-4">
                {categoryFAQs.map(faq => (
                  <details
                    key={faq.id}
                    className="group bg-white rounded-lg border border-gray-200 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                      <span className="font-medium pr-6">{faq.question}</span>
                      <span className="transform transition-transform group-open:rotate-180">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}