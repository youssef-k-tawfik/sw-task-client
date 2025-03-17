import { SelectedAttribute } from "./SelectedAttribute";

export interface OrderItem {
  productId: string;
  quantity: number;
  selectedAttributes: SelectedAttribute[];
}
