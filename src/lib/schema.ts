import { APP_NAME, APP_URL } from "@/lib/constants";
import type { Product } from "@/types/product";

type JsonLd = Record<string, unknown>;

export function buildShopCollectionJsonLd(products: Product[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${APP_NAME} Shop Catalog`,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: `${APP_URL}${product.imageUrl}`,
        category: product.category,
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: product.price,
          availability:
            product.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock"
        }
      }
    }))
  };
}
