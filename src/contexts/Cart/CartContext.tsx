import React, { useEffect, useState, useCallback, useMemo } from "react";
import { CartItem, SelectedAttribute } from "@/types";
import { CartContextType } from "./CartContext.type";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";

const CART_STORAGE_KEY = "cart_items";

interface CartProviderProps {
  children: React.ReactNode;
}

/**
 * Provides a React context for managing the shopping cart.
 *
 * @param {React.PropsWithChildren} props - Component children.
 * @returns {JSX.Element} The CartProvider component.
 */
export const CartProvider: React.FC<CartProviderProps> = ({
  children,
}: CartProviderProps): JSX.Element => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cart with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Removes an item from the cart
   * @param {string} productId - The product ID
   * @param {SelectedAttribute[]} selectedAttributes - Selected attributes of the item
   */
  const removeFromCart = useCallback(
    (productId: string, selectedAttributes: SelectedAttribute[]) => {
      setCartItems((prevItems) =>
        prevItems.filter(
          (item) =>
            !(
              item.product.id === productId &&
              JSON.stringify(item.selectedAttributes) ===
                JSON.stringify(selectedAttributes)
            )
        )
      );
    },
    []
  );

  /**
   * Updates the quantity of an item in the cart
   * @param {string} productId - The product ID
   * @param {SelectedAttribute[]} selectedAttributes - Selected attributes of the item
   * @param {number} newQuantity - New quantity
   */
  const updateQuantity = useCallback(
    (
      productId: string,
      selectedAttributes: SelectedAttribute[],
      newQuantity: number
    ) => {
      // If the quantity is 0, remove the item.
      if (newQuantity === 0) {
        removeFromCart(productId, selectedAttributes);
        return;
      }

      setCartItems((prevItems) => {
        // Find the item in the cart
        const itemIndex = prevItems.findIndex(
          (item) =>
            item.product.id === productId &&
            JSON.stringify(item.selectedAttributes) ===
              JSON.stringify(selectedAttributes)
        );

        // If item exists and quantity is greater than 0, update the quantity
        if (itemIndex > -1 && newQuantity > 0) {
          const updatedItems = [...prevItems];
          updatedItems[itemIndex].quantity = newQuantity;
          return updatedItems;
        }

        console.error("Item not found in cart or invalid quantity");
        console.log("Item:", productId, selectedAttributes, newQuantity);
        return prevItems;
      });
    },
    [removeFromCart]
  );

  /**
   * Adds an item to the cart or increases its quantity by one if it already exists.
   *
   * @param {CartItem} item - The cart item to add.
   */
  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prevItems) => {
      // Check if item already exists in the cart
      const itemIndex = prevItems.findIndex(
        (cartItem) =>
          cartItem.product.id === item.product.id &&
          JSON.stringify(cartItem.selectedAttributes) ===
            JSON.stringify(item.selectedAttributes)
      );

      // Show a success toast
      toast.success(`${item.product.name} added to cart!`);

      // If item already exists, increase quantity by one
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      }

      // else Add new item to cart.
      return [...prevItems, item];
    });
    setIsCartOpen(true);
  }, []);

  /**
   * Clears all items from the cart.
   */
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  /**
   * Calculates the total cost of all items in the cart.
   *
   * @returns {number} The total cost.
   */
  const getCartTotalCost = useMemo((): number => {
    const totalCost = cartItems.reduce((total, item) => {
      const price = item.product.prices[0]?.amount || 0;
      return total + price * item.quantity;
    }, 0);
    return Number(totalCost.toFixed(2));
  }, [cartItems]);

  /**
   * Calculates the total quantity of all items in the cart.
   *
   * @returns {number} The total quantity.
   */
  const getCartTotalQuantity = useMemo(() => {
    return cartItems.reduce((total, { quantity }) => total + quantity, 0);
  }, [cartItems]);

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotalCost,
    getCartTotalQuantity,
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
