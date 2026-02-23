"use client";

import dynamic from "next/dynamic";
import Script from "next/script";
import type { JSX } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

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

const ITEMS_PER_PAGE = 3;
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

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <Script
        id="shop-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-semibold tracking-tight text-bloom-ink">Flower Collection</h1>
        <p className="mt-2 text-sm text-bloom-ink/70">Curated blooms for modern gifting moments.</p>
      </motion.section>

      <section className="mt-6">
        <SearchBar value={query} onChange={setQuery} />
      </section>

      {isError ? (
        <section className="mt-4 rounded-xl border border-red-200 bg-white p-5">
          <p className="flex items-center gap-2 text-sm text-red-600">
            <FiAlertCircle /> Failed to load products.
          </p>
          <button
            type="button"
            onClick={() => {
              void refetch();
            }}
            className="mt-3 inline-flex items-center gap-2 rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
          >
            <FiRefreshCw /> Try again
          </button>
        </section>
      ) : null}

      <section className="mt-4">
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
      </section>

      {isProductsLoading || isGridLoading ? (
        <ProductGridSkeleton count={ITEMS_PER_PAGE} />
      ) : (
        <>
          {paginatedData.length === 0 ? (
            <section className="mt-6 rounded-2xl border border-bloom-rose/40 bg-white p-10 text-center">
              <p className="text-sm text-bloom-ink/70">No products matched your filters.</p>
            </section>
          ) : (
            <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedData.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={triggerCartAdd}
                  onAddToWishlist={triggerWishlistAdd}
                  isCartCoolingDown={Boolean(cartCooldownMap[product.id])}
                  isWishlistCoolingDown={Boolean(wishlistCooldownMap[product.id])}
                />
              ))}
            </section>
          )}
        </>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={next}
        onPrev={prev}
        onGoToPage={goToPage}
      />
    </main>
  );
}
