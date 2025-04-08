import { createContext } from "react";
import { CartContextType } from "./CartContext.type";

/**
 * React context for cart operations.
 */
export const CartContext: React.Context<CartContextType> =
  createContext<CartContextType>({
    orderProducts: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    getCartTotalCost: 0,
    getCartTotalQuantity: 0,
    isCartOpen: false,
    setIsCartOpen: () => {},
    currency: {
      label: "",
      symbol: "",
    },
  });
