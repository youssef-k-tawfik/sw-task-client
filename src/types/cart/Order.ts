import { SelectedAttribute } from "./SelectedAttribute";

interface OrderItem {
  productId: string;
  quantity: number;
  selectedAttributes: SelectedAttribute[];
}

export interface Order {
  items: OrderItem[];
  totalCost: number;
}
