import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { TicketFormData } from '../../types/ticket';

interface TicketFormProps {
  onSubmit: (data: TicketFormData) => Promise<void>;
  onCancel: () => void;
}

export function TicketForm({ onSubmit, onCancel }: TicketFormProps) {
  const [formData, setFormData] = React.useState<TicketFormData>({
    title: '',
    description: '',
    priority: 'medium',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
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
          Beschreibung
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring-primary-400"
          required
        />
      </div>

      <Select
        label="Priorität"
        value={formData.priority}
        onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
        required
      >
        <option value="low">Niedrig</option>
        <option value="medium">Mittel</option>
        <option value="high">Hoch</option>
        <option value="urgent">Dringend</option>
      </Select>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button type="submit">
          Ticket erstellen
        </Button>
      </div>
    </form>
  );
}