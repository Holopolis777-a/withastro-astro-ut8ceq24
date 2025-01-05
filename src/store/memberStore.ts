import { create } from 'zustand';
import type { Member, MemberFilters, MemberInvitation } from '../types/member';

interface MemberState {
  members: Member[];
  invitations: MemberInvitation[];
  filters: MemberFilters;
  loading: boolean;
  error: string | null;
  fetchMembers: (brokerId?: string) => Promise<void>;
  addMember: (member: Omit<Member, 'id' | 'memberNumber' | 'joinDate'>) => Promise<void>;
  updateMember: (id: string, updates: Partial<Member>) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
  setFilters: (filters: MemberFilters) => void;
  inviteMember: (brokerId: string, email: string) => Promise<void>;
  generateInviteLink: (brokerId: string) => Promise<string>;
  getMembersForBroker: (brokerId: string) => Member[];
}

// Mock data
const mockMembers: Member[] = [
  {
    id: '1',
    firstName: 'Max',
    lastName: 'Mustermann',
    memberNumber: 'M001',
    email: 'max.mustermann@example.com',
    phone: '+49 123 456789',
    status: 'active',
    joinDate: new Date('2023-01-15'),
    lastLogin: new Date('2024-03-10'),
    brokerId: '1',
    address: {
      street: 'Musterstraße 123',
      city: 'Berlin',
      postalCode: '10115',
      country: 'Deutschland',
    },
  },
  {
    id: '2',
    firstName: '',
    lastName: '',
    memberNumber: 'M002',
    email: 'invited.user@example.com',
    status: 'invited',
    joinDate: new Date(),
    brokerId: '1',
    invitedAt: new Date('2024-03-15'),
  },
];

export const useMemberStore = create<MemberState>((set, get) => ({
  members: mockMembers,
  invitations: [],
  filters: {},
  loading: false,
  error: null,

  fetchMembers: async (brokerId) => {
    set({ loading: true });
    try {
      const filteredMembers = brokerId 
        ? mockMembers.filter(member => member.brokerId === brokerId)
        : mockMembers;
      set({ members: filteredMembers, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch members', loading: false });
    }
  },

  getMembersForBroker: (brokerId: string) => {
    return get().members.filter(member => member.brokerId === brokerId);
  },

  inviteMember: async (brokerId: string, email: string) => {
    set({ loading: true });
    try {
      // Create a new member entry for the invited user
      const newMember: Member = {
        id: Date.now().toString(),
        firstName: '',
        lastName: '',
        memberNumber: `M${Date.now().toString().slice(-3)}`,
        email,
        status: 'invited',
        joinDate: new Date(),
        brokerId,
        invitedAt: new Date(),
      };

      set(state => ({
        members: [...state.members, newMember],
        loading: false,
      }));

      return Promise.resolve();
    } catch (error) {
      set({ error: 'Failed to invite member', loading: false });
      return Promise.reject(error);
    }
  },

  // ... rest of the implementation remains the same
}));