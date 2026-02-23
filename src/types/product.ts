export type ProductCategory = "bouquet" | "rose" | "tulip" | "lily" | "orchid";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  stock: number;
  imageUrl: string;
  featured: boolean;
  tags: string[];
};
