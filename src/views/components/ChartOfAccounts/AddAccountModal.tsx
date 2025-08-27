import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddAccountModal({ open, onOpenChange }: AddAccountModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    type: "",
    category: "",
    initialBalance: ""
  });

  const accountTypes = [
    { value: "Asset", label: "Asset" },
    { value: "Liability", label: "Liability" },
    { value: "Equity", label: "Equity" },
    { value: "Revenue", label: "Revenue" },
    { value: "Expense", label: "Expense" }
  ];

  const categories = {
    Asset: ["Current Assets", "Fixed Assets", "Other Assets"],
    Liability: ["Current Liabilities", "Long-term Liabilities"],
    Equity: ["Owner's Equity", "Retained Earnings"],
    Revenue: ["Operating Revenue", "Other Revenue"],
    Expense: ["Operating Expenses", "Other Expenses"]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.code || !formData.name || !formData.type || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    toast({
      title: "Account Created",
      description: `Account "${formData.name}" has been created successfully.`,
    });

    // Reset form and close modal
    setFormData({ code: "", name: "", type: "", category: "", initialBalance: "" });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Reset category when type changes
    if (field === "type") {
      setFormData(prev => ({ ...prev, category: "" }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Account
          </DialogTitle>
          <DialogDescription>
            Create a new account in your chart of accounts.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Account Code *</Label>
              <Input
                id="code"
                placeholder="e.g., 1001"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Account Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {accountTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Account Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Cash on Hand"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleInputChange("category", value)}
              disabled={!formData.type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {formData.type && categories[formData.type as keyof typeof categories]?.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="balance">Initial Balance (Optional)</Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              placeholder="₱0.00"
              value={formData.initialBalance}
              onChange={(e) => handleInputChange("initialBalance", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="hover-scale">
              Create Account
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}