import { CartItem } from "./CartItem";

export interface Order {
  items: CartItem[];
  totalCost: number;
}
