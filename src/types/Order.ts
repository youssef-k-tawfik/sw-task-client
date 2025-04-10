import { OrderProduct } from "./cart";
import { Currency } from "./product";

export interface Order {
  orderNumber: string;
  totalAmount: number;
  currency: Currency;
  placedAt: string;
  products: OrderProduct[];
}
