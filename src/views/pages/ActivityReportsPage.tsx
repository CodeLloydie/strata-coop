import { Activity, Calendar, Users, TrendingUp, Clock, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ActivityReportsPage() {
  const activities = [
    {
      time: "10:30 AM",
      user: "Juan Dela Cruz",
      action: "Member Registration",
      details: "New member added to cooperative",
      category: "Member Management"
    },
    {
      time: "09:45 AM", 
      user: "Maria Santos",
      action: "Loan Application",
      details: "₱50,000 loan application submitted",
      category: "Financial"
    },
    {
      time: "09:15 AM",
      user: "Admin User",
      action: "Report Generated", 
      details: "Monthly financial report created",
      category: "Reports"
    },
    {
      time: "08:30 AM",
      user: "Pedro Garcia",
      action: "Payment Received",
      details: "Monthly contribution payment",
      category: "Financial"
    },
  ];

  const metrics = [
    { label: "Total Activities", value: "156", change: "+23%", period: "Today" },
    { label: "Active Users", value: "28", change: "+12%", period: "Today" },
    { label: "Transactions", value: "45", change: "+8%", period: "Today" },
    { label: "Reports Generated", value: "12", change: "+15%", period: "This Week" },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Member Management": "default",
      "Financial": "secondary",
      "Reports": "outline",
      "System": "destructive"
    };
    return colors[category as keyof typeof colors] || "outline";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Reports</h1>
          <p className="text-muted-foreground">Monitor system activities and user actions</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="today">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="hover-scale">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover-scale">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">{metric.label}</div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-xs text-green-600">{metric.change} from {metric.period.toLowerCase()}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Most Active Users
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Juan Dela Cruz", actions: 24 },
              { name: "Maria Santos", actions: 18 },
              { name: "Pedro Garcia", actions: 15 },
              { name: "Ana Rodriguez", actions: 12 },
            ].map((user, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{user.name}</span>
                <Badge variant="secondary">{user.actions} actions</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Activity by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { category: "Financial", count: 45, percentage: "38%" },
              { category: "Member Management", count: 32, percentage: "27%" },
              { category: "Reports", count: 28, percentage: "24%" },
              { category: "System", count: 13, percentage: "11%" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{item.category}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{item.percentage}</span>
                  <Badge variant="outline">{item.count}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Peak Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { time: "9:00 - 10:00 AM", activities: 28 },
              { time: "2:00 - 3:00 PM", activities: 24 },
              { time: "10:00 - 11:00 AM", activities: 22 },
              { time: "3:00 - 4:00 PM", activities: 18 },
            ].map((period, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{period.time}</span>
                <Badge variant="secondary">{period.activities}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity Log
          </CardTitle>
          <CardDescription>Live feed of system activities and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{activity.action}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={getCategoryColor(activity.category) as any}>
                        {activity.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.details}</p>
                  <p className="text-sm font-medium text-primary">by {activity.user}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}