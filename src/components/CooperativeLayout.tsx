import { useState } from "react";
import { CooperativeSidebar } from "./CooperativeSidebar";

interface CooperativeLayoutProps {
  children: React.ReactNode;
}

export function CooperativeLayout({ children }: CooperativeLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <CooperativeSidebar 
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