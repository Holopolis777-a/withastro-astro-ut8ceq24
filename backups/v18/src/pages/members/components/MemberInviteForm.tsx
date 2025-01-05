import React from 'react';
import { Mail, Link } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

interface MemberInviteFormProps {
  onInvite: (brokerId: string, email: string) => Promise<void>;
  onGenerateLink: (brokerId: string) => Promise<string>;
  onClose: () => void;
  brokerId?: string;
}

export function MemberInviteForm({ onInvite, onGenerateLink, onClose, brokerId }: MemberInviteFormProps) {
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [generatedLink, setGeneratedLink] = React.useState('');

  const handleInviteByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brokerId || !inviteEmail) return;
    
    try {
      await onInvite(brokerId, inviteEmail);
      setInviteEmail('');
      onClose();
    } catch (error) {
      console.error('Failed to invite member:', error);
    }
  };

  const handleGenerateLink = async () => {
    if (!brokerId) return;
    
    try {
      const link = await onGenerateLink(brokerId);
      setGeneratedLink(link);
    } catch (error) {
      console.error('Failed to generate invite link:', error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleInviteByEmail} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700">
            E-Mail-Adresse
          </label>
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="beispiel@email.de"
          />
        </div>
        <Button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700">
          <Mail className="w-5 h-5 mr-2" />
          Per E-Mail einladen
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-base">
          <span className="px-4 bg-white text-gray-500">Oder</span>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          variant="outline"
          onClick={handleGenerateLink}
          className="w-full py-3"
        >
          <Link className="w-5 h-5 mr-2" />
          Einladungslink generieren
        </Button>

        {generatedLink && (
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg break-all">
              {generatedLink}
            </div>
            <Button
              variant="secondary"
              onClick={handleCopyLink}
              className="w-full py-3"
            >
              Link kopieren
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}