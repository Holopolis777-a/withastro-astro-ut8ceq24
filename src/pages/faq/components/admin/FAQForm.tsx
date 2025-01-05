import React from 'react';
import { Input } from '../../../../components/ui/Input';
import { Select } from '../../../../components/ui/Select';
import { Button } from '../../../../components/ui/Button';
import { Checkbox } from '../../../../components/ui/Checkbox';
import type { FAQ, FAQCategory, FAQVisibility } from '../../../../types/faq';

interface FAQFormProps {
  faq?: Partial<FAQ>;
  categories: FAQCategory[];
  onSubmit: (data: Partial<FAQ>) => Promise<void>;
  onCancel: () => void;
}

const VISIBILITY_OPTIONS = [
  { value: 'broker', label: 'Makler' },
  { value: 'member', label: 'Mitglieder' },
  { value: 'employer', label: 'Arbeitgeber' },
  { value: 'employee', label: 'Arbeitnehmer' },
  { value: 'salary-employee', label: 'Arbeitnehmer Gehaltsumwandlung' },
] as const;

export function FAQForm({ faq, categories, onSubmit, onCancel }: FAQFormProps) {
  const [formData, setFormData] = React.useState({
    question: faq?.question || '',
    answer: faq?.answer || '',
    visibilities: faq?.visibilities || [],
    category: faq?.category || '',
    priority: faq?.priority || 'medium',
    searchTerms: faq?.searchTerms || [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleVisibilityChange = (value: FAQVisibility, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      visibilities: checked
        ? [...prev.visibilities, value]
        : prev.visibilities.filter(v => v !== value)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Frage"
        value={formData.question}
        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Antwort</label>
        <textarea
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          required
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Sichtbarkeit
        </label>
        <div className="grid grid-cols-2 gap-4">
          {VISIBILITY_OPTIONS.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`visibility-${option.value}`}
                checked={formData.visibilities.includes(option.value)}
                onChange={(checked) => handleVisibilityChange(option.value, checked)}
              />
              <label 
                htmlFor={`visibility-${option.value}`}
                className="text-sm text-gray-700"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Select
        label="Kategorie"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        required
      >
        <option value="">Kategorie wählen</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button type="submit">
          {faq ? 'Speichern' : 'Erstellen'}
        </Button>
      </div>
    </form>
  );
}