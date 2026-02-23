import { useEffect, useMemo, useState } from "react";

type UsePaginationResult<T> = {
  paginatedData: T[];
  totalPages: number;
  currentPage: number;
  next: () => void;
  prev: () => void;
  goToPage: (page: number) => void;
};

export function usePagination<T>(data: T[], itemsPerPage: number): UsePaginationResult<T> {
  const safeItemsPerPage = Math.max(1, itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = useMemo<number>(() => {
    const pages = Math.ceil(data.length / safeItemsPerPage);
    return Math.max(1, pages);
  }, [data.length, safeItemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  useEffect(() => {
    setCurrentPage((previousPage) => Math.min(previousPage, totalPages));
  }, [totalPages]);

  const paginatedData = useMemo<T[]>(() => {
    const startIndex = (currentPage - 1) * safeItemsPerPage;
    const endIndex = startIndex + safeItemsPerPage;

    return data.slice(startIndex, endIndex);
  }, [currentPage, data, safeItemsPerPage]);

  const goToPage = (page: number): void => {
    const boundedPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(boundedPage);
  };

  const next = (): void => {
    setCurrentPage((previousPage) => Math.min(previousPage + 1, totalPages));
  };

  const prev = (): void => {
    setCurrentPage((previousPage) => Math.max(previousPage - 1, 1));
  };

  return {
    paginatedData,
    totalPages,
    currentPage,
    next,
    prev,
    goToPage
  };
}
