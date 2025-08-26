import { Building2, Users, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CooperativePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cooperative Profile</h1>
          <p className="text-muted-foreground">Manage your cooperative information and settings</p>
        </div>
        <Button className="hover-scale">
          <Building2 className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Cooperative Name:</span>
              <span>Barangay Savings Cooperative</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Registration Number:</span>
              <span>BSC-2024-001</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Status:</span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Established:</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                January 15, 2020
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>123 Barangay Street, City, Province 1234</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>+63 912 345 6789</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>info@barangaycoop.ph</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Members:</span>
              <Badge variant="secondary">1,234</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Active Accounts:</span>
              <Badge variant="secondary">987</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Board Members:</span>
              <Badge variant="secondary">7</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest cooperative updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="font-medium">Board meeting scheduled</p>
              <p className="text-muted-foreground">December 15, 2024</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">New member orientation</p>
              <p className="text-muted-foreground">December 10, 2024</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">Annual report submitted</p>
              <p className="text-muted-foreground">November 30, 2024</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}