import { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedAttributes: Record<string, string>;
}
