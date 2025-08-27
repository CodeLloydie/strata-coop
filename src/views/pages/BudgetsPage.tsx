import { useState } from "react";
import { TrendingUp, Plus, Search, Filter, Target, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AddBudgetModal } from "@/views/components/Budgets/AddBudgetModal";

export function BudgetsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const budgets = [
    { 
      category: "Office Expenses", 
      allocated: 50000, 
      spent: 32000, 
      remaining: 18000, 
      period: "Monthly",
      status: "On Track"
    },
    { 
      category: "Marketing", 
      allocated: 25000, 
      spent: 28000, 
      remaining: -3000, 
      period: "Monthly",
      status: "Over Budget"
    },
    { 
      category: "Training & Development", 
      allocated: 40000, 
      spent: 15000, 
      remaining: 25000, 
      period: "Quarterly",
      status: "Under Utilized"
    },
    { 
      category: "Equipment", 
      allocated: 100000, 
      spent: 85000, 
      remaining: 15000, 
      period: "Annual",
      status: "On Track"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track": return "default";
      case "Over Budget": return "destructive";
      case "Under Utilized": return "secondary";
      default: return "outline";
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage > 100) return "bg-red-500";
    if (percentage > 80) return "bg-yellow-500";
    return "bg-primary";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets & Allocations</h1>
          <p className="text-muted-foreground">Monitor spending and manage budget allocations</p>
        </div>
        <Button className="hover-scale" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Budget
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <div className="text-sm font-medium text-muted-foreground">Total Allocated</div>
            </div>
            <div className="text-2xl font-bold">₱215,000</div>
            <div className="text-xs text-muted-foreground">Across all categories</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Total Spent</div>
            <div className="text-2xl font-bold">₱160,000</div>
            <div className="text-xs text-green-600">74% of budget used</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Remaining</div>
            <div className="text-2xl font-bold">₱55,000</div>
            <div className="text-xs text-muted-foreground">Available to spend</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <div className="text-sm font-medium text-muted-foreground">Alerts</div>
            </div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-xs text-yellow-600">Over budget category</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search budgets..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon" className="hover-scale">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {budgets.map((budget, index) => {
          const percentage = (budget.spent / budget.allocated) * 100;
          return (
            <Card key={index} className="hover-scale transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {budget.category}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{budget.period}</Badge>
                    <Badge variant={getStatusColor(budget.status) as any}>
                      {budget.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Allocated</div>
                    <div className="font-medium">₱{budget.allocated.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Spent</div>
                    <div className="font-medium">₱{budget.spent.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Remaining</div>
                    <div className={`font-medium ${budget.remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      ₱{Math.abs(budget.remaining).toLocaleString()}
                      {budget.remaining < 0 && " (Over)"}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Usage</span>
                    <span>{percentage.toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className={`h-2 ${getProgressColor(percentage)}`}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AddBudgetModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen} 
      />
    </div>
  );
}