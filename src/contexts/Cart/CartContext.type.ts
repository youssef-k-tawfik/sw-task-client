import { CartItem, SelectedAttribute } from "@/types";

/**
 * Defines the structure and operations of the cart context.
 */
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
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
  isCartOpen:boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}
