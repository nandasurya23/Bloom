export type CheckoutFormValues = {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  notes?: string;
};

export type OrderReceipt = {
  orderId: string;
  customerName: string;
  amount: number;
  itemCount: number;
  createdAt: string;
};
