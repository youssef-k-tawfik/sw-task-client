import CartIcon from "../../../assets/icons/CartIcon";
import NavLink from "./components/NavLink";

/**
 * NavBar component renders a navigation bar with links to different categories
 * of the website along with the logo and the shopping cart.
 */
const NavBar: React.FC = (): JSX.Element => {
  return (
    <div className="container flex justify-between items-center">
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
      <div>
        <CartIcon />
      </div>
    </div>
  );
};
export default NavBar;
