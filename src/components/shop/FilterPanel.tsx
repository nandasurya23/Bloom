import type { ChangeEvent, JSX } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";

import type { ProductCategory } from "@/types/product";
import type { ProductFilters } from "@/types/query";

type FilterPanelProps = {
  categories: Array<ProductCategory | "all">;
  filters: ProductFilters;
  onCategoryChange: (category: ProductCategory | "all") => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
};

export function FilterPanel({
  categories,
  filters,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange
}: FilterPanelProps): JSX.Element {
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    onCategoryChange(event.target.value as ProductCategory | "all");
  };

  const handleMinPrice = (event: ChangeEvent<HTMLInputElement>): void => {
    onMinPriceChange(Number(event.target.value));
  };

  const handleMaxPrice = (event: ChangeEvent<HTMLInputElement>): void => {
    onMaxPriceChange(Number(event.target.value));
  };

  const clearFilters = (): void => {
    onCategoryChange("all");
    onMinPriceChange(0);
    onMaxPriceChange(0);
  };

  const hasActiveFilters = filters.category !== "all" || filters.priceRange.min > 0 || filters.priceRange.max > 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-4 z-10 mx-auto w-full max-w-7xl"
    >
      <div className="rounded-2xl border border-bloom-rose/30 bg-white/95 p-5 shadow-lg backdrop-blur-sm">
        {/* Header Filter */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-bloom-rose/10 p-2">
              <FiFilter className="h-4 w-4 text-bloom-rose" />
            </div>
            <h3 className="font-semibold text-bloom-ink">Filter Products</h3>
          </div>
          
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={clearFilters}
                className="flex items-center gap-1 rounded-full bg-bloom-rose/10 px-3 py-1.5 text-xs font-medium text-bloom-rose transition-colors hover:bg-bloom-rose/20"
              >
                <FiX className="h-3 w-3" />
                Clear filters
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Filter Controls */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Category Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-bloom-ink/70">
              Category
            </label>
            <div className="relative">
              <select
                value={filters.category}
                onChange={handleCategoryChange}
                className="w-full appearance-none rounded-xl border border-bloom-rose/30 bg-white/80 px-4 py-2.5 text-sm text-bloom-ink transition-all focus:border-bloom-rose focus:outline-none focus:ring-2 focus:ring-bloom-rose/20"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bloom-rose/60" />
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-1.5 lg:col-span-2">
            <label className="text-xs font-medium text-bloom-ink/70">
              Price Range (Rp)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  value={filters.priceRange.min}
                  onChange={handleMinPrice}
                  placeholder="Min"
                  className="w-full rounded-xl border border-bloom-rose/30 bg-white/80 px-4 py-2.5 text-sm text-bloom-ink transition-all placeholder:text-bloom-ink/40 focus:border-bloom-rose focus:outline-none focus:ring-2 focus:ring-bloom-rose/20"
                />
                {filters.priceRange.min > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-bloom-rose/60">
                    Min
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  value={filters.priceRange.max}
                  onChange={handleMaxPrice}
                  placeholder="Max"
                  className="w-full rounded-xl border border-bloom-rose/30 bg-white/80 px-4 py-2.5 text-sm text-bloom-ink transition-all placeholder:text-bloom-ink/40 focus:border-bloom-rose focus:outline-none focus:ring-2 focus:ring-bloom-rose/20"
                />
                {filters.priceRange.max > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-bloom-rose/60">
                    Max
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Indicator */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 flex flex-wrap items-center gap-2 border-t border-bloom-rose/20 pt-4"
            >
              <span className="text-xs text-bloom-ink/60">Active filters:</span>
              {filters.category !== "all" && (
                <span className="rounded-full bg-bloom-rose/10 px-3 py-1 text-xs font-medium text-bloom-rose">
                  Category: {filters.category}
                </span>
              )}
              {(filters.priceRange.min > 0 || filters.priceRange.max > 0) && (
                <span className="rounded-full bg-bloom-rose/10 px-3 py-1 text-xs font-medium text-bloom-rose">
                  Price: {filters.priceRange.min > 0 ? `Rp${filters.priceRange.min.toLocaleString()}` : "0"} - {filters.priceRange.max > 0 ? `Rp${filters.priceRange.max.toLocaleString()}` : "∞"}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}