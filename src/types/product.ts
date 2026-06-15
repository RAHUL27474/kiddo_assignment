import type { SduiAction } from "./actions";

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  imageUrl: string;
  badge?: string;
  action: SduiAction;
}

export interface ProductCollection {
  id: string;
  title: string;
  subtitle?: string;
  products: Product[];
}
