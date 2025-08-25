export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'members' | 'financial' | 'reports' | 'settings' | 'system';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  memberCount: number;
  isSystemRole: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RoleFormData {
  name: string;
  description: string;
  permissions: string[];
}

export const AVAILABLE_PERMISSIONS: Permission[] = [
  // Members
  { id: 'members:view', name: 'View Members', description: 'View member profiles and information', category: 'members' },
  { id: 'members:create', name: 'Add Members', description: 'Register new members', category: 'members' },
  { id: 'members:edit', name: 'Edit Members', description: 'Update member information', category: 'members' },
  { id: 'members:delete', name: 'Delete Members', description: 'Remove members from system', category: 'members' },
  
  // Financial
  { id: 'financial:view', name: 'View Financial Data', description: 'Access financial reports and transactions', category: 'financial' },
  { id: 'financial:create', name: 'Create Transactions', description: 'Record new financial transactions', category: 'financial' },
  { id: 'financial:approve', name: 'Approve Transactions', description: 'Approve pending transactions', category: 'financial' },
  { id: 'financial:loans', name: 'Manage Loans', description: 'Process loan applications and disbursements', category: 'financial' },
  
  // Reports
  { id: 'reports:view', name: 'View Reports', description: 'Access standard reports', category: 'reports' },
  { id: 'reports:create', name: 'Create Reports', description: 'Generate custom reports', category: 'reports' },
  { id: 'reports:export', name: 'Export Reports', description: 'Export reports to various formats', category: 'reports' },
  
  // Settings
  { id: 'settings:view', name: 'View Settings', description: 'Access system settings', category: 'settings' },
  { id: 'settings:edit', name: 'Edit Settings', description: 'Modify system configuration', category: 'settings' },
  
  // System
  { id: 'system:admin', name: 'System Administration', description: 'Full system administration access', category: 'system' },
  { id: 'system:backup', name: 'System Backup', description: 'Create and restore system backups', category: 'system' },
];