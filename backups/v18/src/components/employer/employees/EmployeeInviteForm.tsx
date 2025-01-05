import React from 'react';
import { Mail, Link } from 'lucide-react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';

interface EmployeeInviteFormProps {
  onInvite: (employerId: string, email: string) => Promise<void>;
  onClose: () => void;
  employerId?: string;
}

export function EmployeeInviteForm({ onInvite, onClose, employerId }: EmployeeInviteFormProps) {
  const [inviteEmail, setInviteEmail] = React.useState('');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employerId || !inviteEmail) return;
    
    try {
      await onInvite(employerId, inviteEmail);
      setInviteEmail('');
      onClose();
    } catch (error) {
      console.error('Failed to invite employee:', error);
    }
  };

  return (
    <form onSubmit={handleInvite} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-base font-medium text-gray-700">
          E-Mail-Adresse des Mitarbeiters
        </label>
        <Input
          type="email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          placeholder="mitarbeiter@firma.de"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Abbrechen
        </Button>
        <Button type="submit">
          <Mail className="w-4 h-4 mr-2" />
          Einladung senden
        </Button>
      </div>
    </form>
  );
}