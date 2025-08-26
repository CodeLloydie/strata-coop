import { Settings, Database, Shield, Mail, Globe, Server, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SystemSettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
        </div>
        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
          Admin Access Required
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Database Configuration
            </CardTitle>
            <CardDescription>Manage database connections and backup settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dbHost">Database Host</Label>
              <Input id="dbHost" defaultValue="localhost" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dbPort">Port</Label>
              <Input id="dbPort" defaultValue="5432" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dbName">Database Name</Label>
              <Input id="dbName" defaultValue="cooperative_db" />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <div className="font-medium">Automatic Backups</div>
                <div className="text-sm text-muted-foreground">Daily database backups at 2:00 AM</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="hover-scale">Test Connection</Button>
              <Button className="hover-scale">Save Configuration</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security Settings
            </CardTitle>
            <CardDescription>Configure system security policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Password Policy</Label>
              <Select defaultValue="strong">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                  <SelectItem value="strong">Strong (8+ chars, mixed case, numbers)</SelectItem>
                  <SelectItem value="complex">Complex (12+ chars, symbols required)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              {[
                { label: "Force Password Reset", description: "Require password change every 90 days" },
                { label: "Two-Factor Authentication", description: "Mandatory 2FA for all users" },
                { label: "Login Attempt Limits", description: "Block after 5 failed attempts" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                  <Switch defaultChecked={index !== 1} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email Configuration
            </CardTitle>
            <CardDescription>Setup email server for notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input id="smtpHost" defaultValue="smtp.gmail.com" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpPort">Port</Label>
                <Input id="smtpPort" defaultValue="587" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="encryption">Encryption</Label>
                <Select defaultValue="tls">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="tls">TLS</SelectItem>
                    <SelectItem value="ssl">SSL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtpUser">Username</Label>
              <Input id="smtpUser" defaultValue="notifications@cooperative.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtpPass">Password</Label>
              <Input id="smtpPass" type="password" placeholder="••••••••" />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="hover-scale">Send Test Email</Button>
              <Button className="hover-scale">Save Configuration</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Application Settings
            </CardTitle>
            <CardDescription>General application configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appName">Application Name</Label>
              <Input id="appName" defaultValue="CoopManager" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Default Timezone</Label>
              <Select defaultValue="asia_manila">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia_manila">(GMT+8) Asia/Manila</SelectItem>
                  <SelectItem value="utc">(GMT+0) UTC</SelectItem>
                  <SelectItem value="us_eastern">(GMT-5) US/Eastern</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Select defaultValue="php">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="php">Philippine Peso (₱)</SelectItem>
                  <SelectItem value="usd">US Dollar ($)</SelectItem>
                  <SelectItem value="eur">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              {[
                { label: "Maintenance Mode", description: "Temporarily disable user access" },
                { label: "Registration Open", description: "Allow new member registrations" },
                { label: "Debug Mode", description: "Enable detailed error logging" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                  <Switch defaultChecked={index === 1} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            System Status
          </CardTitle>
          <CardDescription>Monitor system health and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Database</span>
                <Badge variant="default">Online</Badge>
              </div>
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
            
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Memory Usage</span>
                <Badge variant="secondary">Normal</Badge>
              </div>
              <div className="text-2xl font-bold">68%</div>
              <div className="text-xs text-muted-foreground">4.2GB / 8GB</div>
            </div>
            
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">CPU Usage</span>
                <Badge variant="default">Good</Badge>
              </div>
              <div className="text-2xl font-bold">42%</div>
              <div className="text-xs text-muted-foreground">Average load</div>
            </div>
            
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Disk Space</span>
                <Badge variant="outline">Warning</Badge>
              </div>
              <div className="text-2xl font-bold">85%</div>
              <div className="text-xs text-yellow-600">120GB / 150GB</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover-scale border-yellow-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-600">
            <AlertTriangle className="h-5 w-5" />
            System Maintenance
          </CardTitle>
          <CardDescription>Critical system operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="hover-scale justify-start">
              <Database className="mr-2 h-4 w-4" />
              Backup Now
            </Button>
            <Button variant="outline" className="hover-scale justify-start">
              <Server className="mr-2 h-4 w-4" />
              Clear Cache
            </Button>
            <Button variant="outline" className="hover-scale justify-start">
              <Settings className="mr-2 h-4 w-4" />
              System Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}