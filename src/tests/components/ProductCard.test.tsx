import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

const product: Product = {
  id: "1",
  slug: "rose",
  name: "Rose Bouquet",
  description: "Soft petals",
  category: "rose",
  price: 150000,
  stock: 10,
  imageUrl: "/rose.jpg",
  featured: false,
  tags: []
};

describe("ProductCard", () => {
  it("renders name and IDR price", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText("Rose Bouquet")).toBeInTheDocument();
    expect(screen.getByText(/Rp\s?150\.000/)).toBeInTheDocument();
  });

  it("calls add to cart action", async () => {
    const user = userEvent.setup();
    const onAddToCart = jest.fn();

    render(<ProductCard product={product} onAddToCart={onAddToCart} />);

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(onAddToCart).toHaveBeenCalledWith(product);
  });
});
