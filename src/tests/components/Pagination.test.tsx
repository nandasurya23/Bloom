import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { Pagination } from "@/components/shop/Pagination";

function PaginationHarness() {
  const [page, setPage] = React.useState<number>(1);

  return (
    <Pagination
      currentPage={page}
      totalPages={3}
      onNext={() => setPage((previous) => Math.min(previous + 1, 3))}
      onPrev={() => setPage((previous) => Math.max(previous - 1, 1))}
      onGoToPage={setPage}
    />
  );
}

describe("Pagination", () => {
  it("renders current and total page", () => {
    render(
      <Pagination currentPage={1} totalPages={3} onNext={jest.fn()} onPrev={jest.fn()} onGoToPage={jest.fn()} />
    );

    expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument();
  });

  it("clicking next updates page", async () => {
    const user = userEvent.setup();
    render(<PaginationHarness />);

    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByText(/page 2 of 3/i)).toBeInTheDocument();
  });
});
