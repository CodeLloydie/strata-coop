import { HelpCircle, MessageCircle, Book, Phone, Mail, ExternalLink, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function SupportPage() {
  const faqs = [
    {
      question: "How do I add a new member to the cooperative?",
      answer: "Navigate to Members > Member Management and click the 'Add Member' button. Fill in the required information including personal details, contact information, and initial contribution amount."
    },
    {
      question: "How can I generate financial reports?",
      answer: "Go to Reports > Financial Reports and select the type of report you need. Choose your date range and click 'Generate Report'. The report will be available for download once processing is complete."
    },
    {
      question: "What should I do if I forget my password?",
      answer: "Click the 'Forgot Password' link on the login page. Enter your email address and you'll receive instructions to reset your password. Make sure to check your spam folder if you don't see the email."
    },
    {
      question: "How do I backup the cooperative data?",
      answer: "Administrators can initiate backups from System Settings > Database Configuration. You can also schedule automatic daily backups to ensure your data is always protected."
    },
    {
      question: "Can I customize the chart of accounts?",
      answer: "Yes, you can add, edit, or remove accounts from Financial Management > Chart of Accounts. Make sure to follow proper accounting principles when making changes."
    },
  ];

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      action: "Start Chat",
      availability: "Available 9 AM - 6 PM"
    },
    {
      title: "Phone Support", 
      description: "Call us for urgent issues and technical help",
      icon: Phone,
      action: "+63 (2) 123-4567",
      availability: "24/7 Support"
    },
    {
      title: "Email Support",
      description: "Send us detailed questions or feature requests",
      icon: Mail,
      action: "support@coopmanager.com",
      availability: "Response within 24 hours"
    },
    {
      title: "Documentation",
      description: "Browse our comprehensive user guides",
      icon: Book,
      action: "View Docs",
      availability: "Always Available"
    },
  ];

  const resources = [
    { title: "Getting Started Guide", category: "Setup", time: "5 min read" },
    { title: "Member Management Tutorial", category: "Members", time: "10 min read" },
    { title: "Financial Reports Overview", category: "Finance", time: "8 min read" },
    { title: "System Administration", category: "Admin", time: "15 min read" },
    { title: "Troubleshooting Common Issues", category: "Support", time: "12 min read" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">Get assistance and learn how to use CoopManager</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search for help articles, tutorials, or FAQs..." className="pl-10 text-lg h-12" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {supportOptions.map((option, index) => (
          <Card key={index} className="hover-scale transition-all duration-200 hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <option.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" className="hover-scale">
                      {option.title === "Phone Support" || option.title === "Email Support" ? (
                        <>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {option.action}
                        </>
                      ) : (
                        option.action
                      )}
                    </Button>
                    <Badge variant="outline">{option.availability}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="hover-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Common questions and answers about using CoopManager</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="hover-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            Learning Resources
          </CardTitle>
          <CardDescription>Tutorials and guides to help you master CoopManager</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, index) => (
              <div key={index} className="p-4 rounded-lg border hover:bg-muted/50 cursor-pointer hover-scale transition-all duration-200">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{resource.category}</Badge>
                    <span className="text-xs text-muted-foreground">{resource.time}</span>
                  </div>
                  <h4 className="font-medium">{resource.title}</h4>
                  <Button variant="ghost" size="sm" className="w-full justify-start p-0 h-auto text-primary">
                    Read Article →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="hover-scale bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-2">Need Priority Support?</h3>
              <p className="text-sm text-muted-foreground">
                Upgrade to Premium Support for 24/7 assistance, dedicated account manager, and priority response times.
              </p>
            </div>
            <Button className="hover-scale">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}