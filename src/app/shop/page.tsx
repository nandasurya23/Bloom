"use client";

import dynamic from "next/dynamic";
import Script from "next/script";
import type { JSX } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { 
  FiAlertCircle, 
  FiRefreshCw, 
  FiFilter, 
  FiGrid, 
  FiList,
  FiChevronDown,
  FiInfo
} from "react-icons/fi";

import { FilterPanelSkeleton } from "@/components/shop/FilterPanelSkeleton";
import { PaginationSkeleton } from "@/components/shop/PaginationSkeleton";
import { ProductGridSkeleton } from "@/components/shop/ProductGridSkeleton";
import { SearchBar } from "@/components/shop/SearchBar";
import { usePagination } from "@/hooks/usePagination";
import { useSearch } from "@/hooks/useSearch";
import { fetchProducts } from "@/lib/api/productsApi";
import { buildShopCollectionJsonLd } from "@/lib/schema";
import { applyProductFilters } from "@/services/filterService";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import type { Product, ProductCategory } from "@/types/product";
import type { ProductFilters } from "@/types/query";

const ITEMS_PER_PAGE = 6;
const SKELETON_DELAY_MS = 260;
const PRODUCT_ACTION_COOLDOWN_MS = 1500;

const ProductCard = dynamic(
  () => import("@/components/product/ProductCard").then((module) => module.ProductCard),
  {
    loading: () => <ProductGridSkeleton count={3} />
  }
);

const FilterPanel = dynamic(
  () => import("@/components/shop/FilterPanel").then((module) => module.FilterPanel),
  {
    loading: () => <FilterPanelSkeleton />
  }
);

const Pagination = dynamic(
  () => import("@/components/shop/Pagination").then((module) => module.Pagination),
  {
    loading: () => <PaginationSkeleton />
  }
);

const INITIAL_FILTERS: ProductFilters = {
  category: "all",
  priceRange: {
    min: 0,
    max: 1_000_000
  }
};

export default function ShopPage(): JSX.Element {
  const [filters, setFilters] = useState<ProductFilters>(INITIAL_FILTERS);
  const [isGridLoading, setIsGridLoading] = useState<boolean>(true);
  const [cartCooldownMap, setCartCooldownMap] = useState<Record<string, boolean>>({});
  const [wishlistCooldownMap, setWishlistCooldownMap] = useState<Record<string, boolean>>({});
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const addItemToCart = useCartStore((state) => state.addItem);
  const addItemToWishlist = useWishlistStore((state) => state.addItem);
  const cartCooldownTimeoutsRef = useRef<Record<string, number>>({});
  const wishlistCooldownTimeoutsRef = useRef<Record<string, number>>({});

  const {
    data: rawProducts = [],
    isLoading: isProductsLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15
  });

  const shopJsonLd = useMemo(() => buildShopCollectionJsonLd(rawProducts), [rawProducts]);

  const filteredProducts = useMemo(() => {
    return applyProductFilters(rawProducts, filters);
  }, [rawProducts, filters]);

  const { query, setQuery, debouncedQuery, searchedData } = useSearch(
    filteredProducts,
    (product) => `${product.name} ${product.description} ${product.category}`
  );

  const { paginatedData, totalPages, currentPage, next, prev, goToPage } = usePagination(
    searchedData,
    ITEMS_PER_PAGE
  );

  const categories = useMemo<(ProductCategory | "all")[]>(() => {
    const uniqueCategories = new Set<ProductCategory>(rawProducts.map((product) => product.category));
    return ["all", ...Array.from(uniqueCategories)];
  }, [rawProducts]);

  useEffect(() => {
    setIsGridLoading(true);

    const timeoutId = window.setTimeout(() => {
      setIsGridLoading(false);
    }, SKELETON_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [filters, debouncedQuery, currentPage]);

  useEffect(() => {
    const cartTimeouts = cartCooldownTimeoutsRef.current;
    const wishlistTimeouts = wishlistCooldownTimeoutsRef.current;

    return () => {
      Object.values(cartTimeouts).forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      Object.values(wishlistTimeouts).forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  const triggerCartAdd = (product: Product): void => {
    if (cartCooldownMap[product.id]) {
      return;
    }

    addItemToCart(product);
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

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== "all") count++;
    if (filters.priceRange.min > 0) count++;
    if (filters.priceRange.max < 1000000) count++;
    return count;
  }, [filters]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-bloom-rose/5">
      <Script
        id="shop-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />
      
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Hero Header */}
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8 text-center sm:text-left"
        >
          <h1 className="text-4xl font-light tracking-tight text-bloom-ink sm:text-5xl">
            Flower <span className="font-semibold text-bloom-rose">Collection</span>
          </h1>
          <p className="mt-3 text-base text-bloom-ink/60 max-w-2xl mx-auto sm:mx-0">
            Curated blooms for modern gifting moments. Fresh, beautiful, and delivered with love.
          </p>
        </motion.section>

        {/* Search and Actions Bar */}
        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 max-w-xl">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          
          <div className="flex items-center gap-2">
            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="flex items-center gap-2 rounded-full border border-bloom-rose/30 bg-white/80 px-4 py-2.5 text-sm font-medium text-bloom-ink shadow-sm transition-all hover:border-bloom-rose hover:bg-white hover:shadow-md lg:hidden"
            >
              <FiFilter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 rounded-full bg-bloom-rose px-2 py-0.5 text-xs text-white">
                  {activeFilterCount}
                </span>
              )}
              <FiChevronDown className={`h-4 w-4 transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`} />
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 rounded-full border border-bloom-rose/30 bg-white/80 p-1 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-full p-2 transition-all ${
                  viewMode === "grid" 
                    ? 'bg-bloom-rose text-white' 
                    : 'text-bloom-ink/40 hover:text-bloom-rose'
                }`}
                aria-label="Grid view"
              >
                <FiGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-full p-2 transition-all ${
                  viewMode === "list" 
                    ? 'bg-bloom-rose text-white' 
                    : 'text-bloom-ink/40 hover:text-bloom-rose'
                }`}
                aria-label="List view"
              >
                <FiList className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Filter Panel - Desktop always visible, Mobile collapsible */}
        <section className="relative">
          <AnimatePresence mode="wait">
            {(isFilterExpanded || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden lg:overflow-visible"
              >
                <FilterPanel
                  categories={categories}
                  filters={filters}
                  onCategoryChange={(category) =>
                    setFilters((previous) => ({
                      ...previous,
                      category
                    }))
                  }
                  onMinPriceChange={(value) =>
                    setFilters((previous) => ({
                      ...previous,
                      priceRange: {
                        ...previous.priceRange,
                        min: value
                      }
                    }))
                  }
                  onMaxPriceChange={(value) =>
                    setFilters((previous) => ({
                      ...previous,
                      priceRange: {
                        ...previous.priceRange,
                        max: value
                      }
                    }))
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Results Info Bar */}
        <section className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-bloom-ink/60">
            <FiInfo className="h-4 w-4" />
            <span>
              Showing <span className="font-medium text-bloom-ink">{paginatedData.length}</span> of{" "}
              <span className="font-medium text-bloom-ink">{searchedData.length}</span> products
            </span>
          </div>
          
          {searchedData.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-bloom-ink/40">
              <span>Sort by: </span>
              <select className="rounded-full border border-bloom-rose/30 bg-white/80 px-3 py-1.5 text-sm text-bloom-ink outline-none">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          )}
        </section>

        {/* Error State */}
        {isError ? (
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 overflow-hidden rounded-2xl border border-red-200 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm"
          >
            <div className="mx-auto flex max-w-md flex-col items-center">
              <div className="rounded-full bg-red-100 p-4">
                <FiAlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <p className="mt-4 text-lg font-medium text-red-600">Failed to load products</p>
              <p className="mt-2 text-sm text-bloom-ink/60">
                We couldn't load the products. Please try again.
              </p>
              <button
                type="button"
                onClick={() => {
                  void refetch();
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-bloom-rose px-6 py-3 text-sm font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all hover:bg-bloom-rose/90 hover:shadow-xl"
              >
                <FiRefreshCw className="h-4 w-4" />
                Try again
              </button>
            </div>
          </motion.section>
        ) : null}

        {/* Products Grid/List */}
        {isProductsLoading || isGridLoading ? (
          <ProductGridSkeleton count={ITEMS_PER_PAGE} variant={viewMode === "list" ? "detailed" : "default"} />
        ) : (
          <>
            {paginatedData.length === 0 ? (
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-3xl border border-bloom-rose/20 bg-white/80 p-12 text-center shadow-xl backdrop-blur-sm"
              >
                <div className="mx-auto flex max-w-md flex-col items-center">
                  <div className="rounded-full bg-bloom-rose/10 p-6">
                    <FiFilter className="h-12 w-12 text-bloom-rose/40" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-bloom-ink">No products found</h2>
                  <p className="mt-2 text-bloom-ink/60">
                    Try adjusting your filters or search query to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setFilters(INITIAL_FILTERS);
                      setQuery("");
                    }}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-bloom-rose px-8 py-3 text-sm font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all hover:bg-bloom-rose/90 hover:shadow-xl"
                  >
                    <FiRefreshCw className="h-4 w-4" />
                    Clear all filters
                  </button>
                </div>
              </motion.section>
            ) : (
              <>
                <motion.section 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.05 }}
                  className={`mt-6 grid gap-6 ${
                    viewMode === "grid" 
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                      : "grid-cols-1"
                  }`}
                >
                  {paginatedData.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
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
                </motion.section>

                {/* Active Filters Summary */}
                {activeFilterCount > 0 && (
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-bloom-ink/40">Active filters:</span>
                    {filters.category !== "all" && (
                      <span className="rounded-full bg-bloom-rose/10 px-3 py-1 text-xs font-medium text-bloom-rose">
                        Category: {filters.category}
                      </span>
                    )}
                    {(filters.priceRange.min > 0 || filters.priceRange.max < 1000000) && (
                      <span className="rounded-full bg-bloom-rose/10 px-3 py-1 text-xs font-medium text-bloom-rose">
                        Price: {filters.priceRange.min > 0 ? `Rp${filters.priceRange.min.toLocaleString()}` : "0"} - {filters.priceRange.max < 1000000 ? `Rp${filters.priceRange.max.toLocaleString()}` : "1M+"}
                      </span>
                    )}
                    <button
                      onClick={() => setFilters(INITIAL_FILTERS)}
                      className="text-xs text-bloom-ink/30 hover:text-bloom-rose transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={next}
              onPrev={prev}
              onGoToPage={goToPage}
            />
          </div>
        )}

        {/* Shop Info Footer */}
        <footer className="mt-16 border-t border-bloom-rose/10 pt-8">
          <div className="grid gap-6 text-center text-sm text-bloom-ink/40 sm:grid-cols-3">
            <div>
              <p className="font-medium text-bloom-ink">🌿 Fresh Flowers</p>
              <p className="mt-1">Direct from local farms</p>
            </div>
            <div>
              <p className="font-medium text-bloom-ink">🚚 Free Delivery</p>
              <p className="mt-1">On orders over Rp500.000</p>
            </div>
            <div>
              <p className="font-medium text-bloom-ink">💝 Satisfaction</p>
              <p className="mt-1">100% happiness guaranteed</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}