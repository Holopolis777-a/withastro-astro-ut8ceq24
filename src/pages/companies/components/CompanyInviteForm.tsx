import React from 'react';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { ImageUpload } from '../../../components/vehicles/ImageUpload';
import { useCompanyStore } from '../../../store/companyStore';
import { toast } from 'react-hot-toast';

interface CompanyInviteFormProps {
  onClose: () => void;
}

// Split legal forms into two categories
const LEGAL_FORM_CATEGORIES = {
  company: {
    label: 'Gesellschaft',
    options: [
      { value: 'ag', label: 'Aktiengesellschaft (AG)' },
      { value: 'gmbh', label: 'Gesellschaft mit beschränkter Haftung (GmbH)' },
      { value: 'gmbh_co_kg', label: 'GmbH & Co. KG' },
      { value: 'gbr', label: 'Gesellschaft bürgerlichen Rechts (GbR)' },
    ]
  },
  individual: {
    label: 'Einzelunternehmen / Gewerbe / Freiberufler',
    options: [
      { value: 'einzelunternehmen', label: 'Einzelunternehmen' },
      { value: 'gewerbe', label: 'Gewerbe' },
      { value: 'freiberufler', label: 'Freiberufler' },
    ]
  }
};

export function CompanyInviteForm({ onClose }: CompanyInviteFormProps) {
  const { inviteCompany } = useCompanyStore();
  const [formData, setFormData] = React.useState({
    name: '',
    legalFormCategory: '',
    legalForm: '',
    email: '',
    phone: '',
    industry: '',
    employeeCount: '',
    logo: '',
    recipientName: '', // Added recipient name field
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'Deutschland',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inviteCompany({
        ...formData,
        employeeCount: parseInt(formData.employeeCount),
      });
      toast.success('Einladung erfolgreich versendet');
      onClose();
    } catch (error) {
      toast.error('Fehler beim Versenden der Einladung');
    }
  };

  const handleLogoUpload = (images: string[]) => {
    if (images.length > 0) {
      setFormData(prev => ({ ...prev, logo: images[0] }));
    }
  };

  // Reset legal form when category changes
  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      legalFormCategory: category,
      legalForm: ''
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Unternehmensname *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        
        {/* Added recipient name field */}
        <Input
          label="Name des Ansprechpartners *"
          value={formData.recipientName}
          onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
          placeholder="z.B. Max Mustermann"
          required
        />
      </div>

      {/* Legal Form Category Selection */}
      <Select
        label="Unternehmensform *"
        value={formData.legalFormCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        required
      >
        <option value="">Unternehmensform auswählen</option>
        {Object.entries(LEGAL_FORM_CATEGORIES).map(([key, category]) => (
          <option key={key} value={key}>{category.label}</option>
        ))}
      </Select>

      {/* Show specific legal forms based on selected category */}
      {formData.legalFormCategory && (
        <div className="mt-4">
          <Select
            label="Rechtsform *"
            value={formData.legalForm}
            onChange={(e) => setFormData({ ...formData, legalForm: e.target.value })}
            required
          >
            <option value="">Rechtsform auswählen</option>
            {LEGAL_FORM_CATEGORIES[formData.legalFormCategory as keyof typeof LEGAL_FORM_CATEGORIES]
              .options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </Select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="E-Mail *"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          label="Telefon *"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Branche *"
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          required
        >
          <option value="">Branche auswählen</option>
          <option value="technology">Technologie</option>
          <option value="manufacturing">Produktion</option>
          <option value="services">Dienstleistungen</option>
          <option value="retail">Einzelhandel</option>
          <option value="healthcare">Gesundheitswesen</option>
          <option value="finance">Finanzen</option>
          <option value="other">Sonstige</option>
        </Select>
        <Input
          label="Anzahl Mitarbeiter *"
          type="number"
          min="1"
          value={formData.employeeCount}
          onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Unternehmenslogo
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Adresse</h3>
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

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Abbrechen
        </Button>
        <Button type="submit">
          Einladung senden
        </Button>
      </div>
    </form>
  );
}