import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/movies">
          Movies
        </NavLink>

        <NavLink className="nav-item nav-link" to="/costumers">
          Costumers
        </NavLink>

        <NavLink className="nav-item nav-link" to="/rentals">
          Rentals
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
