import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Currency, OrderProduct, SelectedAttribute } from "@/types";
import { CartContextType } from "./CartContext.type";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";
import { getPriceAmount } from "@/utils";

const CART_STORAGE_KEY = "cart_items";
const DEFAULT_CURRENCY: Currency = { label: "USD", symbol: "$" };

const countryToCurrencyMap: Record<string, Currency> = {
  US: {
    label: "USD",
    symbol: "$",
  },
  // EU: {
  //   label: "EUR",
  //   symbol: "€",
  // },
  // EG: {
  //   label: "EGP",
  //   symbol: "ج.م",
  // },
  // Add more mappings as needed
  // (sticking to USD for now since BE only supports USD)
};

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
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  const getCurrencyByLocation = async (): Promise<Currency> => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      return countryToCurrencyMap[data.country_code] || DEFAULT_CURRENCY;
    } catch (error) {
      console.error("Failed to fetch currency by location:", error);
      return DEFAULT_CURRENCY;
    }
  };

  useEffect(() => {
    const fetchCurrency = async () => {
      const currency = await getCurrencyByLocation();
      setCurrency(currency);
    };
    fetchCurrency();
  }, []);

  // Sync cart with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(orderProducts));
  }, [orderProducts]);

  /**
   * Removes an item from the cart
   * @param {string} productId - The product ID
   * @param {SelectedAttribute[]} selectedAttributes - Selected attributes of the item
   */
  const removeFromCart = useCallback(
    (productId: string, selectedAttributes: SelectedAttribute[]) => {
      setOrderProducts((prevItems) =>
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

      setOrderProducts((prevItems) => {
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
   * @param {OrderProduct} item - The cart item to add.
   */
  const addToCart = useCallback((item: OrderProduct) => {
    setOrderProducts((prevItems) => {
      // Check if item already exists in the cart
      const itemIndex = prevItems.findIndex(
        (orderProduct) =>
          orderProduct.product.id === item.product.id &&
          JSON.stringify(orderProduct.selectedAttributes) ===
            JSON.stringify(item.selectedAttributes)
      );

      // If item already exists, increase quantity by one
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      }

      // else Add new item to cart.
      return [...prevItems, item];
    });
    // Show a success toast
    toast.success(`${item.product.name} added to cart!`);
    setIsCartOpen(true);
  }, []);

  /**
   * Clears all items from the cart.
   */
  const clearCart = useCallback(() => {
    setOrderProducts([]);
  }, []);

  /**
   * Calculates the total cost of all items in the cart.
   *
   * @returns {number} The total cost.
   */
  const getCartTotalCost = useMemo((): number => {
    const totalCost = orderProducts.reduce((total, item) => {
      const price = getPriceAmount(item.product.prices, currency.label) || 0;
      return total + price * item.quantity;
    }, 0);
    return Number(totalCost.toFixed(2));
  }, [orderProducts, currency]);

  /**
   * Calculates the total quantity of all items in the cart.
   *
   * @returns {number} The total quantity.
   */
  const getCartTotalQuantity = useMemo(() => {
    return orderProducts.reduce((total, { quantity }) => total + quantity, 0);
  }, [orderProducts]);

  const value: CartContextType = {
    orderProducts,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotalCost,
    getCartTotalQuantity,
    isCartOpen,
    setIsCartOpen,
    currency,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
