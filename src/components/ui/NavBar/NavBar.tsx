import { useState } from "react";
import CartIcon from "@/assets/icons/CartIcon";
import NavLink from "./components/NavLink";
import { CartOverlay } from "../CartOverlay";

/**
 * NavBar component renders a navigation bar with links to different categories
 * of the website along with the logo and the shopping cart.
 *
 * @returns {JSX.Element} - Rendered NavBar component
 */
const NavBar: React.FC = (): JSX.Element => {
  const [isCartOpen, setIsCartOpen] = useState(false);

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
        <img src="/logo.svg" alt="Logo" className="h-8" />
      </div>
      <button onClick={toggleCartOverlay}>
        <CartIcon />
      </button>
      {isCartOpen && <CartOverlay onClose={toggleCartOverlay} />}
    </div>
  );
};

export default NavBar;
