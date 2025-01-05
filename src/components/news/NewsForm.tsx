import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { News, NewsTargetAudience, NewsStatus } from '../../types/news';

interface NewsFormProps {
  initialData?: Partial<News>;
  onSubmit: (data: Partial<News>) => Promise<void>;
  onCancel: () => void;
}

export function NewsForm({ initialData, onSubmit, onCancel }: NewsFormProps) {
  const [formData, setFormData] = React.useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    targetAudience: initialData?.targetAudience || 'all',
    publishDate: initialData?.publishDate ? new Date(initialData.publishDate).toISOString().slice(0, 16) : '',
    status: initialData?.status || 'draft',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      publishDate: new Date(formData.publishDate),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Titel"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Inhalt
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={6}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Zielgruppe"
          value={formData.targetAudience}
          onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as NewsTargetAudience })}
          required
        >
          <option value="all">Alle</option>
          <option value="broker">Nur Makler</option>
          <option value="member">Nur Mitglieder</option>
        </Select>

        <Input
          type="datetime-local"
          label="Veröffentlichungsdatum"
          value={formData.publishDate}
          onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
          required
        />
      </div>

      <Select
        label="Status"
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value as NewsStatus })}
        required
      >
        <option value="draft">Entwurf</option>
        <option value="published">Veröffentlicht</option>
      </Select>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button type="submit">
          {initialData ? 'Aktualisieren' : 'Erstellen'}
        </Button>
      </div>
    </form>
  );
}