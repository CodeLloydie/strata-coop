import { User, Lock, Bell, Globe, Shield, Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function UserSettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Settings</h1>
          <p className="text-muted-foreground">Manage your personal account settings</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="hover-scale">
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Juan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Dela Cruz" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="juan.delacruz@email.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+63 912 345 6789" />
            </div>

            <Button className="hover-scale">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Security Settings
            </CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
              </div>
              <Switch />
            </div>

            <Button className="hover-scale">Update Password</Button>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose what notifications you receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {[
                { label: "Email Notifications", description: "Receive updates via email" },
                { label: "SMS Notifications", description: "Get alerts via text message" },
                { label: "Transaction Alerts", description: "Notify on financial transactions" },
                { label: "Member Updates", description: "Updates about new members" },
                { label: "System Maintenance", description: "Maintenance and downtime notices" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                  <Switch defaultChecked={index < 3} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Preferences
            </CardTitle>
            <CardDescription>Customize your application experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select defaultValue="english">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="filipino">Filipino</SelectItem>
                  <SelectItem value="cebuano">Cebuano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select defaultValue="manila">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manila">(GMT+8) Manila</SelectItem>
                  <SelectItem value="utc">(GMT+0) UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Currency</Label>
              <Select defaultValue="php">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="php">Philippine Peso (₱)</SelectItem>
                  <SelectItem value="usd">US Dollar ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <div className="font-medium">Dark Mode</div>
                <div className="text-sm text-muted-foreground">Switch to dark theme</div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover-scale border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Shield className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible actions for your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
            <div>
              <div className="font-medium">Delete Account</div>
              <div className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </div>
            </div>
            <Button variant="destructive" className="hover-scale">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}