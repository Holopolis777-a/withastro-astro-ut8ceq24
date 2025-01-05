import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { useDebounce } from '../../../hooks/useDebounce';

interface FAQSearchProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

export function FAQSearch({ onSearch, placeholder = "Suchen Sie nach Fragen..." }: FAQSearchProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  React.useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
}