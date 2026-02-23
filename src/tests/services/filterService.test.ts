import { applyProductFilters, filterByCategory, filterByMaxPrice, filterByMinPrice } from "@/services/filterService";
import type { Product } from "@/types/product";

const products: Product[] = [
  {
    id: "1",
    slug: "rose",
    name: "Rose",
    description: "Rose bouquet",
    category: "rose",
    price: 150000,
    stock: 10,
    imageUrl: "/rose.jpg",
    featured: false,
    tags: []
  },
  {
    id: "2",
    slug: "lily",
    name: "Lily",
    description: "Lily bouquet",
    category: "lily",
    price: 250000,
    stock: 5,
    imageUrl: "/lily.jpg",
    featured: false,
    tags: []
  }
];

describe("filterService", () => {
  it("filters by category", () => {
    expect(filterByCategory(products, "rose")).toHaveLength(1);
  });

  it("filters by price range", () => {
    const byMin = filterByMinPrice(products, 200000);
    const byMax = filterByMaxPrice(products, 200000);

    expect(byMin).toHaveLength(1);
    expect(byMin[0].name).toBe("Lily");
    expect(byMax).toHaveLength(1);
    expect(byMax[0].name).toBe("Rose");
  });

  it("applies combined filter", () => {
    const result = applyProductFilters(products, {
      category: "lily",
      priceRange: { min: 200000, max: 300000 }
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Lily");
  });

  it("returns all when filter is effectively empty", () => {
    const result = applyProductFilters(products, {
      category: "all",
      priceRange: { min: 0, max: 9999999 }
    });

    expect(result).toHaveLength(products.length);
  });
});
