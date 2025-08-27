import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AddTemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTemplateModal({ open, onOpenChange }: AddTemplateModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    requirements: "",
    procedures: "",
    documents: "",
    fees: "",
    processingTime: "",
    status: "Draft"
  });

  const categories = [
    { value: "Banking", label: "Banking Services" },
    { value: "Credit", label: "Credit & Loans" },
    { value: "Insurance", label: "Insurance Products" },
    { value: "Investment", label: "Investment Services" },
    { value: "Savings", label: "Savings Programs" },
    { value: "Educational", label: "Educational Assistance" }
  ];

  const statuses = [
    { value: "Draft", label: "Draft" },
    { value: "Active", label: "Active" },
    { value: "Under Review", label: "Under Review" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.category || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    toast({
      title: "Template Created",
      description: `Service template "${formData.name}" has been created successfully.`,
    });

    // Reset form and close modal
    setFormData({
      name: "",
      category: "",
      description: "",
      requirements: "",
      procedures: "",
      documents: "",
      fees: "",
      processingTime: "",
      status: "Draft"
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Service Template
          </DialogTitle>
          <DialogDescription>
            Create a new template for cooperative services.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Personal Loan Application"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the service..."
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              placeholder="List the requirements for this service..."
              rows={3}
              value={formData.requirements}
              onChange={(e) => handleInputChange("requirements", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="procedures">Procedures</Label>
            <Textarea
              id="procedures"
              placeholder="Step-by-step procedures..."
              rows={4}
              value={formData.procedures}
              onChange={(e) => handleInputChange("procedures", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="documents">Required Documents</Label>
              <Textarea
                id="documents"
                placeholder="List required documents..."
                rows={3}
                value={formData.documents}
                onChange={(e) => handleInputChange("documents", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fees">Fees & Charges</Label>
              <Textarea
                id="fees"
                placeholder="List applicable fees..."
                rows={3}
                value={formData.fees}
                onChange={(e) => handleInputChange("fees", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="processingTime">Processing Time</Label>
              <Input
                id="processingTime"
                placeholder="e.g., 3-5 business days"
                value={formData.processingTime}
                onChange={(e) => handleInputChange("processingTime", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="hover-scale">
              Create Template
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}