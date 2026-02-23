import { useCartStore } from "@/store/useCartStore";
import type { CartProductPayload } from "@/types/cart";

const product: CartProductPayload = {
  id: "p-1",
  name: "Rose Bouquet",
  imageUrl: "/rose.jpg",
  price: 150000
};

describe("useCartStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({
      items: [],
      subtotal: 0,
      shippingCost: 0,
      discountAmount: 0,
      total: 0
    });
  });

  it("adds item", () => {
    useCartStore.getState().addItem(product);

    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it("removes item", () => {
    useCartStore.getState().addItem(product);
    useCartStore.getState().removeItem(product.id);

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("increments quantity", () => {
    useCartStore.getState().addItem(product);
    useCartStore.getState().incrementItem(product.id);

    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it("decrements quantity", () => {
    useCartStore.getState().addItem(product, 2);
    useCartStore.getState().decrementItem(product.id);

    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it("calculates subtotal and total", () => {
    useCartStore.getState().addItem(product, 2);

    expect(useCartStore.getState().subtotal).toBe(300000);
    expect(useCartStore.getState().total).toBe(300000);
  });

  it("persists to localStorage", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    useCartStore.getState().addItem(product);

    expect(setItemSpy).toHaveBeenCalled();
  });
});
