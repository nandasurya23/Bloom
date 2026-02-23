import type { Product } from "@/types/product";

export type WishlistItem = {
  productId: Product["id"];
  name: Product["name"];
  imageUrl: Product["imageUrl"];
  unitPrice: Product["price"];
};

export type WishlistProductPayload = Pick<
  Product,
  "id" | "name" | "imageUrl" | "price"
>;
