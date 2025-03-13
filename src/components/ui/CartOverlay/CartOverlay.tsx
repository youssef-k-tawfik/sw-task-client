import React, { useMemo } from "react";
import { useCart } from "@/hooks";
import { ProductAttributes } from "../ProductAttributes";
import { PlusIcon, MinusIcon } from "@/assets/icons";

interface CartOverlayProps {
  onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ onClose }): JSX.Element => {
  const { cartItems, getCartTotalCost, updateQuantity } = useCart();

  const totalQuantity = useMemo(() => {
    return cartItems.reduce((total, { quantity }) => total + quantity, 0);
  }, [cartItems]);

  const handlePlaceOrder = () => {
    console.log("Placing order clicked!");
    // Place order logic here
  };

  return (
    <>
      <div className="absolute top-full right-0 w-[450px] shadow-lg bg-white z-10">
        <div className="p-4">
          <h2 className="text-lg font-semibold">
            My Bag, {totalQuantity} items
          </h2>
          {/* cart items */}
          {cartItems.length > 0 ? (
            <ul
              style={{ scrollbarGutter: "stable" }}
              className="space-y-4 max-h-96 overflow-auto my-4"
            >
              {cartItems.map(({ product, quantity, selectedAttributes }) => (
                <li
                  key={product.id + JSON.stringify(selectedAttributes)}
                  className="flex gap-4 justify-between"
                >
                  {/* product details */}
                  <div className="grow">
                    <h3>{product.name}</h3>
                    <p>${product.prices[0].amount}</p>
                    <ProductAttributes
                      attributes={product.attributes}
                      selectedAttributes={selectedAttributes}
                      variant="small"
                    />
                  </div>
                  {/* product quantity */}
                  <div className="flex flex-col justify-between items-center">
                    <button
                      className="p-1 border-2 text-lg font-semibold"
                      onClick={() =>
                        updateQuantity(
                          product.id,
                          selectedAttributes,
                          quantity + 1
                        )
                      }
                    >
                      <PlusIcon />
                    </button>
                    <p>{quantity}</p>
                    <button
                      className="p-1 border-2 text-lg font-semibold"
                      onClick={() =>
                        updateQuantity(
                          product.id,
                          selectedAttributes,
                          quantity - 1
                        )
                      }
                    >
                      <MinusIcon />
                    </button>
                  </div>
                  {/* product main image */}
                  <div className="w-1/3">
                    <img
                      src={product?.gallery[0]}
                      alt=""
                      className="block w-full"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
          {/* Price */}
          <div className="flex justify-between items-center">
            <p>Total</p>
            <p>${getCartTotalCost()}</p>
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
