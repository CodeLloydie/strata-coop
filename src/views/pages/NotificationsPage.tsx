import { Bell, Settings, Check, X, Clock, AlertCircle, Info, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "New Member Registration",
      message: "Juan Dela Cruz has successfully registered as a new member",
      type: "info",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      title: "Loan Application Approved",
      message: "₱50,000 loan application for Maria Santos has been approved",
      type: "success",
      time: "4 hours ago",
      read: false
    },
    {
      id: 3,
      title: "System Maintenance Alert",
      message: "Scheduled maintenance on December 28, 2024 from 2:00 AM to 4:00 AM",
      type: "warning",
      time: "6 hours ago",
      read: true
    },
    {
      id: 4,
      title: "Payment Overdue",
      message: "Pedro Garcia has an overdue payment of ₱5,000",
      type: "error",
      time: "1 day ago",
      read: true
    },
    {
      id: 5,
      title: "Monthly Report Generated",
      message: "Financial report for November 2024 is now available for download",
      type: "info",
      time: "2 days ago",
      read: true
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning": return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "error": return <X className="h-5 w-5 text-red-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "success": return "default";
      case "warning": return "secondary";
      case "error": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Manage your notification preferences and view alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hover-scale">
            <Check className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button variant="outline" className="hover-scale">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Unread</div>
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-muted-foreground">New notifications</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Today</div>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-muted-foreground">Total received</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">This Week</div>
            <div className="text-2xl font-bold">24</div>
            <div className="text-xs text-muted-foreground">Notifications</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Priority</div>
            <div className="text-2xl font-bold">2</div>
            <div className="text-xs text-red-600">High priority alerts</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Notifications
              </CardTitle>
              <CardDescription>All notifications and system alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-4 rounded-lg border hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-primary/5 border-primary/20' : ''}`}>
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{notification.title}</span>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                            <Badge variant={getNotificationBadge(notification.type) as any}>
                              {notification.type}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.time}
                          </span>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button variant="ghost" size="sm" className="h-7 px-2 hover-scale">
                                <Check className="h-3 w-3 mr-1" />
                                Mark Read
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="h-7 px-2 hover-scale text-destructive">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>Notifications that require your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.filter(n => !n.read).map((notification) => (
                  <div key={notification.id} className="p-4 rounded-lg border bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{notification.title}</span>
                          <Badge variant={getNotificationBadge(notification.type) as any}>
                            {notification.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.time}
                          </span>
                          <Button variant="default" size="sm" className="h-7 px-3 hover-scale">
                            <Check className="h-3 w-3 mr-1" />
                            Mark Read
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="font-medium">Email Notifications</div>
                {[
                  { label: "New Member Registration", description: "When a new member joins the cooperative" },
                  { label: "Financial Transactions", description: "Large transactions and approvals" },
                  { label: "System Alerts", description: "System maintenance and critical updates" },
                  { label: "Reports Available", description: "When new reports are generated" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <Label className="font-medium">{item.label}</Label>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <Switch defaultChecked={index < 3} />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="font-medium">Push Notifications</div>
                {[
                  { label: "Urgent Alerts", description: "Critical system and security alerts" },
                  { label: "Daily Summary", description: "End of day activity summary" },
                  { label: "Reminders", description: "Task and deadline reminders" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <Label className="font-medium">{item.label}</Label>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <Switch defaultChecked={index === 0} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}