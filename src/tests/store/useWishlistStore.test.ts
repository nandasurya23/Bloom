import { useWishlistStore } from "@/store/useWishlistStore";
import type { WishlistProductPayload } from "@/types/wishlist";

const product: WishlistProductPayload = {
  id: "p-1",
  name: "Rose Bouquet",
  imageUrl: "/rose.jpg",
  price: 150000
};

describe("useWishlistStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useWishlistStore.setState({
      items: []
    });
  });

  it("adds item", () => {
    useWishlistStore.getState().addItem(product);

    expect(useWishlistStore.getState().items).toHaveLength(1);
  });

  it("removes item", () => {
    useWishlistStore.getState().addItem(product);
    useWishlistStore.getState().removeItem(product.id);

    expect(useWishlistStore.getState().items).toHaveLength(0);
  });
});
