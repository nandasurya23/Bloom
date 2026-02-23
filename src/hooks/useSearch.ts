import { useEffect, useMemo, useState } from "react";

type UseSearchResult<T> = {
  query: string;
  setQuery: (value: string) => void;
  debouncedQuery: string;
  searchedData: T[];
  resetQuery: () => void;
};

export function useSearch<T>(
  data: T[],
  searchKey: (item: T) => string,
  delay = 300
): UseSearchResult<T> {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query, delay]);

  const searchedData = useMemo<T[]>(() => {
    if (!debouncedQuery) {
      return data;
    }

    return data.filter((item) => {
      const value = searchKey(item).toLowerCase();
      return value.includes(debouncedQuery);
    });
  }, [data, debouncedQuery, searchKey]);

  const resetQuery = (): void => {
    setQuery("");
    setDebouncedQuery("");
  };

  return {
    query,
    setQuery,
    debouncedQuery,
    searchedData,
    resetQuery
  };
}
