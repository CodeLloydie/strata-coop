import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CooperativeLayout } from "./components/CooperativeLayout";
import { Dashboard } from "./pages/Dashboard";
import { MembersPage } from "./views/pages/MembersPage";
import { RolesPage } from "./views/pages/RolesPage";
import { Welcome } from "./pages/Welcome";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={
            <CooperativeLayout>
              <Dashboard />
            </CooperativeLayout>
          } />
          <Route path="/members" element={
            <CooperativeLayout>
              <MembersPage />
            </CooperativeLayout>
          } />
          <Route path="/roles" element={
            <CooperativeLayout>
              <RolesPage />
            </CooperativeLayout>
          } />
          <Route path="/cooperative" element={
            <CooperativeLayout>
              <Index />
            </CooperativeLayout>
          } />
          <Route path="/templates" element={
            <CooperativeLayout>
              <Index />
            </CooperativeLayout>
          } />
          <Route path="/accounts" element={
            <CooperativeLayout>
              <Index />
            </CooperativeLayout>
          } />
          <Route path="/transactions" element={
            <CooperativeLayout>
              <Index />
            </CooperativeLayout>
          } />
          <Route path="/budgets" element={
            <CooperativeLayout>
              <Index />
            </CooperativeLayout>
          } />
          <Route path="/financial-reports" element={
            <CooperativeLayout>
              <Index />
            </CooperativeLayout>
          } />
          <Route path="/activity-reports" element={
            <CooperativeLayout>
              <Index />
            </CooperativeLayout>
          } />
          <Route path="/custom-reports" element={
            <CooperativeLayout>
              <Index />
            </CooperativeLayout>
          } />
          <Route path="/user-settings" element={
            <CooperativeLayout>
              <Index />
            </CooperativeLayout>
          } />
          <Route path="/system-settings" element={
            <CooperativeLayout>
              <Index />
            </CooperativeLayout>
          } />
          <Route path="/notifications" element={
            <CooperativeLayout>
              <Index />
            </CooperativeLayout>
          } />
          <Route path="/support" element={
            <CooperativeLayout>
              <Index />
            </CooperativeLayout>
          } />
          <Route path="/" element={<Welcome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
