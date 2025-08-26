import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CooperativeLayout } from "./components/CooperativeLayout";
import { Dashboard } from "./pages/Dashboard";
import { MembersPage } from "./views/pages/MembersPage";
import { RolesPage } from "./views/pages/RolesPage";
import { CooperativePage } from "./views/pages/CooperativePage";
import { ServiceTemplatesPage } from "./views/pages/ServiceTemplatesPage";
import { ChartOfAccountsPage } from "./views/pages/ChartOfAccountsPage";
import { TransactionsPage } from "./views/pages/TransactionsPage";
import { BudgetsPage } from "./views/pages/BudgetsPage";
import { FinancialReportsPage } from "./views/pages/FinancialReportsPage";
import { ActivityReportsPage } from "./views/pages/ActivityReportsPage";
import { CustomReportsPage } from "./views/pages/CustomReportsPage";
import { UserSettingsPage } from "./views/pages/UserSettingsPage";
import { SystemSettingsPage } from "./views/pages/SystemSettingsPage";
import { NotificationsPage } from "./views/pages/NotificationsPage";
import { SupportPage } from "./views/pages/SupportPage";
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
              <CooperativePage />
            </CooperativeLayout>
          } />
          <Route path="/templates" element={
            <CooperativeLayout>
              <ServiceTemplatesPage />
            </CooperativeLayout>
          } />
          <Route path="/accounts" element={
            <CooperativeLayout>
              <ChartOfAccountsPage />
            </CooperativeLayout>
          } />
          <Route path="/transactions" element={
            <CooperativeLayout>
              <TransactionsPage />
            </CooperativeLayout>
          } />
          <Route path="/budgets" element={
            <CooperativeLayout>
              <BudgetsPage />
            </CooperativeLayout>
          } />
          <Route path="/financial-reports" element={
            <CooperativeLayout>
              <FinancialReportsPage />
            </CooperativeLayout>
          } />
          <Route path="/activity-reports" element={
            <CooperativeLayout>
              <ActivityReportsPage />
            </CooperativeLayout>
          } />
          <Route path="/custom-reports" element={
            <CooperativeLayout>
              <CustomReportsPage />
            </CooperativeLayout>
          } />
          <Route path="/user-settings" element={
            <CooperativeLayout>
              <UserSettingsPage />
            </CooperativeLayout>
          } />
          <Route path="/system-settings" element={
            <CooperativeLayout>
              <SystemSettingsPage />
            </CooperativeLayout>
          } />
          <Route path="/notifications" element={
            <CooperativeLayout>
              <NotificationsPage />
            </CooperativeLayout>
          } />
          <Route path="/support" element={
            <CooperativeLayout>
              <SupportPage />
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
