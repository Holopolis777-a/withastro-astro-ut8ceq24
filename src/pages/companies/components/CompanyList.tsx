import React from 'react';
import { CompanyCard } from './CompanyCard';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import type { Company } from '../../../types/company';

interface CompanyListProps {
  companies: Company[];
  loading: boolean;
}

export function CompanyList({ companies, loading }: CompanyListProps) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Keine Unternehmen gefunden</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map(company => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}