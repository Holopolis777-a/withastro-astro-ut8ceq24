import React from 'react';
import { useMemberStore } from '../../../store/memberStore';
import { useBrokerStore } from '../../../store/brokerStore';
import { MemberTable } from '../../../components/members/MemberTable';
import { MemberFilters } from '../../../components/members/MemberFilters';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { Badge } from '../../../components/ui/Badge';

export default function AdminMembers() {
  const { members, loading } = useMemberStore();
  const { brokers } = useBrokerStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedBroker, setSelectedBroker] = React.useState('all');

  // Filter members based on search and selected broker
  const filteredMembers = React.useMemo(() => {
    return members.filter(member => {
      const matchesSearch = 
        member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.memberNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBroker = 
        selectedBroker === 'all' || 
        member.brokerId === selectedBroker;

      return matchesSearch && matchesBroker;
    });
  }, [members, searchTerm, selectedBroker]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Mitglieder</h1>
          <p className="text-gray-500 mt-1">
            Gesamtanzahl: <Badge variant="info">{members.length}</Badge>
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MemberFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <select
            value={selectedBroker}
            onChange={(e) => setSelectedBroker(e.target.value)}
            className="h-10 rounded-lg border-gray-300 focus:border-primary-400 focus:ring-primary-400"
          >
            <option value="all">Alle Makler</option>
            {brokers.map(broker => (
              <option key={broker.id} value={broker.id}>
                {broker.name} ({broker.company})
              </option>
            ))}
          </select>
        </div>

        <MemberTable
          members={filteredMembers}
          showBrokerInfo={true}
          onDelete={() => {}}
        />
      </div>
    </div>
  );
}