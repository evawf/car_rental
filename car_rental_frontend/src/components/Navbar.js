import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          listStyleType: "none",
        }}
      >
        <li>
          <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Bookings"
            style={{ textDecoration: "none", color: "white" }}
          >
            Bookings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/About"
            style={{ textDecoration: "none", color: "white" }}
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
