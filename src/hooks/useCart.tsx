import { useContext } from "react";
import { CartContextType, CartContext } from "@/contexts/Cart";

/**
 * Custom hook for accessing the cart context.
 *
 * @returns {CartContextType} The current cart context.
 * @throws {Error} If used outside of a CartProvider.
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
