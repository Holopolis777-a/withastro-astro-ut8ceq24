import React from 'react';
import { Input } from '../../../../components/ui/Input';
import { Select } from '../../../../components/ui/Select';
import { Button } from '../../../../components/ui/Button';
import type { FAQ, FAQCategory, FAQVisibility, FAQPriority } from '../../../../types/faq';

interface FAQFormProps {
  faq?: Partial<FAQ>;
  categories: FAQCategory[];
  onSubmit: (data: Partial<FAQ>) => Promise<void>;
  onCancel: () => void;
}

export function FAQForm({ faq, categories, onSubmit, onCancel }: FAQFormProps) {
  const [formData, setFormData] = React.useState({
    question: faq?.question || '',
    answer: faq?.answer || '',
    visibility: faq?.visibility || 'all',
    category: faq?.category || '',
    priority: faq?.priority || 'medium',
    searchTerms: faq?.searchTerms || [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Frage</label>
        <Input
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          required
        />
      </div>

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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Kategorie</label>
          <Select
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
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sichtbarkeit</label>
          <Select
            value={formData.visibility}
            onChange={(e) => setFormData({ ...formData, visibility: e.target.value as FAQVisibility })}
            required
          >
            <option value="all">Alle</option>
            <option value="broker">Nur Makler</option>
            <option value="member">Nur Mitglieder</option>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Priorität</label>
        <Select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as FAQPriority })}
          required
        >
          <option value="high">Hoch</option>
          <option value="medium">Mittel</option>
          <option value="low">Niedrig</option>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Suchbegriffe</label>
        <Input
          value={formData.searchTerms.join(', ')}
          onChange={(e) => setFormData({ ...formData, searchTerms: e.target.value.split(',').map(t => t.trim()) })}
          placeholder="Begriff1, Begriff2, ..."
        />
        <p className="mt-1 text-sm text-gray-500">
          Kommagetrennte Liste von Suchbegriffen
        </p>
      </div>

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