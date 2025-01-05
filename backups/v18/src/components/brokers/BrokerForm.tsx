import React from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Select } from '../common/Select';
import type { Broker } from '../../types/broker';

interface BrokerFormProps {
  broker?: Partial<Broker>;
  onSubmit: (data: Omit<Broker, 'id' | 'createdAt'>) => Promise<void>;
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
      country: broker?.address?.country || '',
    },
    status: broker?.status || 'active',
    membersCount: broker?.membersCount || 0,
    activeOrders: broker?.activeOrders || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Input
          label="Phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
          required
        />
        <Input
          label="Company"
          value={formData.company}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, company: e.target.value }))
          }
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Address</h3>
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Street"
            value={formData.address.street}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, street: e.target.value },
              }))
            }
            required
          />
          <Input
            label="City"
            value={formData.address.city}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, city: e.target.value },
              }))
            }
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Postal Code"
            value={formData.address.postalCode}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, postalCode: e.target.value },
              }))
            }
            required
          />
          <Input
            label="Country"
            value={formData.address.country}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, country: e.target.value },
              }))
            }
            required
          />
        </div>
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
        options={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
      />

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Broker</Button>
      </div>
    </form>
  );
}