import React from "react";
import { Link, useLocation } from "react-router-dom";
import Style from "../NavBar.module.css";
import classNames from "classnames";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }): JSX.Element => {
  const location = useLocation();

  const isActive = (path: string, currentPath: string): boolean => {
    return currentPath === path || (currentPath === "/" && path === "/all");
  };

  const active = isActive(to, location.pathname);

  return (
    <li
      className={classNames({
        [Style.active]: active,
        "p-4 uppercase font-semibold text-nowrap select-none": true,
      })}
    >
      <Link
        to={to}
        data-testid={active ? "active-category-link" : "category-link"}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
