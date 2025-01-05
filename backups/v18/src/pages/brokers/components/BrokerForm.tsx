import React from 'react';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import type { Broker } from '../../../types/broker';

interface BrokerFormProps {
  broker?: Broker;
  onSubmit: (data: Partial<Broker>) => Promise<void>;
  onCancel: () => void;
}

export function BrokerForm({ broker, onSubmit, onCancel }: BrokerFormProps) {
  const [formData, setFormData] = React.useState({
    name: broker?.name || '',
    email: broker?.email || '',
    phone: broker?.phone || '',
    company: broker?.company || '',
    address: {
      street: broker?.address?.street || '',
      city: broker?.address?.city || '',
      postalCode: broker?.address?.postalCode || '',
      country: broker?.address?.country || 'Deutschland',
    },
    status: broker?.status || 'active',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          label="E-Mail *"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Telefon *"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <Input
          label="Unternehmen *"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Adresse</h3>
        <Input
          label="Straße *"
          value={formData.address.street}
          onChange={(e) => setFormData({
            ...formData,
            address: { ...formData.address, street: e.target.value }
          })}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Stadt *"
            value={formData.address.city}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, city: e.target.value }
            })}
            required
          />
          <Input
            label="PLZ *"
            value={formData.address.postalCode}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, postalCode: e.target.value }
            })}
            required
          />
        </div>
      </div>

      <Select
        label="Status"
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
      >
        <option value="active">Aktiv</option>
        <option value="inactive">Inaktiv</option>
      </Select>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button type="submit">
          {broker ? 'Speichern' : 'Hinzufügen'}
        </Button>
      </div>
    </form>
  );
}