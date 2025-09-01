import { useState } from "react";
import { SidebarView } from "@/views/components/Sidebar/SidebarView";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface CooperativeLayoutViewProps {
  children: React.ReactNode;
}

export function CooperativeLayoutView({ children }: CooperativeLayoutViewProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 z-30 h-screen">
        <SidebarView 
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>
      
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header with Email Button */}
        <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-foreground">CoopManager</h2>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}