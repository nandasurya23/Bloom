import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchBar } from "@/components/shop/SearchBar";
import { useSearch } from "@/hooks/useSearch";

type Row = { name: string };

function SearchHarness() {
  const data: Row[] = [{ name: "Rose" }, { name: "Tulip" }];
  const { query, setQuery, debouncedQuery, searchedData } = useSearch(data, (item) => item.name);

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} />
      <p data-testid="debounced">{debouncedQuery}</p>
      <p data-testid="count">{searchedData.length}</p>
    </div>
  );
}

describe("SearchBar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("updates search state when typing", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SearchHarness />);

    await user.type(screen.getByPlaceholderText(/search flowers/i), "ro");

    expect(screen.getByDisplayValue("ro")).toBeInTheDocument();
  });

  it("applies debounce before filtered result changes", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SearchHarness />);

    await user.type(screen.getByPlaceholderText(/search flowers/i), "tu");

    expect(screen.getByTestId("debounced")).toHaveTextContent("");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.getByTestId("debounced")).toHaveTextContent("tu");
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });
});
