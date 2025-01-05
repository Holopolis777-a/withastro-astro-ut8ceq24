import React from 'react';
import { Select } from '../../../components/ui/Select';
import type { FAQCategory } from '../../../types/faq';

interface FAQCategoryFilterProps {
  categories: FAQCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function FAQCategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: FAQCategoryFilterProps) {
  return (
    <Select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="w-full"
    >
      <option value="all">Alle Kategorien</option>
      {categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </Select>
  );
}