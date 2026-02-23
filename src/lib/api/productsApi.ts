import { products } from "@/data/products";
import type { Product } from "@/types/product";

const PRODUCT_FETCH_DELAY_MS = 700;

export async function fetchProducts(): Promise<Product[]> {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), PRODUCT_FETCH_DELAY_MS);
  });

  return products;
}
