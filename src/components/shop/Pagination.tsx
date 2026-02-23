import type { JSX } from "react";

import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onGoToPage: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onGoToPage
}: PaginationProps): JSX.Element {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mt-8 flex items-center justify-center gap-3"
    >
      <button
        type="button"
        onClick={onPrev}
        disabled={currentPage === 1}
        className="inline-flex items-center gap-1 rounded-md border border-bloom-rose/60 px-3 py-2 text-sm disabled:opacity-50"
      >
        <FiChevronLeft /> Prev
      </button>
      <span className="text-sm text-bloom-ink/80">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="inline-flex items-center gap-1 rounded-md border border-bloom-rose/60 px-3 py-2 text-sm disabled:opacity-50"
      >
        Next <FiChevronRight />
      </button>
      <button
        type="button"
        onClick={() => onGoToPage(1)}
        className="rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
      >
        First
      </button>
    </motion.nav>
  );
}
