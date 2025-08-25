import { LucideIcon } from "lucide-react";

export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export interface QuickAction {
  title: string;
  icon: LucideIcon;
  href: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}