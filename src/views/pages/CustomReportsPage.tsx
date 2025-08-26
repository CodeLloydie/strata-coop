import { FileText, Plus, Search, Filter, Download, Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function CustomReportsPage() {
  const customReports = [
    {
      id: "RPT-001",
      name: "Member Growth Analysis",
      description: "Monthly member registration and retention analysis",
      creator: "Admin User",
      lastRun: "2024-12-26",
      status: "Active",
      type: "Scheduled"
    },
    {
      id: "RPT-002", 
      name: "Loan Performance Report",
      description: "Detailed analysis of loan portfolios and payment trends",
      creator: "Finance Manager",
      lastRun: "2024-12-25",
      status: "Active",
      type: "On-Demand"
    },
    {
      id: "RPT-003",
      name: "Quarterly Board Report",
      description: "Comprehensive overview for board meetings",
      creator: "CEO",
      lastRun: "2024-12-20",
      status: "Draft",
      type: "Scheduled"
    },
    {
      id: "RPT-004",
      name: "Branch Comparison",
      description: "Performance comparison across different branches",
      creator: "Operations Manager",
      lastRun: "2024-12-18",
      status: "Active",
      type: "On-Demand"
    },
  ];

  const templates = [
    { name: "Financial Summary", icon: "📊", description: "Overview of financial metrics" },
    { name: "Member Analytics", icon: "👥", description: "Member-related statistics and trends" },
    { name: "Transaction Report", icon: "💳", description: "Detailed transaction analysis" },
    { name: "Performance Dashboard", icon: "📈", description: "KPI tracking and performance metrics" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Draft": return "secondary";
      case "Inactive": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Custom Reports</h1>
          <p className="text-muted-foreground">Create and manage custom reporting solutions</p>
        </div>
        <Button className="hover-scale">
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Total Reports</div>
            <div className="text-2xl font-bold">24</div>
            <div className="text-xs text-muted-foreground">4 created this month</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Active Reports</div>
            <div className="text-2xl font-bold">18</div>
            <div className="text-xs text-green-600">75% of total reports</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Generated Today</div>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-muted-foreground">Automatic and manual runs</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Scheduled Reports</div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground">Running automatically</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search custom reports..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon" className="hover-scale">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Quick start templates for common report types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {templates.map((template, index) => (
              <div key={index} className="p-4 rounded-lg border hover:bg-muted/50 cursor-pointer hover-scale transition-all duration-200">
                <div className="text-center space-y-2">
                  <div className="text-2xl">{template.icon}</div>
                  <div className="font-medium">{template.name}</div>
                  <div className="text-sm text-muted-foreground">{template.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Custom Reports
          </CardTitle>
          <CardDescription>Manage your custom reporting solutions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-muted-foreground">{report.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{report.creator}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.type}</Badge>
                  </TableCell>
                  <TableCell>{report.lastRun}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(report.status) as any}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover-scale">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover-scale">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover-scale">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover-scale text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}