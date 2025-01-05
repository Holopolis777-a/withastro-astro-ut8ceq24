import React from 'react';
import { CompanyList } from './components/CompanyList';
import { CompanyFilters } from './components/CompanyFilters';
import { useCompanyStore } from '../../store/companyStore';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import { CompanyInviteDialog } from './components/CompanyInviteDialog';

export default function CompaniesPage() {
  const { companies, loading } = useCompanyStore();
  const [isInviteModalOpen, setInviteModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [industryFilter, setIndustryFilter] = React.useState('all');

  const filteredCompanies = React.useMemo(() => {
    return companies.filter(company => {
      const matchesSearch = 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
      return matchesSearch && matchesIndustry;
    });
  }, [companies, searchTerm, industryFilter]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Unternehmen</h1>
          <p className="text-gray-500 mt-1">
            Verwalten Sie Ihre Unternehmenskunden und Einladungen
          </p>
        </div>
        <Button onClick={() => setInviteModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Unternehmen einladen
        </Button>
      </div>

      <CompanyFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        industryFilter={industryFilter}
        onIndustryFilterChange={setIndustryFilter}
      />

      <CompanyList companies={filteredCompanies} loading={loading} />

      <CompanyInviteDialog
        isOpen={isInviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
    </div>
  );
}