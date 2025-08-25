import { useState } from "react";
import { SidebarView } from "@/views/components/Sidebar/SidebarView";

interface CooperativeLayoutViewProps {
  children: React.ReactNode;
}

export function CooperativeLayoutView({ children }: CooperativeLayoutViewProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarView 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}