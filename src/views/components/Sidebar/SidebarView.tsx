import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/controllers";
import { SidebarItemView } from "./SidebarItemView";

interface SidebarViewProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function SidebarView({ isCollapsed, onToggle }: SidebarViewProps) {
  const { sidebarItems, handleLogout } = useSidebar();

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
        {sidebarItems.map((item) => (
          <SidebarItemView 
            key={item.title} 
            item={item} 
            isCollapsed={isCollapsed} 
          />
        ))}
      </nav>

      {/* Footer - Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 rounded-xl px-3 py-6 text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-all duration-200",
            isCollapsed && "justify-center px-2"
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}