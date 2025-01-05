import React from 'react';
import { FAQSearch } from '../components/FAQSearch';
import { FAQCategoryFilter } from '../components/FAQCategoryFilter';
import { FAQList } from '../components/FAQList';
import { useFAQSearch } from '../hooks/useFAQSearch';
import { useAuthStore } from '../../../store/authStore';
import { useFAQStore } from '../../../store/faqStore';

export function UserFAQView() {
  const { user } = useAuthStore();
  const { faqs, categories, updateFAQ } = useFAQStore();
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  // Filter FAQs based on user role
  const visibleFAQs = faqs.filter(faq => {
    const roleMatches = 
      faq.visibility === 'all' || 
      (user?.role === 'broker' && faq.visibility === 'broker') ||
      (user?.role === 'user' && faq.visibility === 'member');
    const categoryMatches = selectedCategory === 'all' || faq.category === selectedCategory;
    return roleMatches && categoryMatches;
  });

  const { searchTerm, setSearchTerm, filteredFAQs } = useFAQSearch(visibleFAQs);

  const handleVoteHelpful = async (faqId: string) => {
    const faq = faqs.find(f => f.id === faqId);
    if (faq) {
      await updateFAQ(faqId, {
        helpfulVotes: faq.helpfulVotes + 1,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Häufig gestellte Fragen</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <FAQSearch
            onSearch={setSearchTerm}
            placeholder="Wonach suchen Sie?"
          />
        </div>
        <div>
          <FAQCategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      <FAQList
        faqs={filteredFAQs}
        onVoteHelpful={handleVoteHelpful}
      />
    </div>
  );
}