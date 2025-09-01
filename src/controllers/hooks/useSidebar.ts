import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarItem, SidebarState } from "@/models";
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  DollarSign, 
  FileText, 
  Settings, 
  HelpCircle,
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

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
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

export function useSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(["Members & Roles", "Financial Management"]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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

  const handleLogout = () => {
    // Clear any session data if needed
    // For now, just redirect to welcome page
    navigate("/");
  };

  return {
    sidebarItems,
    isCollapsed,
    openGroups,
    toggleSidebar,
    toggleGroup,
    isActive,
    isGroupActive,
    handleLogout,
  };
}