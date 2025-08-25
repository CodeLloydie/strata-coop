import { LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  icon: LucideIcon;
  href?: string;
  children?: SidebarItem[];
}

export interface SidebarState {
  isCollapsed: boolean;
  openGroups: string[];
}