import { create } from "zustand";

export interface CartLineItem {
  id: string;
  quantity: number;
}

export interface CartState {
  items: Record<string, number>;
  addToCart: (id: string) => void;
  getQuantity: (id: string) => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: {},
  addToCart: (id: string) => {
    set((state) => ({
      items: {
        ...state.items,
        [id]: (state.items[id] ?? 0) + 1
      }
    }));
  },
  getQuantity: (id: string) => get().items[id] ?? 0
}));

export const addProductToCart = (id: string): void => {
  useCartStore.getState().addToCart(id);
};
