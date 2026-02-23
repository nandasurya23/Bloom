import type { ProductCategory } from "@/types/product";

export type PriceRange = {
  min: number;
  max: number;
};

export type ProductFilters = {
  category: ProductCategory | "all";
  priceRange: PriceRange;
};
