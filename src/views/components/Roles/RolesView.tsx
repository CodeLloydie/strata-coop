import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Plus, Users, Settings, Eye, Edit, Trash2, Copy, UserCheck } from "lucide-react";
import { useRoles } from "@/controllers/hooks/useRoles";
import { AddRoleModal } from "./AddRoleModal";
import { EditRoleModal } from "./EditRoleModal";
import { ViewRoleModal } from "./ViewRoleModal";

export function RolesView() {
  const {
    roles,
    availablePermissions,
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
  } = useRoles();

  const stats = getRoleStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Role & Permission Management</h1>
          <p className="text-muted-foreground">
            Manage user roles and their permissions
          </p>
        </div>
        <Button 
          className="gap-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Create New Role
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Roles
            </CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalRoles}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary font-medium">{stats.customRoles}</span> custom roles
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Members
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              Assigned to roles
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Permissions
            </CardTitle>
            <UserCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.avgPermissions}</div>
            <p className="text-xs text-muted-foreground">
              Per role
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available Permissions
            </CardTitle>
            <Settings className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{availablePermissions.length}</div>
            <p className="text-xs text-muted-foreground">
              System permissions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card className="rounded-xl shadow-sm border-border/50">
        <CardHeader>
          <CardTitle>Roles & Permissions</CardTitle>
          <CardDescription>
            Manage user roles and their assigned permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{role.description}</TableCell>
                  <TableCell>
                    <Badge variant={role.isSystemRole ? "secondary" : "default"}>
                      {role.isSystemRole ? "System" : "Custom"}
                    </Badge>
                  </TableCell>
                  <TableCell>{role.memberCount}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {role.permissions.length} permission{role.permissions.length !== 1 ? 's' : ''}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(role.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedRole(role)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => editRole(role)}
                        disabled={role.isSystemRole}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => duplicateRole(role.id)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this role?')) {
                            deleteRole(role.id);
                          }
                        }}
                        disabled={role.isSystemRole || role.memberCount > 0}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddRoleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={addRole}
        availablePermissions={availablePermissions}
      />

      <EditRoleModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedRole(null);
        }}
        onSubmit={(data) => selectedRole && updateRole(selectedRole.id, data)}
        role={selectedRole}
        availablePermissions={availablePermissions}
      />

      <ViewRoleModal
        isOpen={!!selectedRole && !isEditModalOpen}
        onClose={() => setSelectedRole(null)}
        role={selectedRole}
      />
    </div>
  );
}