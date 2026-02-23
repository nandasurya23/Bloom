import type { Product } from "@/types/product";
import type { ProductFilters } from "@/types/query";

export function filterByCategory(
  products: Product[],
  category: ProductFilters["category"]
): Product[] {
  if (category === "all") {
    return products;
  }

  return products.filter((product) => product.category === category);
}

export function filterByMinPrice(products: Product[], minPrice: number): Product[] {
  return products.filter((product) => product.price >= minPrice);
}

export function filterByMaxPrice(products: Product[], maxPrice: number): Product[] {
  return products.filter((product) => product.price <= maxPrice);
}

export function applyProductFilters(products: Product[], filters: ProductFilters): Product[] {
  const byCategory = filterByCategory(products, filters.category);
  const byMinPrice = filterByMinPrice(byCategory, filters.priceRange.min);

  return filterByMaxPrice(byMinPrice, filters.priceRange.max);
}

export const filterService = {
  filterByCategory,
  filterByMinPrice,
  filterByMaxPrice,
  applyProductFilters
};
