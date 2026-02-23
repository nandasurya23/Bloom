import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type {
  WishlistItem,
  WishlistProductPayload
} from "@/types/wishlist";

type WishlistStoreState = {
  items: WishlistItem[];
};

type WishlistStoreActions = {
  addItem: (product: WishlistProductPayload) => void;
  removeItem: (productId: WishlistItem["productId"]) => void;
  clearWishlist: () => void;
};

export type WishlistStore = WishlistStoreState & WishlistStoreActions;

const INITIAL_STATE: WishlistStoreState = {
  items: []
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      addItem: (product) => {
        set((state) => {
          const isExisting = state.items.some((item) => item.productId === product.id);

          if (isExisting) {
            return state;
          }

          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                name: product.name,
                imageUrl: product.imageUrl,
                unitPrice: product.price
              }
            ]
          };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId)
        }));
      },
      clearWishlist: () => {
        set(() => ({ ...INITIAL_STATE }));
      }
    }),
    {
      name: "bloom-wishlist-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items
      })
    }
  )
);
