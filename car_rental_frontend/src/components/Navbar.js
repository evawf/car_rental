import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Bookings"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Bookings
          </NavLink>
        </li>
        <li>
          <NavLink to="/About">
            {({ isActive }) => (
              <span className={isActive ? activeClassName : undefined}>
                About
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
