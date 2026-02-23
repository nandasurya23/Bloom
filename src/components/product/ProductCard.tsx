import type { JSX } from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

import { formatCurrency } from "@/lib/formatCurrency";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  isCartCoolingDown?: boolean;
  isWishlistCoolingDown?: boolean;
};

export function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  isCartCoolingDown = false,
  isWishlistCoolingDown = false
}: ProductCardProps): JSX.Element {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-bloom-rose/40 bg-white p-4 shadow-sm"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-bloom-blush">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-4 text-base font-semibold text-bloom-ink">{product.name}</h3>
      <p className="mt-1 text-sm text-bloom-ink/70">{product.description}</p>
      <p className="mt-3 text-sm font-medium text-bloom-ink">{formatCurrency(product.price)}</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          disabled={isCartCoolingDown}
          onClick={() => {
            onAddToCart?.(product);
          }}
          className="inline-flex items-center gap-2 rounded-md border border-bloom-rose/60 px-3 py-2 text-xs text-bloom-ink transition hover:bg-bloom-blush disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiShoppingBag className="text-sm" />
          {isCartCoolingDown ? "Added" : "Add to cart"}
        </button>
        <button
          type="button"
          disabled={isWishlistCoolingDown}
          onClick={() => {
            onAddToWishlist?.(product);
          }}
          className="inline-flex items-center rounded-md border border-bloom-rose/60 px-3 py-2 text-bloom-ink transition hover:bg-bloom-blush disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiHeart className="text-sm" />
        </button>
      </div>
    </motion.article>
  );
}
