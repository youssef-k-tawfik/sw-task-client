/**
 * NavBar component renders a navigation bar with links to different categories
 * of the website along with the logo and the shopping cart.
 */
const NavBar: React.FC = (): JSX.Element => {
  return (
    <div className="container flex justify-between items-center">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/">All</a>
          </li>
          <li>
            <a href="/clothes">Clothes</a>
          </li>
          <li>
            <a href="/tech">Tech</a>
          </li>
        </ul>
      </nav>
      <div>
        <img src="/logo.svg" alt="Logo" className="h-8" />
      </div>
    </div>
  );
};
export default NavBar;
