import type { Product } from "@/types/product";

export type CartItem = {
  productId: Product["id"];
  name: Product["name"];
  imageUrl: Product["imageUrl"];
  quantity: number;
  unitPrice: number;
};

export type CartSummary = {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
};

export type CartProductPayload = Pick<
  Product,
  "id" | "name" | "imageUrl" | "price"
>;
