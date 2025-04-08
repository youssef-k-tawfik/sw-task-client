import { OrderProduct, SelectedAttribute } from "@/types";
import { Currency } from "@/types";

/**
 * Defines the structure and operations of the cart context.
 */
export interface CartContextType {
  orderProducts: OrderProduct[];
  addToCart: (item: OrderProduct) => void;
  removeFromCart: (
    productId: string,
    selectedAttributes: SelectedAttribute[]
  ) => void;
  updateQuantity: (
    productId: string,
    selectedAttributes: SelectedAttribute[],
    quantity: number
  ) => void;
  clearCart: () => void;
  getCartTotalCost: number;
  getCartTotalQuantity: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  currency: Currency;
}
