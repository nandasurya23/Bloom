import { act, renderHook } from "@testing-library/react";

import { useSearch } from "@/hooks/useSearch";

type Row = { name: string };

describe("useSearch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("filters case-insensitively", () => {
    const data: Row[] = [{ name: "Rose" }, { name: "Tulip" }];
    const { result } = renderHook(() => useSearch(data, (item) => item.name));

    act(() => {
      result.current.setQuery("rose");
      jest.advanceTimersByTime(300);
    });

    expect(result.current.searchedData).toEqual([{ name: "Rose" }]);
  });

  it("applies debounce before updating filtered data", () => {
    const data: Row[] = [{ name: "Rose" }, { name: "Tulip" }];
    const { result } = renderHook(() => useSearch(data, (item) => item.name));

    act(() => {
      result.current.setQuery("tu");
      jest.advanceTimersByTime(200);
    });

    expect(result.current.debouncedQuery).toBe("");
    expect(result.current.searchedData).toEqual(data);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.debouncedQuery).toBe("tu");
    expect(result.current.searchedData).toEqual([{ name: "Tulip" }]);
  });

  it("returns full data when query is empty", () => {
    const data: Row[] = [{ name: "Rose" }, { name: "Tulip" }];
    const { result } = renderHook(() => useSearch(data, (item) => item.name));

    expect(result.current.searchedData).toEqual(data);
  });
});
