import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AddBudgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBudgetModal({ open, onOpenChange }: AddBudgetModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    category: "",
    allocated: "",
    period: "",
    startDate: "",
    endDate: "",
    description: "",
    alertThreshold: "80"
  });

  const periods = [
    { value: "Monthly", label: "Monthly" },
    { value: "Quarterly", label: "Quarterly" },
    { value: "Semi-Annual", label: "Semi-Annual" },
    { value: "Annual", label: "Annual" }
  ];

  const categories = [
    "Office Expenses",
    "Marketing",
    "Training & Development",
    "Equipment",
    "Utilities",
    "Travel & Transportation",
    "Professional Services",
    "Insurance",
    "Maintenance & Repairs",
    "Supplies"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.category || !formData.allocated || !formData.period) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(formData.allocated) <= 0) {
      toast({
        title: "Validation Error",
        description: "Budget amount must be greater than zero.",
        variant: "destructive",
      });
      return;
    }

    // Date validation
    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      toast({
        title: "Validation Error",
        description: "End date must be after start date.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    toast({
      title: "Budget Created",
      description: `Budget for "${formData.category}" with ₱${parseFloat(formData.allocated).toLocaleString()} has been created.`,
    });

    // Reset form and close modal
    setFormData({
      category: "",
      allocated: "",
      period: "",
      startDate: "",
      endDate: "",
      description: "",
      alertThreshold: "80"
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Budget
          </DialogTitle>
          <DialogDescription>
            Set up a new budget allocation for expense management.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Budget Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Budget Period *</Label>
              <Select value={formData.period} onValueChange={(value) => handleInputChange("period", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allocated">Allocated Amount *</Label>
            <Input
              id="allocated"
              type="number"
              step="0.01"
              placeholder="₱0.00"
              value={formData.allocated}
              onChange={(e) => handleInputChange("allocated", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date (Optional)</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alertThreshold">Alert Threshold (%)</Label>
            <Select value={formData.alertThreshold} onValueChange={(value) => handleInputChange("alertThreshold", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50% - Conservative</SelectItem>
                <SelectItem value="70">70% - Moderate</SelectItem>
                <SelectItem value="80">80% - Standard</SelectItem>
                <SelectItem value="90">90% - Aggressive</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              You'll receive alerts when spending reaches this percentage
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Additional details about this budget..."
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="hover-scale">
              Create Budget
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}