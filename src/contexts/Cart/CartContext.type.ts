import { CartItem } from "@/types";

/**
 * Defines the structure and operations of the cart context.
 */
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    productId: string,
    selectedAttributes: Record<string, string>
  ) => void;
  updateQuantity: (
    productId: string,
    selectedAttributes: Record<string, string>,
    quantity: number
  ) => void;
  clearCart: () => void;
  getCartTotalCost: () => number;
}
