import type { ChangeEvent, JSX } from "react";

import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps): JSX.Element {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-full max-w-md"
    >
      <div className="relative">
        {/* Search Input */}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search flowers..."
          className="w-full rounded-full border border-bloom-rose/30 bg-white/90 px-12 py-3 text-sm text-bloom-ink shadow-sm outline-none transition-all placeholder:text-bloom-ink/40 focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20"
        />

        {/* Search Icon - Left */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <FiSearch className="h-4 w-4 text-bloom-ink/40" />
        </div>

        {/* Search Hint - Right (optional) */}
        {!value && (
          <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 text-xs text-bloom-ink/30 sm:block">
            ↵
          </div>
        )}
      </div>

      {/* Search Result Hint (only when typing) */}
      {value && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-5 left-4 text-xs text-bloom-ink/40"
        >
          Searching for: "{value}"
        </motion.div>
      )}
    </motion.div>
  );
}