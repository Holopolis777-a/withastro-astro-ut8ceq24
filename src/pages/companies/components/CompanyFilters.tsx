import React from 'react';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Search } from 'lucide-react';

interface CompanyFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  industryFilter: string;
  onIndustryFilterChange: (value: string) => void;
}

const INDUSTRIES = [
  { value: 'all', label: 'Alle Branchen' },
  { value: 'technology', label: 'Technologie' },
  { value: 'manufacturing', label: 'Produktion' },
  { value: 'services', label: 'Dienstleistungen' },
  { value: 'retail', label: 'Einzelhandel' },
  { value: 'healthcare', label: 'Gesundheitswesen' },
  { value: 'finance', label: 'Finanzen' },
  { value: 'other', label: 'Sonstige' },
];

export function CompanyFilters({
  searchTerm,
  onSearchChange,
  industryFilter,
  onIndustryFilterChange,
}: CompanyFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Suche nach Unternehmen oder E-Mail..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={industryFilter}
          onChange={(e) => onIndustryFilterChange(e.target.value)}
        >
          {INDUSTRIES.map(industry => (
            <option key={industry.value} value={industry.value}>
              {industry.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}