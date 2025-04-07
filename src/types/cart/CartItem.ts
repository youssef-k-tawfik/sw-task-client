import { SelectedAttribute } from "./SelectedAttribute";

export interface CartItem {
  productId: string;
  quantity: number;
  selectedAttributes: SelectedAttribute[];
}
