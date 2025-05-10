
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { Check, CreditCard, Trash2 } from 'lucide-react';

export interface PaymentMethod {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
}

interface PaymentMethodFormProps {
  onSave: (method: PaymentMethod) => void;
  onDelete?: (id: string) => void;
  paymentMethod?: PaymentMethod;
}

const PaymentMethodForm = ({ onSave, onDelete, paymentMethod }: PaymentMethodFormProps) => {
  const isEditing = !!paymentMethod;
  const [formData, setFormData] = useState({
    id: paymentMethod?.id || Math.random().toString(36).substring(2),
    cardNumber: paymentMethod?.cardNumber || '',
    cardHolder: paymentMethod?.cardHolder || '',
    expiryDate: paymentMethod?.expiryDate || '',
    isDefault: paymentMethod?.isDefault || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.cardNumber || !formData.cardHolder || !formData.expiryDate) {
      toast("Missing information", {
        description: "Please fill in all required fields"
      });
      return;
    }

    // Format card number to hide most digits
    const displayCardNumber = formData.cardNumber.replace(/\s/g, '').slice(-4).padStart(formData.cardNumber.length, '*');
    
    onSave({
      ...formData,
      cardNumber: displayCardNumber,
    });
    
    toast("Payment method saved", {
      description: `Card ending in ${formData.cardNumber.slice(-4)} has been saved`
    });
    
    // Reset form if adding a new card
    if (!isEditing) {
      setFormData({
        id: Math.random().toString(36).substring(2),
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        isDefault: false,
      });
    }
  };

  const handleDelete = () => {
    if (onDelete && formData.id) {
      onDelete(formData.id);
      toast("Payment method removed", {
        description: "The payment method has been deleted"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Payment Method' : 'Add Payment Method'}</CardTitle>
        <CardDescription>
          {isEditing ? 'Update your payment information' : 'Add a new payment method to your account'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="cardNumber" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Card Number
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={formData.cardNumber}
                onChange={handleChange}
                className="pl-10"
                maxLength={19}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="cardHolder" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Card Holder Name
            </label>
            <Input
              id="cardHolder"
              name="cardHolder"
              placeholder="John Doe"
              value={formData.cardHolder}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="expiryDate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Expiry Date
              </label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="cvv" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                CVV
              </label>
              <Input
                id="cvv"
                name="cvv"
                placeholder="123"
                type="password"
                maxLength={3}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isDefault" className="text-sm font-medium leading-none">
              Set as default payment method
            </label>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {isEditing && onDelete && (
            <Button type="button" variant="outline" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          )}
          <Button type="submit">
            <Check className="mr-2 h-4 w-4" />
            {isEditing ? 'Update' : 'Add'} Card
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PaymentMethodForm;
