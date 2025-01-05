import React from 'react';
import { CheckCircle, Clock, Trash2, Building2, Mail } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { useBrokerStore } from '../../store/brokerStore';
import type { Member } from '../../types/member';

interface MemberTableProps {
  members: Member[];
  showBrokerInfo?: boolean;
  onDelete: (id: string) => void;
}

export function MemberTable({ members, showBrokerInfo = false, onDelete }: MemberTableProps) {
  const { brokers } = useBrokerStore();

  const getBrokerInfo = (brokerId?: string) => {
    if (!brokerId) return null;
    const broker = brokers.find(b => b.id === brokerId);
    return broker ? `${broker.name} (${broker.company})` : null;
  };

  const getStatusBadge = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="bg-green-100 text-green-800 flex items-center px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="w-4 h-4 mr-1" />
            Aktiv
          </span>
        );
      case 'invited':
        return (
          <span className="bg-blue-100 text-blue-800 flex items-center px-2 py-1 rounded-full text-xs font-medium">
            <Mail className="w-4 h-4 mr-1" />
            Eingeladen
          </span>
        );
      default:
        return (
          <span className="bg-yellow-100 text-yellow-800 flex items-center px-2 py-1 rounded-full text-xs font-medium">
            <Clock className="w-4 h-4 mr-1" />
            Ausstehend
          </span>
        );
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mitgliedsnummer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name/E-Mail
            </th>
            {showBrokerInfo && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Makler
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Datum
            </th>
            <th className="px-6 py-3 relative">
              <span className="sr-only">Aktionen</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {member.memberNumber}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">
                  {member.status === 'invited' ? (
                    <div className="text-gray-900">{member.email}</div>
                  ) : (
                    <>
                      <div className="font-medium text-gray-900">
                        {member.firstName} {member.lastName}
                      </div>
                      <div className="text-gray-500">{member.email}</div>
                    </>
                  )}
                </div>
              </td>
              {showBrokerInfo && (
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.brokerId ? (
                    <div className="flex items-center text-sm text-gray-900">
                      <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                      {getBrokerInfo(member.brokerId)}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </td>
              )}
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(member.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.status === 'invited' 
                  ? `Eingeladen am ${formatDate(member.invitedAt!)}`
                  : `Registriert am ${formatDate(member.joinDate)}`
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onDelete(member.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}