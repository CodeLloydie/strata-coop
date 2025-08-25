export interface Member {
  id: string;
  memberNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateJoined: string;
  status: 'active' | 'inactive' | 'suspended';
  membershipType: 'regular' | 'associate' | 'premium';
  contributionAmount: number;
  loanBalance: number;
  savingsBalance: number;
}

export interface MemberFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  membershipType: 'regular' | 'associate' | 'premium';
  contributionAmount: number;
}

export interface MemberFilters {
  status?: 'active' | 'inactive' | 'suspended' | 'all';
  membershipType?: 'regular' | 'associate' | 'premium' | 'all';
  search?: string;
}