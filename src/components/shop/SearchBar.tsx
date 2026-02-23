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
    <motion.label
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-2 rounded-lg border border-bloom-rose/60 bg-white px-3 py-2"
    >
      <FiSearch className="text-bloom-ink/70" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search flowers"
        className="w-full bg-transparent text-sm text-bloom-ink outline-none placeholder:text-bloom-ink/50"
      />
    </motion.label>
  );
}
