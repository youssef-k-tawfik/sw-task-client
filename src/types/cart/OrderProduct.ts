import { Product, SelectedAttribute } from "@/types";

export interface OrderProduct {
  product: Product;
  quantity: number;
  selectedAttributes: SelectedAttribute[];
}
