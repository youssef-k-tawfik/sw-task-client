import React, { useEffect, useState, useMemo } from "react";
import { Currency, OrderProduct } from "@/types";
import { CartContextType } from "./CartContext.type";
import { CartContext } from "./CartContext";
import { getPriceAmount } from "@/utils";
import { getCurrencyByLocation } from "./cartUtils";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateQuantity,
} from "./cartActions";

const CART_STORAGE_KEY = "cart_items";
const DEFAULT_CURRENCY: Currency = { label: "USD", symbol: "$" };

// const countryToCurrencyMap: Record<string, Currency> = {
//   US: {
//     label: "USD",
//     symbol: "$",
//   },
//   // EU: {
//   //   label: "EUR",
//   //   symbol: "€",
//   // },
//   // EG: {
//   //   label: "EGP",
//   //   symbol: "ج.م",
//   // },
//   // Add more mappings as needed
//   // (sticking to USD for now since BE only supports USD)
// };

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
    addToCart: addToCart(setOrderProducts, setIsCartOpen),
    removeFromCart: removeFromCart(setOrderProducts),
    updateQuantity: updateQuantity(setOrderProducts),
    clearCart: clearCart(setOrderProducts),
    getCartTotalCost,
    getCartTotalQuantity,
    isCartOpen,
    setIsCartOpen,
    currency,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
