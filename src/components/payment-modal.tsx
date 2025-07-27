import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Smartphone, 
  Building2,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  orderDetails: {
    items: string[];
    vendorName: string;
  };
}

type PaymentMethod = 'card' | 'upi' | 'netbanking';

export const PaymentModal = ({ isOpen, onClose, orderTotal, orderDetails }: PaymentModalProps) => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'method' | 'details' | 'success'>('method');
  
  // Card form state
  const [cardForm, setCardForm] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  
  // UPI form state
  const [upiId, setUpiId] = useState('');
  
  // Net banking form state
  const [bankSelected, setBankSelected] = useState('');

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank'
  ];

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    setStep('success');
    
    toast({
      title: "Payment Successful!",
      description: `₹${orderTotal} paid successfully`,
    });
  };

  const resetAndClose = () => {
    setStep('method');
    setCardForm({ number: '', expiry: '', cvv: '', name: '' });
    setUpiId('');
    setBankSelected('');
    setProcessing(false);
    onClose();
  };

  if (step === 'success') {
    return (
      <Dialog open={isOpen} onOpenChange={resetAndClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-4">
              Your order has been placed successfully
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium">Order Details</p>
              <p className="text-lg font-bold text-success">₹{orderTotal}</p>
              <p className="text-xs text-muted-foreground">to {orderDetails.vendorName}</p>
            </div>
            <Button onClick={resetAndClose} className="w-full">
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {step === 'details' && (
              <Button variant="ghost" size="sm" onClick={() => setStep('method')}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <DialogTitle>
              {step === 'method' ? 'Choose Payment Method' : 'Payment Details'}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Vendor:</span>
                <span>{orderDetails.vendorName}</span>
              </div>
              {orderDetails.items.map((item, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total Amount:</span>
                <span className="text-success">₹{orderTotal}</span>
              </div>
            </CardContent>
          </Card>

          {step === 'method' && (
            <div className="space-y-4">
              <h3 className="font-medium">Select Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                <div className="space-y-3">
                  <Card className={`cursor-pointer transition-all ${paymentMethod === 'card' ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="w-5 h-5" />
                        <Label htmlFor="card" className="cursor-pointer flex-1">
                          Credit/Debit Card
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className={`cursor-pointer transition-all ${paymentMethod === 'upi' ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upi" id="upi" />
                        <Smartphone className="w-5 h-5" />
                        <Label htmlFor="upi" className="cursor-pointer flex-1">
                          UPI (GPay, PhonePe, Paytm)
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className={`cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Building2 className="w-5 h-5" />
                        <Label htmlFor="netbanking" className="cursor-pointer flex-1">
                          Net Banking
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </RadioGroup>
              
              <Button onClick={() => setStep('details')} className="w-full">
                Continue to Payment
              </Button>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-4">
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Card Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardForm.name}
                        onChange={(e) => setCardForm({...cardForm, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardForm.number}
                        onChange={(e) => setCardForm({...cardForm, number: formatCardNumber(e.target.value)})}
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardForm.expiry}
                          onChange={(e) => setCardForm({...cardForm, expiry: formatExpiry(e.target.value)})}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardForm.cvv}
                          onChange={(e) => setCardForm({...cardForm, cvv: e.target.value.replace(/\D/g, '').substring(0, 3)})}
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    UPI Payment
                  </h3>
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@paytm / yourname@googlepay"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
                    <p>• Enter your UPI ID registered with any UPI app</p>
                    <p>• You'll receive a payment request on your UPI app</p>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Net Banking
                  </h3>
                  <div>
                    <Label>Select Your Bank</Label>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {banks.map((bank) => (
                        <Card 
                          key={bank} 
                          className={`cursor-pointer transition-all ${bankSelected === bank ? 'ring-2 ring-primary' : ''}`}
                          onClick={() => setBankSelected(bank)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={bank} checked={bankSelected === bank} />
                              <span className="text-sm">{bank}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Button 
                onClick={handlePayment} 
                className="w-full"
                disabled={processing}
              >
                {processing ? 'Processing...' : `Pay ₹${orderTotal}`}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};