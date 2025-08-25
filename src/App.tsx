import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CooperativeLayout } from "./components/CooperativeLayout";
import { Dashboard } from "./pages/Dashboard";
import { MembersPage } from "./views/pages/MembersPage";
import { RolesPage } from "./views/pages/RolesPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CooperativeLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/cooperative" element={<Index />} />
            <Route path="/templates" element={<Index />} />
            <Route path="/accounts" element={<Index />} />
            <Route path="/transactions" element={<Index />} />
            <Route path="/budgets" element={<Index />} />
            <Route path="/financial-reports" element={<Index />} />
            <Route path="/activity-reports" element={<Index />} />
            <Route path="/custom-reports" element={<Index />} />
            <Route path="/user-settings" element={<Index />} />
            <Route path="/system-settings" element={<Index />} />
            <Route path="/notifications" element={<Index />} />
            <Route path="/support" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CooperativeLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
