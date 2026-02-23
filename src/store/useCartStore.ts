import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CartItem, CartProductPayload, CartSummary } from "@/types/cart";

type CartStoreState = CartSummary;

type CartStoreActions = {
  addItem: (product: CartProductPayload, quantity?: number) => void;
  incrementItem: (productId: CartItem["productId"]) => void;
  decrementItem: (productId: CartItem["productId"]) => void;
  removeItem: (productId: CartItem["productId"]) => void;
  clearCart: () => void;
};

export type CartStore = CartStoreState & CartStoreActions;

const INITIAL_STATE: CartStoreState = {
  items: [],
  subtotal: 0,
  shippingCost: 0,
  discountAmount: 0,
  total: 0
};

function computeSummary(items: CartItem[]): Pick<CartStoreState, "subtotal" | "total"> {
  const subtotal = items.reduce((accumulator, item) => {
    return accumulator + item.unitPrice * item.quantity;
  }, 0);

  return {
    subtotal,
    total: subtotal
  };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      addItem: (product, quantity = 1) => {
        const safeQuantity = Math.max(1, quantity);

        set((state) => {
          const existingItem = state.items.find((item) => item.productId === product.id);

          const items = existingItem
            ? state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + safeQuantity }
                  : item
              )
            : [
                ...state.items,
                {
                  productId: product.id,
                  name: product.name,
                  imageUrl: product.imageUrl,
                  unitPrice: product.price,
                  quantity: safeQuantity
                }
              ];

          return {
            items,
            ...computeSummary(items)
          };
        });
      },
      incrementItem: (productId) => {
        set((state) => {
          const items = state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
          );

          return {
            items,
            ...computeSummary(items)
          };
        });
      },
      decrementItem: (productId) => {
        set((state) => {
          const items = state.items
            .map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0);

          return {
            items,
            ...computeSummary(items)
          };
        });
      },
      removeItem: (productId) => {
        set((state) => {
          const items = state.items.filter((item) => item.productId !== productId);

          return {
            items,
            ...computeSummary(items)
          };
        });
      },
      clearCart: () => {
        set(() => ({ ...INITIAL_STATE }));
      }
    }),
    {
      name: "bloom-cart-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        subtotal: state.subtotal,
        shippingCost: state.shippingCost,
        discountAmount: state.discountAmount,
        total: state.total
      })
    }
  )
);
