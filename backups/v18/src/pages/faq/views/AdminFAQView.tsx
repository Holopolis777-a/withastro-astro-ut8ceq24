import React from 'react';
import { FAQStatisticsPanel } from '../components/admin/FAQStatisticsPanel';
import { FAQManagementPanel } from '../components/admin/FAQManagementPanel';
import { useFAQStore } from '../../../store/faqStore';
import { useFAQStatistics } from '../hooks/useFAQStatistics';

export function AdminFAQView() {
  const { faqs } = useFAQStore();
  const statistics = useFAQStatistics(faqs);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-semibold">FAQ Verwaltung</h1>
      
      <FAQStatisticsPanel statistics={statistics} />
      <FAQManagementPanel />
    </div>
  );
}