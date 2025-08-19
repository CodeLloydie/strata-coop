import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Building,
  FileText,
  Settings,
  Plus
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Total Members",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Total Assets",
      value: "₱2,456,789",
      change: "+8%",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Active Loans",
      value: "156",
      change: "+23%",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "Monthly Transactions",
      value: "892",
      change: "+15%",
      icon: Activity,
      color: "text-primary",
    },
  ];

  const quickActions = [
    { title: "Add New Member", icon: Users, href: "/members" },
    { title: "Record Transaction", icon: DollarSign, href: "/transactions" },
    { title: "Generate Report", icon: FileText, href: "/reports" },
    { title: "Manage Templates", icon: Settings, href: "/templates" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your cooperative management system
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Quick Action
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="rounded-xl shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-medium">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card className="rounded-xl shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Frequently used actions for cooperative management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                className="w-full justify-start gap-3 h-12 rounded-lg"
                onClick={() => {
                  // Navigation logic would go here
                  console.log(`Navigate to ${action.href}`);
                }}
              >
                <action.icon className="h-4 w-4" />
                {action.title}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="rounded-xl shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest activities in your cooperative
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 border border-border/50">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">New member registration</p>
                  <p className="text-muted-foreground">Juan Dela Cruz joined the cooperative</p>
                </div>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 border border-border/50">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">Loan approved</p>
                  <p className="text-muted-foreground">₱50,000 loan approved for Maria Santos</p>
                </div>
                <span className="text-xs text-muted-foreground">4h ago</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 border border-border/50">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">Monthly report generated</p>
                  <p className="text-muted-foreground">Financial report for November 2024</p>
                </div>
                <span className="text-xs text-muted-foreground">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}