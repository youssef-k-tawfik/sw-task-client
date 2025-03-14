import React from "react";
import { useCart } from "@/hooks";
import CartItem from "./components/CartItem";

interface CartOverlayProps {
  onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ onClose }): JSX.Element => {
  const { cartItems, getCartTotalCost, getCartTotalQuantity } = useCart();

  const handlePlaceOrder = () => {
    console.log("Placing order clicked!");
    // Place order logic here
  };

  return (
    <>
      <div className="absolute top-full right-0 w-[450px] shadow-lg bg-white z-10">
        <div className="p-4">
          <h2 className="text-lg font-semibold">
            My Bag, {getCartTotalQuantity} items
          </h2>
          {/* cart items */}
          {cartItems.length > 0 ? (
            <ul
              style={{ scrollbarGutter: "stable" }}
              className="space-y-4 max-h-96 overflow-auto my-4"
            >
              {cartItems.map((item) => (
                <CartItem
                  key={
                    item.product.id + JSON.stringify(item.selectedAttributes)
                  }
                  item={item}
                />
              ))}
            </ul>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
          {/* Price */}
          <div className="flex justify-between items-center">
            <p>Total</p>
            <p>${getCartTotalCost}</p>
          </div>
          {/* Place order button */}
          <button
            className="w-full py-2 bg-primary text-white uppercase"
            onClick={handlePlaceOrder}
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
