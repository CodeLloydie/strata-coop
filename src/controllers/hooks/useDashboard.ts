import { DashboardStat, QuickAction, ActivityItem } from "@/models";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  FileText,
  Settings
} from "lucide-react";

export function useDashboard() {
  const stats: DashboardStat[] = [
    {
      title: "Total Members",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Total Assets",
      value: "₱2,456,789",
      change: "+8%",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Active Loans",
      value: "156",
      change: "+23%",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "Monthly Transactions",
      value: "892",
      change: "+15%",
      icon: Activity,
      color: "text-primary",
    },
  ];

  const quickActions: QuickAction[] = [
    { title: "Add New Member", icon: Users, href: "/members" },
    { title: "Record Transaction", icon: DollarSign, href: "/transactions" },
    { title: "Generate Report", icon: FileText, href: "/reports" },
    { title: "Manage Templates", icon: Settings, href: "/templates" },
  ];

  const recentActivities: ActivityItem[] = [
    {
      id: "1",
      title: "New member registration",
      description: "Juan Dela Cruz joined the cooperative",
      timestamp: "2h ago"
    },
    {
      id: "2",
      title: "Loan approved",
      description: "₱50,000 loan approved for Maria Santos",
      timestamp: "4h ago"
    },
    {
      id: "3",
      title: "Monthly report generated",
      description: "Financial report for November 2024",
      timestamp: "1d ago"
    }
  ];

  const handleQuickAction = (href: string) => {
    console.log(`Navigate to ${href}`);
  };

  return {
    stats,
    quickActions,
    recentActivities,
    handleQuickAction,
  };
}