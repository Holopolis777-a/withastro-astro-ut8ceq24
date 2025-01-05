import React from 'react';
import { useMemberStore } from '../../store/memberStore';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Mail, Link } from 'lucide-react';
import { Dialog } from '@headlessui/react';

export default function MemberListPage() {
  const { user } = useAuthStore();
  const { members, inviteMember, generateInviteLink } = useMemberStore();
  const [isInviteModalOpen, setInviteModalOpen] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [generatedLink, setGeneratedLink] = React.useState('');

  const handleInviteByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !inviteEmail) return;
    
    try {
      await inviteMember(user.id, inviteEmail);
      setInviteEmail('');
      setInviteModalOpen(false);
    } catch (error) {
      console.error('Failed to invite member:', error);
    }
  };

  const handleGenerateLink = async () => {
    if (!user?.id) return;
    
    try {
      const link = await generateInviteLink(user.id);
      setGeneratedLink(link);
    } catch (error) {
      console.error('Failed to generate invite link:', error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Mitglieder</h1>
        <Button onClick={() => setInviteModalOpen(true)}>
          <span className="flex items-center">
            <span className="mr-2">+</span>
            Mitglied einladen
          </span>
        </Button>
      </div>

      {/* Member list table here */}

      <Dialog
        open={isInviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg p-8 max-w-lg w-full mx-4">
            <Dialog.Title className="text-2xl font-semibold text-gray-900 mb-6">
              Neues Mitglied einladen
            </Dialog.Title>

            <div className="space-y-8">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
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

              <Button
                onClick={handleInviteByEmail}
                className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Per E-Mail einladen
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-base">
                  <span className="px-4 bg-white text-gray-500">Oder</span>
                </div>
              </div>

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
        </div>
      </Dialog>
    </div>
  );
}