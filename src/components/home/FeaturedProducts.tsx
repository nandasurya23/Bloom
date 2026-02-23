"use client";

import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { 
  FiCheckCircle, 
  FiHeart, 
  FiShoppingBag, 
  FiAward, 
  FiTruck, 
  FiClock,
  FiArrowRight,
  FiStar,
  FiTrendingUp
} from "react-icons/fi";

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
  const [activeTab, setActiveTab] = useState<"featured" | "popular" | "new">("featured");

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
    <section className="relative mt-16 sm:mt-20 lg:mt-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,208,197,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(180,210,170,0.1)_0%,transparent_50%)]" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-32 h-32 rounded-full bg-bloom-rose/5 blur-2xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-bloom-leaf/5 blur-2xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-bloom-rose/10 to-bloom-leaf/10 px-4 py-2 rounded-full border border-bloom-rose/20 mb-4"
          >
            <FiStar className="text-bloom-rose" />
            <span className="text-sm font-medium text-bloom-ink/70">Handpicked for You</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-bloom-ink mb-4"
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-bloom-rose to-bloom-leaf bg-clip-text text-transparent">
              Bouquets
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-bloom-ink/60 max-w-2xl mx-auto"
          >
            Handpicked favorites for gifting this week, crafted with love and premium blooms
          </motion.p>
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-2 mb-8"
        >
          {[
            { id: "featured", label: "Featured", icon: FiStar },
            { id: "popular", label: "Popular", icon: FiTrendingUp },
            { id: "new", label: "New Arrivals", icon: FiClock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeTab === tab.id 
                  ? "bg-gradient-to-r from-bloom-rose to-bloom-leaf text-white shadow-lg shadow-bloom-rose/30" 
                  : "bg-white/80 text-bloom-ink/60 hover:text-bloom-rose border border-bloom-rose/20"
                }
              `}
            >
              <tab.icon className={activeTab === tab.id ? "text-white" : ""} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Notice/Toast Notification */}
        <AnimatePresence mode="wait">
          {notice && (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: -20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -20, x: "-50%" }}
              transition={{ duration: 0.2 }}
              className="fixed top-24 left-1/2 z-50"
            >
              <div className={`
                flex items-center gap-3 rounded-full px-4 py-2 shadow-xl
                ${notice.type === "cart" 
                  ? "bg-gradient-to-r from-bloom-rose to-bloom-ink text-white" 
                  : "bg-gradient-to-r from-bloom-leaf to-bloom-rose text-white"
                }
              `}>
                {notice.type === "cart" ? <FiShoppingBag /> : <FiHeart />}
                <span className="text-sm font-medium">{notice.message}</span>
                <FiCheckCircle />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mb-10 p-4 bg-white/50 rounded-2xl border border-bloom-rose/10"
        >
          {[
            { icon: FiShoppingBag, label: "Fast Checkout", color: "rose" },
            { icon: FiHeart, label: "Save Favorites", color: "leaf" },
            { icon: FiTruck, label: "Free Delivery", color: "rose" },
            { icon: FiClock, label: "Same Day", color: "leaf" }
          ].map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full bg-bloom-${stat.color}/10`}>
                <stat.icon className={`text-bloom-${stat.color}`} />
              </div>
              <span className="text-sm font-medium text-bloom-ink/70">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Products Grid */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProductGridSkeleton count={FEATURED_LIMIT} />
          </motion.div>
        )}

        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-bloom-rose/20 bg-white/80 backdrop-blur-sm p-12 text-center shadow-lg"
          >
            <div className="max-w-md mx-auto">
              <div className="inline-flex rounded-full bg-bloom-rose/10 p-4 mb-4">
                <FiAward className="text-4xl text-bloom-rose/60" />
              </div>
              <h3 className="text-xl font-semibold text-bloom-ink mb-2">Unable to Load Products</h3>
              <p className="text-bloom-ink/60 mb-6">
                We couldn't fetch the featured products. Please try again.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => void refetch()}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-leaf px-6 py-3 text-sm font-medium text-white shadow-lg"
              >
                <FiClock />
                Try Again
              </motion.button>
            </div>
          </motion.div>
        )}

        {!isLoading && !isError && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  {/* Product Badge */}
                  {index === 0 && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-bloom-rose to-bloom-leaf rounded-full blur-md opacity-50" />
                        <div className="relative bg-gradient-to-r from-bloom-rose to-bloom-leaf text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <FiStar className="text-xs" />
                          BESTSELLER
                        </div>
                      </div>
                    </div>
                  )}

                  <ProductCard
                    product={product}
                    onAddToCart={triggerCartAdd}
                    onAddToWishlist={triggerWishlistAdd}
                    isCartCoolingDown={Boolean(cartCooldownMap[product.id])}
                    isWishlistCoolingDown={Boolean(wishlistCooldownMap[product.id])}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* View All & Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-gradient-to-r from-bloom-rose/5 to-bloom-leaf/5 rounded-2xl border border-bloom-rose/10"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-leaf flex items-center justify-center text-white text-xs border-2 border-white">
                      <FiHeart />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-bloom-ink/70">
                  <span className="font-semibold text-bloom-ink">2,500+</span> happy customers this week
                </p>
              </div>

              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                href="/shop"
                className="group inline-flex items-center gap-2 text-sm font-medium text-bloom-rose hover:text-bloom-leaf transition-colors"
              >
                <span>View All Products</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block"
                >
                  <FiArrowRight />
                </motion.span>
              </motion.a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}