import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  DollarSign, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut,
  Menu,
  ChevronDown,
  UserCheck,
  Shield,
  Building2,
  BookOpen,
  Receipt,
  CreditCard,
  TrendingUp,
  BarChart3,
  Activity,
  Bell,
  User
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface SidebarItem {
  title: string;
  icon: React.ComponentType<any>;
  href?: string;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Members & Roles",
    icon: Users,
    children: [
      { title: "Member Management", icon: UserCheck, href: "/members" },
      { title: "Role & Permission Management", icon: Shield, href: "/roles" },
    ],
  },
  {
    title: "Cooperative",
    icon: Building,
    children: [
      { title: "Cooperative Profile", icon: Building2, href: "/cooperative" },
      { title: "Service Templates", icon: BookOpen, href: "/templates" },
    ],
  },
  {
    title: "Financial Management",
    icon: DollarSign,
    children: [
      { title: "Chart of Accounts", icon: Receipt, href: "/accounts" },
      { title: "Transactions", icon: CreditCard, href: "/transactions" },
      { title: "Budgets & Allocations", icon: TrendingUp, href: "/budgets" },
      { title: "Reports", icon: BarChart3, href: "/financial-reports" },
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    children: [
      { title: "Activity Reports", icon: Activity, href: "/activity-reports" },
      { title: "Custom Reports", icon: FileText, href: "/custom-reports" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "User Settings", icon: User, href: "/user-settings" },
      { title: "System Settings", icon: Settings, href: "/system-settings" },
      { title: "Notifications", icon: Bell, href: "/notifications" },
    ],
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    href: "/support",
  },
];

interface CooperativeSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function CooperativeSidebar({ isCollapsed, onToggle }: CooperativeSidebarProps) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<string[]>(["Members & Roles", "Financial Management"]);

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(g => g !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  
  const isGroupActive = (children?: SidebarItem[]) => {
    return children?.some(child => child.href && isActive(child.href));
  };

  const renderSidebarItem = (item: SidebarItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isGroupOpen = openGroups.includes(item.title);
    const groupActive = isGroupActive(item.children);

    if (hasChildren) {
      return (
        <Collapsible
          key={item.title}
          open={isGroupOpen && !isCollapsed}
          onOpenChange={() => toggleGroup(item.title)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between rounded-xl px-3 py-6 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
                groupActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                isCollapsed && "justify-center px-2"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.title}</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isGroupOpen && "rotate-180"
                  )} 
                />
              )}
            </Button>
          </CollapsibleTrigger>
          {!isCollapsed && (
            <CollapsibleContent className="space-y-1 ml-4 mt-2">
              {item.children?.map((child) => (
                <NavLink
                  key={child.title}
                  to={child.href!}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
                      isActive && "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    )
                  }
                >
                  <child.icon className="h-4 w-4" />
                  <span>{child.title}</span>
                </NavLink>
              ))}
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    }

    return (
      <NavLink
        key={item.title}
        to={item.href!}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-xl px-3 py-6 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 font-medium",
            isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
            isCollapsed && "justify-center px-2"
          )
        }
      >
        <item.icon className="h-5 w-5 shrink-0" />
        {!isCollapsed && <span>{item.title}</span>}
      </NavLink>
    );
  };

  return (
    <div className={cn(
      "flex h-screen flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <h2 className="text-lg font-bold text-sidebar-foreground">CoopManager</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
        {sidebarItems.map(renderSidebarItem)}
      </nav>

      {/* Footer - Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 rounded-xl px-3 py-6 text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-all duration-200",
            isCollapsed && "justify-center px-2"
          )}
          onClick={() => {
            // Handle logout logic here
            console.log("Logout clicked");
          }}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}