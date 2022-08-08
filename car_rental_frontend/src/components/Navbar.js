import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            style={{ textDecoration: "none", color: "white" }}
            replace="true"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Bookings"
            style={{ textDecoration: "none", color: "white" }}
            replace="true"
          >
            My Bookings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
