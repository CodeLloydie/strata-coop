import { CreditCard, Plus, Search, Filter, Download, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TransactionsPage() {
  const transactions = [
    { 
      id: "TXN-001", 
      date: "2024-12-26", 
      description: "Member Deposit - Juan Dela Cruz", 
      account: "Savings Account", 
      type: "Credit", 
      amount: "₱5,000.00",
      status: "Completed"
    },
    { 
      id: "TXN-002", 
      date: "2024-12-26", 
      description: "Office Supplies Purchase", 
      account: "Office Expenses", 
      type: "Debit", 
      amount: "₱2,500.00",
      status: "Completed"
    },
    { 
      id: "TXN-003", 
      date: "2024-12-25", 
      description: "Loan Interest Payment", 
      account: "Interest Income", 
      type: "Credit", 
      amount: "₱1,200.00",
      status: "Pending"
    },
    { 
      id: "TXN-004", 
      date: "2024-12-25", 
      description: "Member Withdrawal - Maria Santos", 
      account: "Savings Account", 
      type: "Debit", 
      amount: "₱3,000.00",
      status: "Completed"
    },
  ];

  const getStatusColor = (status: string) => {
    return status === "Completed" ? "default" : status === "Pending" ? "secondary" : "destructive";
  };

  const getTypeColor = (type: string) => {
    return type === "Credit" ? "default" : "outline";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Record and manage financial transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hover-scale">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="hover-scale">
            <Plus className="mr-2 h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Today's Transactions</div>
            <div className="text-2xl font-bold">24</div>
            <div className="text-xs text-muted-foreground">+12% from yesterday</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Total Credits</div>
            <div className="text-2xl font-bold text-green-600">₱6,200.00</div>
            <div className="text-xs text-muted-foreground">Money in</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Total Debits</div>
            <div className="text-2xl font-bold text-red-600">₱5,500.00</div>
            <div className="text-xs text-muted-foreground">Money out</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Net Amount</div>
            <div className="text-2xl font-bold text-green-600">₱700.00</div>
            <div className="text-xs text-muted-foreground">Today's balance</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon" className="hover-scale">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Transaction History
          </CardTitle>
          <CardDescription>Recent financial transactions and entries</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="text-muted-foreground">{transaction.account}</TableCell>
                  <TableCell>
                    <Badge variant={getTypeColor(transaction.type) as any}>
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{transaction.amount}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(transaction.status) as any}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover-scale">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}