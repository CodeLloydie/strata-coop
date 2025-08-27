import { useState } from "react";
import { BookOpen, Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AddTemplateModal } from "@/views/components/ServiceTemplates/AddTemplateModal";

export function ServiceTemplatesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const templates = [
    { id: 1, name: "Savings Account", category: "Banking", status: "Active", usage: 234 },
    { id: 2, name: "Loan Application", category: "Credit", status: "Active", usage: 156 },
    { id: 3, name: "Insurance Plan", category: "Insurance", status: "Draft", usage: 0 },
    { id: 4, name: "Investment Package", category: "Investment", status: "Active", usage: 87 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Templates</h1>
          <p className="text-muted-foreground">Manage templates for cooperative services</p>
        </div>
        <Button className="hover-scale" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search templates..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon" className="hover-scale">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="hover-scale cursor-pointer transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <BookOpen className="h-5 w-5 text-primary" />
                <Badge variant={template.status === "Active" ? "default" : "secondary"}>
                  {template.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription>{template.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Usage Count:</span>
                <span className="font-medium">{template.usage}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Template Categories</CardTitle>
          <CardDescription>Service template distribution by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Banking", "Credit", "Insurance", "Investment"].map((category) => (
              <div key={category} className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">
                  {category === "Banking" ? "2" : category === "Credit" ? "1" : 
                   category === "Insurance" ? "1" : "1"}
                </div>
                <div className="text-sm text-muted-foreground">{category}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddTemplateModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen} 
      />
    </div>
  );
}