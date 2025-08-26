import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, DollarSign, TrendingUp, Shield } from "lucide-react";

export function Welcome() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Auto redirect to dashboard (no real auth process)
    navigate("/dashboard");
  };

  const handleRegister = () => {
    // Auto redirect to dashboard (no real auth process)
    navigate("/dashboard");
  };

  const features = [
    {
      icon: Users,
      title: "Member Management",
      description: "Comprehensive member profiles, registration, and activity tracking"
    },
    {
      icon: DollarSign, 
      title: "Financial Management",
      description: "Complete financial tracking, budgets, and reporting tools"
    },
    {
      icon: TrendingUp,
      title: "Analytics & Reports",
      description: "Real-time insights and customizable reporting dashboard"
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Flexible permissions and role management system"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">CoopManage</h1>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleLogin}>
              Login
            </Button>
            <Button onClick={handleRegister}>
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Streamline Your 
            <span className="text-primary block">Cooperative Management</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive SaaS platform designed specifically for cooperatives. 
            Manage members, finances, and operations all in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={handleRegister}>
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" onClick={handleLogin}>
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Everything Your Cooperative Needs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-xl shadow-md text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Cooperative?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of cooperatives already using CoopManage
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={handleRegister}
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-card">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 CoopManage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}