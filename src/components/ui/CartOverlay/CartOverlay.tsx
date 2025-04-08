import React, { useState } from "react";
import { useCart } from "@/hooks";
import OrderProductsList from "./components/OrderProductsList";
import { placeOrder } from "@/services/api";
import { Loading } from "@/components/ui";
import { CartItem } from "@/types";

interface CartOverlayProps {
  onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ onClose }): JSX.Element => {
  const {
    orderProducts,
    getCartTotalCost,
    getCartTotalQuantity,
    clearCart,
    currency,
  } = useCart();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    console.log("Placing order clicked!");

    setLoading(true);
    try {
      // Mapping cart items to the order item input format required by the backend.
      const cartItems: CartItem[] = orderProducts.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        selectedAttributes: item.selectedAttributes,
      }));

      const result = await placeOrder(cartItems, currency.label);
      console.log("Order placed successfully:", result);

      clearCart();
    } catch (error) {
      console.error("Order placement failed:", error);
      // Optionally show an error notification to the user.
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="absolute top-full right-0 w-[450px] shadow-lg bg-white z-10 "
        data-testid="cart-overlay"
      >
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">
              My Bag,{" "}
              <span className="font-medium">
                {getCartTotalQuantity}{" "}
                {getCartTotalQuantity === 1 ? "item" : "items"}
              </span>
            </h2>
            <button
              className="px-2 py-1 border text-sm font-semibold bg-red-500 text-white border-red-500 hover:bg-red-600"
              onClick={clearCart}
              disabled={getCartTotalQuantity === 0}
            >
              Clear Cart
            </button>
          </div>
          {/* cart items */}
          <OrderProductsList items={orderProducts} />
          {/* Price */}
          <div className="flex justify-between items-center">
            <p className="font-roboto font-medium">Total</p>
            <p className="font-bold" data-testid="cart-total">
              {currency.symbol}
              {getCartTotalCost}
            </p>
          </div>
          {/* Place order button */}
          <button
            className="w-full py-2 bg-primary text-white uppercase text-sm font-semibold"
            onClick={handlePlaceOrder}
            disabled={getCartTotalQuantity === 0}
          >
            Place Order
          </button>
        </div>
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 w-full h-full z-20 bg-white/75 flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
      {/* Backdrop */}
      <div
        className="fixed top-14 start-0 w-full h-full bg-[#39374838]/80"
        onClick={onClose}
      />
    </>
  );
};

export default CartOverlay;
