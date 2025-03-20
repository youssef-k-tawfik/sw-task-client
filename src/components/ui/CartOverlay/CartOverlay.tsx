import React, { useState } from "react";
import { useCart } from "@/hooks";
import CartItemsList from "./components/CartItemsList";
import { placeOrder } from "@/services/api";
import { Loading } from "@/components/ui";
import { OrderItem } from "@/types";

interface CartOverlayProps {
  onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ onClose }): JSX.Element => {
  const { cartItems, getCartTotalCost, getCartTotalQuantity, clearCart } =
    useCart();
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const handlePlaceOrder = async () => {
    console.log("Placing order clicked!");

    setLoading(true);
    try {
      // Mapping cart items to the order item input format required by the backend.
      const orderItems: OrderItem[] = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        selectedAttributes: item.selectedAttributes,
      }));
      console.log("Order items:", orderItems);

      const result = await placeOrder(orderItems);
      console.log("Order placed successfully:", result);

      setOrderNumber(result);
      console.log("Order number:", orderNumber);

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
      <div className="absolute top-full right-0 w-[450px] shadow-lg bg-white z-10 ">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              My Bag, {getCartTotalQuantity} items
            </h2>
            <button
              className="px-2 py-1 border font-semibold bg-red-500 text-white border-red-500 hover:bg-red-600"
              onClick={clearCart}
              disabled={getCartTotalQuantity === 0}
            >
              Clear Cart
            </button>
          </div>
          {/* cart items */}
          <CartItemsList items={cartItems} />
          {/* Price */}
          <div className="flex justify-between items-center">
            <p>Total</p>
            <p data-testid="cart-total">${getCartTotalCost}</p>
          </div>
          {/* Place order button */}
          <button
            className="w-full py-2 bg-primary text-white uppercase"
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
        className="fixed top-14 start-0 w-full h-full bg-black/50"
        onClick={onClose}
      />
    </>
  );
};

export default CartOverlay;
