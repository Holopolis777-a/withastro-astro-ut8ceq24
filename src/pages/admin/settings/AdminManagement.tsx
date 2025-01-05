import React from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useAdminStore } from '../../../store/adminStore';
import { toast } from 'react-hot-toast';
import { Users, Mail, Trash2 } from 'lucide-react';

export default function AdminManagement() {
  const { admins, inviteAdmin, removeAdmin } = useAdminStore();
  const [email, setEmail] = React.useState('');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await inviteAdmin(email);
      setEmail('');
      toast.success('Admin-Einladung wurde versendet');
    } catch (error) {
      toast.error('Fehler beim Versenden der Einladung');
    }
  };

  const handleRemove = async (adminId: string) => {
    if (!confirm('Möchten Sie diesem Benutzer wirklich die Admin-Rechte entziehen?')) {
      return;
    }

    try {
      await removeAdmin(adminId);
      toast.success('Admin-Rechte wurden entzogen');
    } catch (error) {
      toast.error('Fehler beim Entziehen der Admin-Rechte');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Users className="w-5 h-5 text-gray-600" />
        </div>
        <h2 className="text-lg font-medium">Admin-Verwaltung</h2>
      </div>

      {/* Invite Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Neuen Administrator einladen</h3>
        <form onSubmit={handleInvite} className="flex gap-4">
          <div className="flex-1">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail-Adresse"
              required
              leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
            />
          </div>
          <Button type="submit">Einladen</Button>
        </form>
      </div>

      {/* Admin List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-medium">Aktive Administratoren</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {admins.map((admin) => (
            <div key={admin.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{admin.name}</p>
                <p className="text-sm text-gray-500">{admin.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(admin.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}