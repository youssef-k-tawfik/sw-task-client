import React from "react";
import { useCart } from "@/hooks";
import CartItemsList from "./components/CartItemsList";
import { placeOrder } from "@/services/api";
import { Loading } from "@/components/ui";
import { CartItem } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CartOverlay: React.FC = (): JSX.Element => {
  const {
    orderProducts,
    getCartTotalCost,
    getCartTotalQuantity,
    clearCart,
    currency,
  } = useCart();

  // Function to map cart items to the format required by the backend
  const mapCartItems = (): CartItem[] => {
    return orderProducts.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      selectedAttributes: item.selectedAttributes,
    }));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const cartItems = mapCartItems();
      return await placeOrder(cartItems, currency.label);
    },
    onSuccess: () => {
      clearCart();
    },
    onError: (error) => {
      console.error("Order placement failed:", error);
      toast.error("Failed to place order. Please try again.");
    },
  });

  const handlePlaceOrder = () => {
    mutation.mutate();
  };

  return (
    <>
      <div
        className="absolute top-full right-0 w-[450px] shadow-lg bg-white z-10 "
        data-testid="cart-overlay"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="p-4">
          <h2 className="font-bold">
            My Bag,{" "}
            <span className="font-medium">
              {getCartTotalQuantity}{" "}
              {getCartTotalQuantity === 1 ? "item" : "items"}
            </span>
          </h2>
          {/* cart items */}
          <CartItemsList items={orderProducts} />
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
        {mutation.isPending && (
          <div className="absolute inset-0 w-full h-full z-20 bg-white/75 flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
      {/* Backdrop */}
      <div
        className="fixed top-14 start-0 w-full h-full bg-[#39374838]/80"
        // onClick={onClose}
      />
    </>
  );
};

export default CartOverlay;
