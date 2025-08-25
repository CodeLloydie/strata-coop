import { useState } from "react";
import { Role, RoleFormData, AVAILABLE_PERMISSIONS } from "@/models/Role";

// Mock data for demonstration
const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    permissions: AVAILABLE_PERMISSIONS,
    memberCount: 2,
    isSystemRole: true,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
  {
    id: '2',
    name: 'Treasurer',
    description: 'Financial management and reporting access',
    permissions: AVAILABLE_PERMISSIONS.filter(p => 
      p.category === 'financial' || p.category === 'reports' || 
      (p.category === 'members' && p.id === 'members:view')
    ),
    memberCount: 1,
    isSystemRole: false,
    createdAt: '2023-01-15',
    updatedAt: '2023-02-10',
  },
  {
    id: '3',
    name: 'Secretary',
    description: 'Member management and basic reporting',
    permissions: AVAILABLE_PERMISSIONS.filter(p => 
      p.category === 'members' || 
      (p.category === 'reports' && p.id === 'reports:view')
    ),
    memberCount: 1,
    isSystemRole: false,
    createdAt: '2023-01-20',
    updatedAt: '2023-01-20',
  },
  {
    id: '4',
    name: 'Member',
    description: 'Basic member access with view-only permissions',
    permissions: AVAILABLE_PERMISSIONS.filter(p => 
      p.id === 'members:view' || p.id === 'reports:view'
    ),
    memberCount: 15,
    isSystemRole: true,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
];

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const addRole = (roleData: RoleFormData) => {
    const selectedPermissions = AVAILABLE_PERMISSIONS.filter(p => 
      roleData.permissions.includes(p.id)
    );
    
    const newRole: Role = {
      id: Date.now().toString(),
      name: roleData.name,
      description: roleData.description,
      permissions: selectedPermissions,
      memberCount: 0,
      isSystemRole: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    
    setRoles(prev => [...prev, newRole]);
    setIsAddModalOpen(false);
  };

  const updateRole = (id: string, roleData: RoleFormData) => {
    const selectedPermissions = AVAILABLE_PERMISSIONS.filter(p => 
      roleData.permissions.includes(p.id)
    );
    
    setRoles(prev => 
      prev.map(role => 
        role.id === id 
          ? { 
              ...role, 
              name: roleData.name,
              description: roleData.description,
              permissions: selectedPermissions,
              updatedAt: new Date().toISOString().split('T')[0],
            } 
          : role
      )
    );
    setIsEditModalOpen(false);
    setSelectedRole(null);
  };

  const deleteRole = (id: string) => {
    const role = roles.find(r => r.id === id);
    if (role?.isSystemRole) {
      alert('Cannot delete system roles');
      return;
    }
    if (role && role.memberCount > 0) {
      alert('Cannot delete role with active members. Please reassign members first.');
      return;
    }
    setRoles(prev => prev.filter(role => role.id !== id));
  };

  const duplicateRole = (id: string) => {
    const roleToDuplicate = roles.find(r => r.id === id);
    if (!roleToDuplicate) return;

    const newRole: Role = {
      ...roleToDuplicate,
      id: Date.now().toString(),
      name: `${roleToDuplicate.name} (Copy)`,
      memberCount: 0,
      isSystemRole: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    
    setRoles(prev => [...prev, newRole]);
  };

  const editRole = (role: Role) => {
    if (role.isSystemRole) {
      alert('System roles cannot be edited');
      return;
    }
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const getRoleStats = () => {
    const totalRoles = roles.length;
    const customRoles = roles.filter(r => !r.isSystemRole).length;
    const totalMembers = roles.reduce((sum, r) => sum + r.memberCount, 0);
    const avgPermissions = Math.round(
      roles.reduce((sum, r) => sum + r.permissions.length, 0) / roles.length
    );

    return {
      totalRoles,
      customRoles,
      totalMembers,
      avgPermissions,
    };
  };

  return {
    roles,
    availablePermissions: AVAILABLE_PERMISSIONS,
    isAddModalOpen,
    setIsAddModalOpen,
    selectedRole,
    setSelectedRole,
    isEditModalOpen,
    setIsEditModalOpen,
    addRole,
    updateRole,
    deleteRole,
    duplicateRole,
    editRole,
    getRoleStats,
  };
}