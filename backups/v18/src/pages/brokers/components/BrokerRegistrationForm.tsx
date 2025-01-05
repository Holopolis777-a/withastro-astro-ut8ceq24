import React from 'react';
import { useBrokerStore } from '../../../store/brokerStore';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { ImageUpload } from '../../../components/vehicles/ImageUpload';
import { toast } from 'react-hot-toast';
import type { Broker } from '../../../types/broker';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  logo?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export function BrokerRegistrationForm({ onClose }: { onClose: () => void }) {
  const { addBroker } = useBrokerStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'Deutschland'
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addBroker({
        ...formData,
        status: 'active',
        membersCount: 0,
        activeOrders: 0
      });
      toast.success('Makler erfolgreich hinzugefügt');
      onClose();
    } catch (error) {
      toast.error('Fehler beim Hinzufügen des Maklers');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoUpload = (images: string[]) => {
    if (images.length > 0) {
      setFormData(prev => ({ ...prev, logo: images[0] }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <Input
          label="Name des Maklers *"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
          className="h-14 text-lg px-4"
        />

        <Input
          label="E-Mail-Adresse *"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
          className="h-14 text-lg px-4"
        />

        <Input
          label="Telefonnummer *"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          required
          className="h-14 text-lg px-4"
        />

        <Input
          label="Unternehmen"
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          className="h-14 text-lg px-4"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Firmenlogo
          </label>
          <div className="mt-2">
            <ImageUpload
              images={formData.logo ? [formData.logo] : []}
              onUpload={handleLogoUpload}
              maxFiles={1}
              acceptedFileTypes={['image/jpeg', 'image/png', 'image/svg+xml']}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Akzeptierte Formate: JPG, PNG, SVG. Max. 2MB. Min. 200x200px
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-700">Adresse</h3>
          <Input
            label="Straße"
            value={formData.address.street}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, street: e.target.value }
            }))}
            className="h-14 text-lg px-4"
          />
          <Input
            label="Stadt"
            value={formData.address.city}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, city: e.target.value }
            }))}
            className="h-14 text-lg px-4"
          />
          <Input
            label="PLZ"
            value={formData.address.postalCode}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, postalCode: e.target.value }
            }))}
            className="h-14 text-lg px-4"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6">
        <Button type="button" variant="outline" onClick={onClose}>
          Abbrechen
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Wird hinzugefügt...' : 'Makler hinzufügen'}
        </Button>
      </div>
    </form>
  );
}