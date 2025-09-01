import { useState } from "react";
import { Plus, DollarSign, Calendar, User, FileText, Receipt } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ReceiptModal } from "./ReceiptModal";
import { useTransactions } from "@/contexts/TransactionContext";

interface Service {
  id: string;
  name: string;
  category: string;
  status: "Active" | "Draft";
  usage: number;
  description?: string;
}

interface Transaction {
  id: string;
  memberName: string;
  amount: number;
  date: string;
  description: string;
  status: "Completed" | "Pending" | "Cancelled";
}

interface ServiceTransactionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
}

export function ServiceTransactionsModal({ open, onOpenChange, service }: ServiceTransactionsModalProps) {
  const { toast } = useToast();
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  const { addTransaction, getServiceTransactions } = useTransactions();
  
  // Get transactions for this specific service
  const serviceTransactions = getServiceTransactions(service?.id || "");
  
  // Convert to local transaction format for backward compatibility
  const transactions = serviceTransactions.map(tx => ({
    id: tx.id,
    memberName: tx.memberName || "Unknown Member",
    amount: parseFloat(tx.amount.replace(/[₱,]/g, "")),
    date: tx.date,
    description: tx.description,
    status: tx.status as "Completed" | "Pending" | "Cancelled"
  }));

  const [newTransaction, setNewTransaction] = useState({
    memberName: "",
    amount: "",
    description: ""
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTransaction.memberName || !newTransaction.amount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (service) {
      // Add transaction to the global transaction context
      addTransaction({
        date: new Date().toISOString().split('T')[0],
        description: newTransaction.description || "No description provided",
        account: "Service Revenue",
        type: "Credit",
        amount: `₱${parseFloat(newTransaction.amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
        status: "Pending",
        memberName: newTransaction.memberName,
        serviceId: service.id,
        serviceName: service.name
      });
      
      setNewTransaction({ memberName: "", amount: "", description: "" });
      setShowAddTransaction(false);
      
      toast({
        title: "Transaction Added",
        description: `New transaction for ${newTransaction.memberName} has been recorded.`,
      });
    }
  };

  const totalAmount = transactions
    .filter(t => t.status === "Completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter(t => t.status === "Pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const handleGenerateReceipt = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowReceipt(true);
  };

  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Manage Transactions - {service.name}
          </DialogTitle>
          <DialogDescription>
            Record and manage transactions for {service.category} services.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{service.name}</CardTitle>
              <CardDescription>
                <Badge variant={service.status === "Active" ? "default" : "secondary"}>
                  {service.status}
                </Badge>
                <span className="ml-2">{service.category} • {transactions.length} transactions</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <div className="text-2xl font-bold text-primary">₱{totalAmount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Completed</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/10">
                  <div className="text-2xl font-bold text-secondary-foreground">₱{pendingAmount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Pending Amount</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold">{transactions.length}</div>
                  <div className="text-sm text-muted-foreground">Total Transactions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Transaction Form */}
          {showAddTransaction ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add New Transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddTransaction} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="memberName">Member Name *</Label>
                      <Input
                        id="memberName"
                        placeholder="Enter member name"
                        value={newTransaction.memberName}
                        onChange={(e) => setNewTransaction(prev => ({ ...prev, memberName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount *</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Transaction description..."
                      rows={2}
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="hover-scale">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Transaction
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowAddTransaction(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Recent Transactions</h3>
              <Button onClick={() => setShowAddTransaction(true)} className="hover-scale">
                <Plus className="mr-2 h-4 w-4" />
                New Transaction
              </Button>
            </div>
          )}

          {/* Transactions List */}
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <div className="text-muted-foreground">No transactions recorded yet.</div>
                </CardContent>
              </Card>
            ) : (
                transactions.map((transaction) => (
                <Card key={transaction.id} className="hover-scale transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{transaction.memberName}</div>
                          <div className="text-sm text-muted-foreground">{transaction.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-medium flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ₱{transaction.amount.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(transaction.date).toLocaleDateString()}
                            <Badge 
                              variant={
                                transaction.status === "Completed" ? "default" :
                                transaction.status === "Pending" ? "secondary" : "destructive"
                              }
                              className="ml-2"
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleGenerateReceipt(transaction)}
                          className="hover-scale"
                        >
                          <Receipt className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <Separator />
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
      
      <ReceiptModal
        open={showReceipt}
        onOpenChange={setShowReceipt}
        service={service}
        transaction={selectedTransaction}
      />
    </Dialog>
  );
}