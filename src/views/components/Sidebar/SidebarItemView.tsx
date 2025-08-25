import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { SidebarItem } from "@/models";
import { useSidebar } from "@/controllers";

interface SidebarItemViewProps {
  item: SidebarItem;
  isCollapsed: boolean;
}

export function SidebarItemView({ item, isCollapsed }: SidebarItemViewProps) {
  const { openGroups, toggleGroup, isActive, isGroupActive } = useSidebar();
  
  const hasChildren = item.children && item.children.length > 0;
  const isGroupOpen = openGroups.includes(item.title);
  const groupActive = isGroupActive(item.children);

  if (hasChildren) {
    return (
      <Collapsible
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
}