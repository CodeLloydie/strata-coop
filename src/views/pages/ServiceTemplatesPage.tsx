import { useState } from "react";
import { BookOpen, Plus, Search, Filter, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AddServiceModal } from "@/views/components/ServiceTemplates/AddServiceModal";
import { ServiceTransactionsModal } from "@/views/components/ServiceTemplates/ServiceTransactionsModal";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: number;
  name: string;
  category: string;
  status: "Active" | "Draft";
  usage: number;
  description?: string;
}

export function ServiceTemplatesPage() {
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Personal Loan", category: "Loan", status: "Active", usage: 234, description: "Individual lending service" },
    { id: 2, name: "Rice Milling", category: "Milling", status: "Active", usage: 156, description: "Rice processing service" },
    { id: 3, name: "Grain Storage", category: "Storage", status: "Draft", usage: 0, description: "Long-term grain storage facility" },
    { id: 4, name: "Business Loan", category: "Loan", status: "Active", usage: 87, description: "Commercial lending service" },
  ]);

  const handleAddService = (newService: Omit<Service, 'id' | 'usage'>) => {
    const service: Service = {
      ...newService,
      id: Date.now(),
      usage: 0
    };
    setServices(prev => [...prev, service]);
    toast({
      title: "Service Created",
      description: `${service.name} has been added successfully.`,
    });
  };

  const handleManageTransactions = (service: Service) => {
    setSelectedService(service);
    setIsTransactionsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Management</h1>
          <p className="text-muted-foreground">Create and manage cooperative services</p>
        </div>
        <Button className="hover-scale" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Service
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search services..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon" className="hover-scale">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="hover-scale transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <BookOpen className="h-5 w-5 text-primary" />
                <Badge variant={service.status === "Active" ? "default" : "secondary"}>
                  {service.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{service.name}</CardTitle>
              <CardDescription>{service.category}</CardDescription>
              {service.description && (
                <p className="text-sm text-muted-foreground mt-2">{service.description}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Usage Count:</span>
                  <span className="font-medium">{service.usage}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full hover-scale"
                  onClick={() => handleManageTransactions(service)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Categories</CardTitle>
          <CardDescription>Service distribution by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Loan", "Milling", "Storage"].map((category) => {
              const count = services.filter(service => service.category === category).length;
              return (
                <div key={category} className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">{count}</div>
                  <div className="text-sm text-muted-foreground">{category}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AddServiceModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen}
        onAddService={handleAddService}
      />
      
      <ServiceTransactionsModal
        open={isTransactionsModalOpen}
        onOpenChange={setIsTransactionsModalOpen}
        service={selectedService}
      />
    </div>
  );
}