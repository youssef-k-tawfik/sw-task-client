import React from "react";
import { useCart } from "@/hooks";
import CartItemsList from "./components/CartItemsList";

interface CartOverlayProps {
  onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ onClose }): JSX.Element => {
  const { cartItems, getCartTotalCost, getCartTotalQuantity, clearCart } =
    useCart();

  const handlePlaceOrder = () => {
    console.log("Placing order clicked!");
    // Place order logic here
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
            <p>${getCartTotalCost}</p>
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
      </div>
      {/* shadow */}
      <div
        className="fixed top-14 start-0 w-full h-full bg-black/50"
        onClick={onClose}
      />
    </>
  );
};

export default CartOverlay;
