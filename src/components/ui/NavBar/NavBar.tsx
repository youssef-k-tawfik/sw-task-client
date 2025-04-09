import { CartIcon } from "@/assets/icons";
import NavLink from "./components/NavLink";
import { CartOverlay } from "../CartOverlay";
import { useCart } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/api/fetchCategories";

/**
 * NavBar component renders a navigation bar with links to different categories
 * of the website along with the logo and the shopping cart.
 *
 * @returns {JSX.Element} - Rendered NavBar component
 */
const NavBar: React.FC = (): JSX.Element => {
  const { getCartTotalQuantity, isCartOpen, setIsCartOpen } = useCart();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const toggleCartOverlay = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="container flex justify-between items-center fixed left-0 right-0 z-20 bg-white">
      <nav>
        <ul className="flex">
          {categories?.map((category, i) => (
            <NavLink key={i + category} to={`/${category}`}>
              {category}
            </NavLink>
          ))}
        </ul>
      </nav>
      <div>
        <img src="/logo.svg" alt="Logo" className="min-h-10 min-w-10" />
      </div>
      <div onClick={toggleCartOverlay} className="relative cursor-pointer">
        <CartIcon size={25} data-testid="cart-btn" />
        {getCartTotalQuantity > 0 && (
          <span className="font-roboto font-bold text-sm text-white rounded-full w-5 h-5 bg-black absolute top-0 end-0 translate-x-1/2 -translate-y-1/2 grid place-items-center">
            {getCartTotalQuantity}
          </span>
        )}
      </div>
      {isCartOpen && <CartOverlay onClose={toggleCartOverlay} />}
    </div>
  );
};

export default NavBar;
