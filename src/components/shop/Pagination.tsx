import type { JSX } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

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
  const getPageNumbers = (): (number | string)[] => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | null = null;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l !== null) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mt-8 flex flex-col items-center gap-4"
    >
      {/* Mobile Pagination */}
      <div className="flex w-full items-center justify-between gap-2 sm:hidden">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentPage === 1}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-bloom-rose/30 bg-white/80 px-4 py-2.5 text-sm font-medium text-bloom-ink shadow-sm transition-all hover:bg-bloom-rose/5 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiChevronLeft className="h-4 w-4" />
          Prev
        </button>
        
        <span className="rounded-xl bg-bloom-rose/10 px-4 py-2.5 text-sm font-medium text-bloom-rose">
          {currentPage} / {totalPages}
        </span>
        
        <button
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-bloom-rose/30 bg-white/80 px-4 py-2.5 text-sm font-medium text-bloom-ink shadow-sm transition-all hover:bg-bloom-rose/5 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <FiChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex sm:flex-col sm:items-center sm:gap-4">
        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {/* First Page Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => onGoToPage(1)}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-bloom-rose/30 bg-white/80 text-bloom-ink shadow-sm transition-all hover:border-bloom-rose/60 hover:bg-bloom-rose/5 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
            title="First page"
          >
            <FiChevronsLeft className="h-4 w-4" />
          </motion.button>

          {/* Previous Page Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onPrev}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-bloom-rose/30 bg-white/80 text-bloom-ink shadow-sm transition-all hover:border-bloom-rose/60 hover:bg-bloom-rose/5 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
            title="Previous page"
          >
            <FiChevronLeft className="h-4 w-4" />
          </motion.button>

          {/* Page Number Buttons */}
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              {getPageNumbers().map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`dots-${index}`}
                      className="flex h-10 w-10 items-center justify-center text-sm text-bloom-ink/40"
                    >
                      •••
                    </span>
                  );
                }

                const pageNumber = page as number;
                const isActive = pageNumber === currentPage;

                return (
                  <motion.button
                    key={pageNumber}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => onGoToPage(pageNumber)}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-bloom-rose text-white shadow-md shadow-bloom-rose/30"
                        : "border border-bloom-rose/30 bg-white/80 text-bloom-ink shadow-sm hover:border-bloom-rose/60 hover:bg-bloom-rose/5 hover:shadow"
                    }`}
                  >
                    {pageNumber}
                    {isActive && (
                      <motion.div
                        layoutId="activePage"
                        className="absolute inset-0 rounded-xl bg-bloom-rose -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Next Page Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onNext}
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-bloom-rose/30 bg-white/80 text-bloom-ink shadow-sm transition-all hover:border-bloom-rose/60 hover:bg-bloom-rose/5 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
            title="Next page"
          >
            <FiChevronRight className="h-4 w-4" />
          </motion.button>

          {/* Last Page Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => onGoToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-bloom-rose/30 bg-white/80 text-bloom-ink shadow-sm transition-all hover:border-bloom-rose/60 hover:bg-bloom-rose/5 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
            title="Last page"
          >
            <FiChevronsRight className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Page Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-bloom-ink/60"
        >
          Showing page <span className="font-medium text-bloom-rose">{currentPage}</span> of{" "}
          <span className="font-medium text-bloom-ink">{totalPages}</span>
        </motion.div>
      </div>
    </motion.nav>
  );
}