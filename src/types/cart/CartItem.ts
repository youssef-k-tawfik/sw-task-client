import { Product, SelectedAttribute } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedAttributes: SelectedAttribute[];
}
