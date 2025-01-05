import React from 'react';
import { useMemberStore } from '../../store/memberStore';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Input } from '../../components/ui/Input';
import { Plus, Mail, Link, Trash2, CheckCircle, Clock } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { MemberInviteForm } from './components/MemberInviteForm';
import { MemberTable } from './components/MemberTable';
import { MemberFilters } from './components/MemberFilters';

export default function MemberList() {
  const { user } = useAuthStore();
  const { members, loading, fetchMembers, inviteMember, generateInviteLink, deleteMember } = useMemberStore();
  const [isInviteModalOpen, setInviteModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    if (user?.id) {
      fetchMembers(user.id);
    }
  }, [fetchMembers, user?.id]);

  const filteredMembers = React.useMemo(() => {
    if (!searchTerm) return members;
    
    const searchLower = searchTerm.toLowerCase();
    return members.filter(member => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      const email = member.email.toLowerCase();
      const memberNumber = member.memberNumber.toLowerCase();
      
      return fullName.includes(searchLower) ||
             email.includes(searchLower) ||
             memberNumber.includes(searchLower);
    });
  }, [members, searchTerm]);

  if (loading && members.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Mitglieder</h1>
        <Button onClick={() => setInviteModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Mitglied einladen
        </Button>
      </div>

      <MemberFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <MemberTable
        members={filteredMembers}
        onDelete={deleteMember}
      />

      <Dialog
        open={isInviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Neues Mitglied einladen
            </Dialog.Title>

            <MemberInviteForm
              onInvite={inviteMember}
              onGenerateLink={generateInviteLink}
              onClose={() => setInviteModalOpen(false)}
              brokerId={user?.id}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}