import { BarChart3, Download, Calendar, TrendingUp, DollarSign, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FinancialReportsPage() {
  const reports = [
    {
      name: "Balance Sheet",
      description: "Statement of financial position",
      lastGenerated: "2024-12-26",
      type: "Monthly",
      status: "Ready"
    },
    {
      name: "Income Statement",
      description: "Profit and loss statement",
      lastGenerated: "2024-12-26",
      type: "Monthly", 
      status: "Ready"
    },
    {
      name: "Cash Flow Statement",
      description: "Cash inflows and outflows",
      lastGenerated: "2024-12-25",
      type: "Weekly",
      status: "Processing"
    },
    {
      name: "Member Equity Report",
      description: "Individual member contributions",
      lastGenerated: "2024-12-20",
      type: "Quarterly",
      status: "Ready"
    },
  ];

  const quickStats = [
    { label: "Total Assets", value: "₱2,975,000", change: "+5.2%", trend: "up" },
    { label: "Total Revenue", value: "₱180,000", change: "+8.1%", trend: "up" },
    { label: "Net Income", value: "₱148,000", change: "+12.3%", trend: "up" },
    { label: "Member Equity", value: "₱2,100,000", change: "+3.7%", trend: "up" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground">Generate and view financial statements</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
          <Button className="hover-scale">
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover-scale">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-green-600">{stat.change} from last period</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Revenue Breakdown
            </CardTitle>
            <CardDescription>Income sources for current month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { source: "Interest Income", amount: "₱120,000", percentage: "67%" },
                { source: "Service Fees", amount: "₱35,000", percentage: "19%" },
                { source: "Membership Fees", amount: "₱25,000", percentage: "14%" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{item.source}</div>
                    <div className="text-sm text-muted-foreground">{item.percentage} of total</div>
                  </div>
                  <div className="font-bold">{item.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Expense Categories
            </CardTitle>
            <CardDescription>Operating expenses for current month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { category: "Personnel Costs", amount: "₱18,000", percentage: "56%" },
                { category: "Office Expenses", amount: "₱8,000", percentage: "25%" },
                { category: "Utilities", amount: "₱6,000", percentage: "19%" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{item.category}</div>
                    <div className="text-sm text-muted-foreground">{item.percentage} of total</div>
                  </div>
                  <div className="font-bold">{item.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Available Reports
          </CardTitle>
          <CardDescription>Generate or download financial statements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-muted-foreground">{report.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <div className="text-muted-foreground">Last Generated</div>
                    <div>{report.lastGenerated}</div>
                  </div>
                  <Badge variant="outline">{report.type}</Badge>
                  <Badge variant={report.status === "Ready" ? "default" : "secondary"}>
                    {report.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="hover-scale">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}