import React from "react";

interface CartOverlayProps {
  onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ onClose }): JSX.Element => {
  return (
    <>
      <div className="absolute top-full right-0 w-80 shadow-lg bg-white z-10">
        <div className="p-4 z-20">
          {/* Add your cart items here */}
          <p className="text-center">Your cart is empty.</p>
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
