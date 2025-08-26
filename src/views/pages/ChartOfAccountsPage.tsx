import { Receipt, Plus, Search, Filter, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ChartOfAccountsPage() {
  const accounts = [
    { id: "1001", name: "Cash on Hand", type: "Asset", category: "Current Assets", balance: "₱125,000.00" },
    { id: "1002", name: "Savings Account", type: "Asset", category: "Current Assets", balance: "₱850,000.00" },
    { id: "2001", name: "Accounts Payable", type: "Liability", category: "Current Liabilities", balance: "₱45,000.00" },
    { id: "3001", name: "Member Equity", type: "Equity", category: "Owner's Equity", balance: "₱2,100,000.00" },
    { id: "4001", name: "Interest Income", type: "Revenue", category: "Operating Revenue", balance: "₱180,000.00" },
    { id: "5001", name: "Office Expenses", type: "Expense", category: "Operating Expenses", balance: "₱32,000.00" },
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      Asset: "default",
      Liability: "destructive",
      Equity: "secondary",
      Revenue: "default",
      Expense: "outline"
    };
    return colors[type as keyof typeof colors] || "outline";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chart of Accounts</h1>
          <p className="text-muted-foreground">Manage your accounting structure and accounts</p>
        </div>
        <Button className="hover-scale">
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Total Assets", value: "₱975,000", type: "Asset" },
          { label: "Total Liabilities", value: "₱45,000", type: "Liability" },
          { label: "Total Equity", value: "₱2,100,000", type: "Equity" },
          { label: "Total Revenue", value: "₱180,000", type: "Revenue" },
          { label: "Total Expenses", value: "₱32,000", type: "Expense" },
        ].map((item) => (
          <Card key={item.label} className="hover-scale">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search accounts..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon" className="hover-scale">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Account Listing
          </CardTitle>
          <CardDescription>Complete chart of accounts with balances</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Code</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{account.id}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>
                    <Badge variant={getTypeColor(account.type) as any}>
                      {account.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{account.category}</TableCell>
                  <TableCell className="text-right font-medium">{account.balance}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover-scale">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover-scale text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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