import { useCartStore } from "../store/cartStore";

export const useCartQuantity = (productId: string): number =>
  useCartStore((state) => state.items[productId] ?? 0);
