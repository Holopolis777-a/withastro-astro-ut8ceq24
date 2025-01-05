import React from 'react';
import { Input } from '../../../components/ui/Input';
import { Search } from 'lucide-react';

interface MemberFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function MemberFilters({ searchTerm, onSearchChange }: MemberFiltersProps) {
  return (
    <div className="flex justify-between items-center space-x-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Suche nach Name, E-Mail oder Mitgliedsnummer..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
}