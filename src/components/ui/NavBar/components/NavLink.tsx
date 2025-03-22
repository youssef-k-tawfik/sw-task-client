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
  const isActive = location.pathname === to;

  return (
    <li
      className={classNames({
        [Style.active]: isActive,
        "p-4 uppercase font-semibold text-nowrap": true,
      })}
      data-testid={isActive ? "active-category-link" : "category-link"}
    >
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default NavLink;
