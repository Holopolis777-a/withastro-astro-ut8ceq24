export type MemberStatus = 'active' | 'pending' | 'invited';

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  memberNumber: string;
  email: string;
  phone?: string;
  status: MemberStatus;
  joinDate: Date;
  lastLogin?: Date;
  brokerId?: string;
  invitedAt?: Date;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface MemberFilters {
  search?: string;
  status?: MemberStatus;
  brokerId?: string;
}

export interface MemberInvitation {
  email: string;
  brokerId: string;
  invitedAt: Date;
  status: 'pending' | 'accepted';
}