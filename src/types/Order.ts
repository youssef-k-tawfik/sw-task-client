import { OrderProduct } from "./cart";

export interface Order {
  orderNumber: string;
  totalAmount: number;
  placedAt: Date;
  products: OrderProduct[];
}
