import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "prd-001",
    slug: "sunrise-rose-bouquet",
    name: "Sunrise Rose Bouquet",
    description: "Soft pastel roses arranged for warm celebratory moments.",
    category: "rose",
    price: 325000,
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["pastel", "celebration", "best-seller"]
  },
  {
    id: "prd-002",
    slug: "moonlight-tulip-wrap",
    name: "Moonlight Tulip Wrap",
    description: "Fresh tulips with balanced tones for elegant gifting.",
    category: "tulip",
    price: 285000,
    stock: 10,
    imageUrl: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["gift", "minimal", "fresh"]
  },
  {
    id: "prd-003",
    slug: "ivory-lily-basket",
    name: "Ivory Lily Basket",
    description: "Classic white lilies in a premium woven basket.",
    category: "lily",
    price: 415000,
    stock: 7,
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["premium", "formal", "signature"]
  },
  {
    id: "prd-004",
    slug: "emerald-orchid-bloom",
    name: "Emerald Orchid Bloom",
    description: "Orchid stems curated for modern interior accents.",
    category: "orchid",
    price: 510000,
    stock: 5,
    imageUrl: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["luxury", "modern", "interior"]
  }
];
