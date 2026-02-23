import { act, renderHook } from "@testing-library/react";

import { usePagination } from "@/hooks/usePagination";

describe("usePagination", () => {
  it("calculates total pages correctly", () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    expect(result.current.totalPages).toBe(3);
  });

  it("returns the correct sliced data", () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4], 2));

    expect(result.current.paginatedData).toEqual([1, 2]);
  });

  it("moves to next page", () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4], 2));

    act(() => {
      result.current.next();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedData).toEqual([3, 4]);
  });

  it("moves to previous page", () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4], 2));

    act(() => {
      result.current.goToPage(2);
      result.current.prev();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it("goes to selected page and clamps invalid values", () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4], 2));

    act(() => {
      result.current.goToPage(2);
    });

    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.goToPage(999);
    });

    expect(result.current.currentPage).toBe(2);
  });

  it("resets page when data changes", () => {
    const { result, rerender } = renderHook(
      ({ data }) => usePagination(data, 2),
      {
        initialProps: { data: [1, 2, 3, 4] }
      }
    );

    act(() => {
      result.current.goToPage(2);
    });

    expect(result.current.currentPage).toBe(2);

    act(() => {
      rerender({ data: [10, 20] });
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginatedData).toEqual([10, 20]);
  });
});
