import { useState, useEffect, useRef } from "react";
import { Download, QrCode, X, Receipt } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

interface ReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
  transaction: Transaction | null;
}

export function ReceiptModal({ open, onOpenChange, service, transaction }: ReceiptModalProps) {
  const { toast } = useToast();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Generate reference number for transaction
  const referenceNumber = transaction ? `TXN-${transaction.id}-${Date.now()}` : "";

  useEffect(() => {
    if (transaction && service && open) {
      generateQRCode();
    }
  }, [transaction, service, open]);

  const generateQRCode = async () => {
    if (!transaction || !service) return;
    
    try {
      const qrData = JSON.stringify({
        reference: referenceNumber,
        service: service.name,
        category: service.category,
        member: transaction.memberName,
        amount: transaction.amount,
        status: transaction.status,
        date: transaction.date
      });
      
      const url = await QRCode.toDataURL(qrData, {
        width: 150,
        margin: 2,
        color: {
          dark: '#16a34a', // Primary green color
          light: '#ffffff'
        }
      });
      
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "QR Code Error",
        description: "Failed to generate QR code.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPDF = async () => {
    if (!receiptRef.current || !transaction || !service) return;
    
    setIsGeneratingPDF(true);
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`receipt-${referenceNumber}.pdf`);
      
      toast({
        title: "Receipt Downloaded",
        description: "Receipt has been saved as PDF.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Download Error",
        description: "Failed to generate PDF receipt.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (!service || !transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Transaction Receipt
          </DialogTitle>
        </DialogHeader>

        <div ref={receiptRef} className="bg-background p-6 rounded-lg border">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary">Cooperative Receipt</h2>
            <p className="text-muted-foreground">Transaction Confirmation</p>
            <div className="mt-2">
              <Badge variant="outline" className="text-sm">
                Ref: {referenceNumber}
              </Badge>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Service Details */}
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-primary">Service Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Service Name</p>
                  <p className="font-medium">{service.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{service.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service Status</p>
                  <Badge variant={service.status === "Active" ? "default" : "secondary"}>
                    {service.status}
                  </Badge>
                </div>
                {service.description && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="font-medium">{service.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Customer Details */}
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-primary">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Member Name</p>
                  <p className="font-medium">{transaction.memberName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member ID</p>
                  <p className="font-medium">MEM-{Math.floor(Math.random() * 10000)}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Transaction Details */}
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-primary">Transaction Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-bold text-2xl text-primary">₱{transaction.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge 
                    variant={
                      transaction.status === "Completed" ? "default" :
                      transaction.status === "Pending" ? "secondary" : "destructive"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{new Date().toLocaleTimeString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-medium">{transaction.description}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* QR Code */}
          <div className="text-center mb-6">
            <h3 className="font-semibold text-lg mb-3 text-primary flex items-center justify-center gap-2">
              <QrCode className="h-5 w-5" />
              QR Code for Verification
            </h3>
            {qrCodeUrl && (
              <div className="flex justify-center">
                <img src={qrCodeUrl} alt="Transaction QR Code" className="border rounded-lg" />
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Scan this QR code to verify transaction details
            </p>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground border-t pt-4">
            <p>This is an automatically generated receipt.</p>
            <p>Generated on {new Date().toLocaleString()}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
          <Button 
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="hover-scale"
          >
            <Download className="mr-2 h-4 w-4" />
            {isGeneratingPDF ? "Generating..." : "Download PDF"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}