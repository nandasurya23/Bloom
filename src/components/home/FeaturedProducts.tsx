"use client";

import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiHeart, FiShoppingBag, FiAward, FiTruck, FiClock } from "react-icons/fi";

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
  type: "cart" | "wishlist";
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

  const triggerNotice = (message: string, type: "cart" | "wishlist"): void => {
    const nextNotice: NoticeState = {
      id: Date.now(),
      message,
      type
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
    triggerNotice(`${product.name} added to cart`, "cart");

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
    triggerNotice(`${product.name} saved to wishlist`, "wishlist");

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
    <section className="relative mt-16 sm:mt-20 lg:mt-24">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-bloom-rose/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-bloom-leaf/5 blur-3xl" />
      </div>

      {/* Section Header */}
      <div className="relative mb-8 sm:mb-10 lg:mb-12">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block rounded-full bg-bloom-rose/10 px-3 py-1 text-xs font-medium text-bloom-rose mb-3">
                Featured Collection
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl font-semibold text-bloom-ink sm:text-3xl lg:text-4xl"
            >
              Featured Bouquets
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-2 text-sm text-bloom-ink/70 sm:text-base max-w-xl"
            >
              Handpicked favorites for gifting this week, crafted with love and premium blooms.
            </motion.p>
          </div>

          {/* Feature Badges - Desktop */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-bloom-rose/20 p-3 shadow-sm"
          >
            <div className="flex items-center gap-2 px-3 py-1.5">
              <div className="rounded-full bg-bloom-rose/10 p-1.5">
                <FiShoppingBag className="text-bloom-rose text-sm" />
              </div>
              <span className="text-sm font-medium text-bloom-ink">Fast Checkout</span>
            </div>
            <div className="w-px h-6 bg-bloom-rose/20" />
            <div className="flex items-center gap-2 px-3 py-1.5">
              <div className="rounded-full bg-bloom-rose/10 p-1.5">
                <FiHeart className="text-bloom-rose text-sm" />
              </div>
              <span className="text-sm font-medium text-bloom-ink">Save Favorites</span>
            </div>
            <div className="w-px h-6 bg-bloom-rose/20" />
            <div className="flex items-center gap-2 px-3 py-1.5">
              <div className="rounded-full bg-bloom-rose/10 p-1.5">
                <FiTruck className="text-bloom-rose text-sm" />
              </div>
              <span className="text-sm font-medium text-bloom-ink">Free Delivery</span>
            </div>
          </motion.div>
        </div>

        {/* Feature Pills - Mobile/Tablet */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 mt-4 lg:hidden"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-bloom-rose/20 px-3 py-1.5 text-xs">
            <FiShoppingBag className="text-bloom-rose" />
            Fast Checkout
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-bloom-rose/20 px-3 py-1.5 text-xs">
            <FiHeart className="text-bloom-rose" />
            Save Favorites
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-bloom-rose/20 px-3 py-1.5 text-xs">
            <FiTruck className="text-bloom-rose" />
            Free Delivery
          </span>
        </motion.div>
      </div>

      {/* Notice/Toast Notification */}
      <AnimatePresence mode="wait">
        {notice ? (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-6 relative"
          >
            <div className={`
              inline-flex items-center gap-2 rounded-full 
              ${notice.type === "cart" 
                ? "bg-gradient-to-r from-bloom-rose/10 to-bloom-ink/10 border-bloom-rose/30" 
                : "bg-gradient-to-r from-bloom-leaf/10 to-bloom-rose/10 border-bloom-leaf/30"
              } 
              border backdrop-blur-sm px-4 py-2.5 text-sm shadow-lg
            `}>
              <div className={`
                rounded-full p-1
                ${notice.type === "cart" ? "bg-bloom-rose/20" : "bg-bloom-leaf/20"}
              `}>
                {notice.type === "cart" ? (
                  <FiShoppingBag className={notice.type === "cart" ? "text-bloom-rose" : "text-bloom-leaf"} />
                ) : (
                  <FiHeart className="text-bloom-leaf" />
                )}
              </div>
              <span className="font-medium text-bloom-ink">{notice.message}</span>
              <FiCheckCircle className={notice.type === "cart" ? "text-bloom-rose" : "text-bloom-leaf"} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ProductGridSkeleton count={FEATURED_LIMIT} />
        </motion.div>
      )}

      {/* Error State */}
      {isError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl border border-bloom-rose/20 bg-white/80 backdrop-blur-sm p-8 text-center shadow-lg"
        >
          <div className="max-w-md mx-auto">
            <div className="inline-flex rounded-full bg-bloom-rose/10 p-3 mb-4">
              <FiAward className="text-3xl text-bloom-rose/60" />
            </div>
            <h3 className="text-lg font-semibold text-bloom-ink mb-2">Unable to Load Products</h3>
            <p className="text-sm text-bloom-ink/60 mb-6">
              We couldn't fetch the featured products. Please try again.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => void refetch()}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-ink px-6 py-3 text-sm font-medium text-white shadow-lg shadow-bloom-rose/30"
            >
              <FiClock />
              Try Again
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Products Grid */}
      {!isLoading && !isError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <ProductCard
                  product={product}
                  onAddToCart={triggerCartAdd}
                  onAddToWishlist={triggerWishlistAdd}
                  isCartCoolingDown={Boolean(cartCooldownMap[product.id])}
                  isWishlistCoolingDown={Boolean(wishlistCooldownMap[product.id])}
                />
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-8 sm:mt-10 lg:mt-12"
          >
            <motion.a
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium text-bloom-rose hover:text-bloom-ink transition-colors group"
            >
              <span>View All Products</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      )}

      {/* Decorative Elements */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
        <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20L40 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-bloom-rose"/>
          <path d="M80 20L100 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-bloom-rose"/>
          <circle cx="60" cy="20" r="4" fill="currentColor" className="text-bloom-rose/30"/>
        </svg>
      </div>
    </section>
  );
}