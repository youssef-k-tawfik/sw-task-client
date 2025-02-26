import React from "react";
import { Link, useLocation } from "react-router-dom";
import Style from "../NavBar.module.css";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }): JSX.Element => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className={`${isActive ? Style.active : ""} p-4 uppercase`}>
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default NavLink;
