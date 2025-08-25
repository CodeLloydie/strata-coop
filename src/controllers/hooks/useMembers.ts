import { useState, useMemo } from "react";
import { Member, MemberFormData, MemberFilters } from "@/models/Member";

// Mock data for demonstration
const mockMembers: Member[] = [
  {
    id: '1',
    memberNumber: 'M-001',
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    email: 'juan.delacruz@example.com',
    phone: '+63-912-345-6789',
    address: '123 Main St, Manila, Philippines',
    dateJoined: '2023-01-15',
    status: 'active',
    membershipType: 'regular',
    contributionAmount: 5000,
    loanBalance: 25000,
    savingsBalance: 15000,
  },
  {
    id: '2',
    memberNumber: 'M-002',
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria.santos@example.com',
    phone: '+63-923-456-7890',
    address: '456 Oak Ave, Quezon City, Philippines',
    dateJoined: '2023-02-20',
    status: 'active',
    membershipType: 'premium',
    contributionAmount: 10000,
    loanBalance: 50000,
    savingsBalance: 35000,
  },
  {
    id: '3',
    memberNumber: 'M-003',
    firstName: 'Pedro',
    lastName: 'Reyes',
    email: 'pedro.reyes@example.com',
    phone: '+63-934-567-8901',
    address: '789 Pine St, Makati, Philippines',
    dateJoined: '2023-03-10',
    status: 'inactive',
    membershipType: 'associate',
    contributionAmount: 3000,
    loanBalance: 0,
    savingsBalance: 8000,
  },
];

export function useMembers() {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [filters, setFilters] = useState<MemberFilters>({
    status: 'all',
    membershipType: 'all',
    search: '',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesStatus = filters.status === 'all' || member.status === filters.status;
      const matchesType = filters.membershipType === 'all' || member.membershipType === filters.membershipType;
      const matchesSearch = !filters.search || 
        member.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
        member.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
        member.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        member.memberNumber.toLowerCase().includes(filters.search.toLowerCase());

      return matchesStatus && matchesType && matchesSearch;
    });
  }, [members, filters]);

  const addMember = (memberData: MemberFormData) => {
    const newMember: Member = {
      id: Date.now().toString(),
      memberNumber: `M-${String(members.length + 1).padStart(3, '0')}`,
      ...memberData,
      dateJoined: new Date().toISOString().split('T')[0],
      status: 'active',
      loanBalance: 0,
      savingsBalance: memberData.contributionAmount,
    };
    setMembers(prev => [...prev, newMember]);
    setIsAddModalOpen(false);
  };

  const updateMember = (id: string, memberData: Partial<Member>) => {
    setMembers(prev => 
      prev.map(member => 
        member.id === id ? { ...member, ...memberData } : member
      )
    );
    setSelectedMember(null);
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  const getMemberStats = () => {
    const totalMembers = members.length;
    const activeMembers = members.filter(m => m.status === 'active').length;
    const totalContributions = members.reduce((sum, m) => sum + m.contributionAmount, 0);
    const totalSavings = members.reduce((sum, m) => sum + m.savingsBalance, 0);

    return {
      totalMembers,
      activeMembers,
      totalContributions,
      totalSavings,
    };
  };

  return {
    members: filteredMembers,
    filters,
    setFilters,
    isAddModalOpen,
    setIsAddModalOpen,
    selectedMember,
    setSelectedMember,
    addMember,
    updateMember,
    deleteMember,
    getMemberStats,
  };
}