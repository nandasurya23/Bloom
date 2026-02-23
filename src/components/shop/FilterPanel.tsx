import type { ChangeEvent, JSX } from "react";

import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";

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

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="grid gap-3 rounded-xl border border-bloom-rose/50 bg-white/90 p-4 md:grid-cols-3"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-bloom-ink">
        <FiFilter /> Filter products
      </div>
      <select
        value={filters.category}
        onChange={handleCategoryChange}
        className="rounded-md border border-bloom-rose/60 px-3 py-2 text-sm text-bloom-ink"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          min={0}
          value={filters.priceRange.min}
          onChange={handleMinPrice}
          placeholder="Min"
          className="rounded-md border border-bloom-rose/60 px-3 py-2 text-sm text-bloom-ink"
        />
        <input
          type="number"
          min={0}
          value={filters.priceRange.max}
          onChange={handleMaxPrice}
          placeholder="Max"
          className="rounded-md border border-bloom-rose/60 px-3 py-2 text-sm text-bloom-ink"
        />
      </div>
    </motion.section>
  );
}
