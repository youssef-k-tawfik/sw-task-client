import { useState } from "react";
import { CartIcon } from "@/assets/icons";
import NavLink from "./components/NavLink";
import { CartOverlay } from "../CartOverlay";
import { useCart } from "@/hooks";

/**
 * NavBar component renders a navigation bar with links to different categories
 * of the website along with the logo and the shopping cart.
 *
 * @returns {JSX.Element} - Rendered NavBar component
 */
const NavBar: React.FC = (): JSX.Element => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartTotalQuantity } = useCart();

  const toggleCartOverlay = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="container flex justify-between items-center fixed left-0 right-0 z-20 bg-white">
      <nav>
        <ul className="flex">
          <NavLink to="/">All</NavLink>
          <NavLink to="/clothes">Clothes</NavLink>
          <NavLink to="/tech">Tech</NavLink>
        </ul>
      </nav>
      <div>
        <img src="/logo.svg" alt="Logo" className="h-10" />
      </div>
      <button
        onClick={toggleCartOverlay}
        className="relative border-none"
        data-testid="cart-btn"
      >
        <CartIcon size={25} />
        {getCartTotalQuantity > 0 && (
          <span className="font-roboto font-bold text-sm text-white rounded-full w-5 h-5 bg-black absolute top-0 end-0 translate-x-1/2 -translate-y-1/2 grid items-center">
            {getCartTotalQuantity}
          </span>
        )}
      </button>
      {isCartOpen && <CartOverlay onClose={toggleCartOverlay} />}
    </div>
  );
};

export default NavBar;
