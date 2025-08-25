import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Role } from "@/models/Role";

interface ViewRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
}

export function ViewRoleModal({ isOpen, onClose, role }: ViewRoleModalProps) {
  if (!role) return null;

  const groupedPermissions = role.permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof role.permissions>);

  const getCategoryColor = (category: string) => {
    const colors = {
      members: "bg-blue-100 text-blue-800",
      financial: "bg-green-100 text-green-800",
      reports: "bg-purple-100 text-purple-800",
      settings: "bg-orange-100 text-orange-800",
      system: "bg-red-100 text-red-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {role.name}
            <Badge variant={role.isSystemRole ? "secondary" : "default"}>
              {role.isSystemRole ? "System Role" : "Custom Role"}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {role.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Members Assigned</h4>
              <p className="text-2xl font-bold">{role.memberCount}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Total Permissions</h4>
              <p className="text-2xl font-bold">{role.permissions.length}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Created</h4>
            <p>{new Date(role.createdAt).toLocaleDateString()}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Last Updated</h4>
            <p>{new Date(role.updatedAt).toLocaleDateString()}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-semibold">Permissions by Category</h4>
            
            {Object.entries(groupedPermissions).map(([category, permissions]) => (
              <Card key={category} className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium capitalize flex items-center gap-2">
                    <Badge className={getCategoryColor(category)}>
                      {category}
                    </Badge>
                    <span>({permissions.length} permission{permissions.length !== 1 ? 's' : ''})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="border-l-2 border-primary/20 pl-3">
                        <p className="text-sm font-medium">{permission.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {permission.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}