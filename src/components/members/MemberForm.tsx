import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { Member } from '../../types/member';

interface MemberFormProps {
  member?: Partial<Member>;
  onSubmit: (data: Partial<Member>) => Promise<void>;
  onCancel: () => void;
}

export function MemberForm({ member, onSubmit, onCancel }: MemberFormProps) {
  const [formData, setFormData] = React.useState({
    firstName: member?.firstName || '',
    lastName: member?.lastName || '',
    email: member?.email || '',
    phone: member?.phone || '',
    status: member?.status || 'active',
    address: {
      street: member?.address?.street || '',
      city: member?.address?.city || '',
      postalCode: member?.address?.postalCode || '',
      country: member?.address?.country || '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Vorname"
          value={formData.firstName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, firstName: e.target.value }))
          }
          required
        />
        <Input
          label="Nachname"
          value={formData.lastName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, lastName: e.target.value }))
          }
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="E-Mail"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
        <Input
          label="Telefon"
          type="tel"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
      </div>

      <Select
        label="Status"
        value={formData.status}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            status: e.target.value as 'active' | 'inactive',
          }))
        }
      >
        <option value="active">Aktiv</option>
        <option value="inactive">Inaktiv</option>
      </Select>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Adresse</h3>
        <Input
          label="Straße"
          value={formData.address.street}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              address: { ...prev.address, street: e.target.value },
            }))
          }
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Stadt"
            value={formData.address.city}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, city: e.target.value },
              }))
            }
          />
          <Input
            label="PLZ"
            value={formData.address.postalCode}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, postalCode: e.target.value },
              }))
            }
          />
        </div>
        <Input
          label="Land"
          value={formData.address.country}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              address: { ...prev.address, country: e.target.value },
            }))
          }
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button type="submit">Speichern</Button>
      </div>
    </form>
  );
}