"use client";

import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiHeart, FiShoppingBag } from "react-icons/fi";

import { ProductCard } from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/shop/ProductGridSkeleton";
import { fetchProducts } from "@/lib/api/productsApi";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import type { Product } from "@/types/product";

const FEATURED_LIMIT = 3;
const PRODUCT_ACTION_COOLDOWN_MS = 1500;
const NOTICE_TIMEOUT_MS = 1300;

type NoticeState = {
  id: number;
  message: string;
};

export function FeaturedProducts(): JSX.Element {
  const [cartCooldownMap, setCartCooldownMap] = useState<Record<string, boolean>>({});
  const [wishlistCooldownMap, setWishlistCooldownMap] = useState<Record<string, boolean>>({});
  const [notice, setNotice] = useState<NoticeState | null>(null);

  const addItemToCart = useCartStore((state) => state.addItem);
  const addItemToWishlist = useWishlistStore((state) => state.addItem);

  const cartCooldownTimeoutsRef = useRef<Record<string, number>>({});
  const wishlistCooldownTimeoutsRef = useRef<Record<string, number>>({});
  const noticeTimeoutRef = useRef<number | null>(null);

  const {
    data: products = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15
  });

  useEffect(() => {
    const cartTimeouts = cartCooldownTimeoutsRef.current;
    const wishlistTimeouts = wishlistCooldownTimeoutsRef.current;
    const currentNoticeTimeout = noticeTimeoutRef.current;

    return () => {
      Object.values(cartTimeouts).forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      Object.values(wishlistTimeouts).forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      if (currentNoticeTimeout) {
        window.clearTimeout(currentNoticeTimeout);
      }
    };
  }, []);

  const featuredProducts = products.filter((product) => product.featured).slice(0, FEATURED_LIMIT);

  const triggerNotice = (message: string): void => {
    const nextNotice: NoticeState = {
      id: Date.now(),
      message
    };

    setNotice(nextNotice);

    if (noticeTimeoutRef.current) {
      window.clearTimeout(noticeTimeoutRef.current);
    }

    noticeTimeoutRef.current = window.setTimeout(() => {
      setNotice(null);
      noticeTimeoutRef.current = null;
    }, NOTICE_TIMEOUT_MS);
  };

  const triggerCartAdd = (product: Product): void => {
    if (cartCooldownMap[product.id]) {
      return;
    }

    addItemToCart(product);
    triggerNotice(`${product.name} added to cart`);

    setCartCooldownMap((previous) => ({
      ...previous,
      [product.id]: true
    }));

    const timeoutId = window.setTimeout(() => {
      setCartCooldownMap((previous) => ({
        ...previous,
        [product.id]: false
      }));
      delete cartCooldownTimeoutsRef.current[product.id];
    }, PRODUCT_ACTION_COOLDOWN_MS);

    cartCooldownTimeoutsRef.current[product.id] = timeoutId;
  };

  const triggerWishlistAdd = (product: Product): void => {
    if (wishlistCooldownMap[product.id]) {
      return;
    }

    addItemToWishlist(product);
    triggerNotice(`${product.name} saved to wishlist`);

    setWishlistCooldownMap((previous) => ({
      ...previous,
      [product.id]: true
    }));

    const timeoutId = window.setTimeout(() => {
      setWishlistCooldownMap((previous) => ({
        ...previous,
        [product.id]: false
      }));
      delete wishlistCooldownTimeoutsRef.current[product.id];
    }, PRODUCT_ACTION_COOLDOWN_MS);

    wishlistCooldownTimeoutsRef.current[product.id] = timeoutId;
  };

  return (
    <section className="relative mt-14">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-bloom-ink sm:text-3xl">Featured Bouquets</h2>
          <p className="mt-1 text-sm text-bloom-ink/70">Handpicked favorites for gifting this week.</p>
        </div>
        <div className="hidden items-center gap-2 text-sm text-bloom-ink/70 sm:flex">
          <FiShoppingBag />
          <span>Fast checkout</span>
          <FiHeart className="ml-3" />
          <span>Save favorites</span>
        </div>
      </div>

      <AnimatePresence>
        {notice ? (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-bloom-rose/60 bg-white px-4 py-2 text-xs text-bloom-ink"
          >
            <FiCheckCircle className="text-bloom-leaf" />
            <span>{notice.message}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {isLoading ? <ProductGridSkeleton count={FEATURED_LIMIT} /> : null}

      {isError ? (
        <div className="rounded-2xl border border-bloom-rose/40 bg-white p-6">
          <p className="text-sm text-bloom-ink/70">Could not load featured products.</p>
          <button
            type="button"
            onClick={() => {
              void refetch();
            }}
            className="mt-3 rounded-full border border-bloom-rose/60 px-4 py-2 text-sm"
          >
            Try Again
          </button>
        </div>
      ) : null}

      {!isLoading && !isError ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={triggerCartAdd}
              onAddToWishlist={triggerWishlistAdd}
              isCartCoolingDown={Boolean(cartCooldownMap[product.id])}
              isWishlistCoolingDown={Boolean(wishlistCooldownMap[product.id])}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
