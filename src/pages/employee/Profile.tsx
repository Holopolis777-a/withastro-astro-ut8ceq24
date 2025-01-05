import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { UserCircle, Mail, Phone, MapPin, Building2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function EmployeeProfile() {
  const { user } = useAuthStore();
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    department: '',
    position: '',
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
      // Here would be the API call to update the profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profil erfolgreich aktualisiert');
    } catch (error) {
      toast.error('Fehler beim Aktualisieren des Profils');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-primary-400 rounded-xl">
          <UserCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Mein Profil</h1>
          <p className="text-gray-500">Verwalten Sie Ihre persönlichen Informationen</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Vorname"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
          <Input
            label="Nachname"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">E-Mail</label>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">{formData.email}</span>
            </div>
          </div>
          <Input
            label="Telefon"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            icon={<Phone className="w-5 h-5 text-gray-400" />}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Abteilung"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            icon={<Building2 className="w-5 h-5 text-gray-400" />}
          />
          <Input
            label="Position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-gray-400" />
            Adresse
          </h3>
          <Input
            label="Straße"
            value={formData.address.street}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, street: e.target.value }
            })}
          />
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Stadt"
              value={formData.address.city}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address, city: e.target.value }
              })}
            />
            <Input
              label="PLZ"
              value={formData.address.postalCode}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address, postalCode: e.target.value }
              })}
            />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit">
            Änderungen speichern
          </Button>
        </div>
      </form>
    </div>
  );
}