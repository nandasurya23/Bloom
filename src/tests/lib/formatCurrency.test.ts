import { formatCurrency } from "@/lib/formatCurrency";

describe("formatCurrency", () => {
  it("returns IDR format", () => {
    const value = formatCurrency(150000).replace(/\s/g, " ");

    expect(value).toBe("Rp 150.000");
  });
});
