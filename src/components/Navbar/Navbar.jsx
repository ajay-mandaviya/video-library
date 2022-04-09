import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav className="navbar">
      <label className="navbar-logo white-text">My Stream</label>
      <div className="search-box">
        <i className="fas fa-search white-text "></i>
        <input
          placeholder="Search Video"
          className="white-text"
          type={"search"}
        ></input>
      </div>
      <ul>
        <Link to="/">
          <i className="fas fa-user"></i>
        </Link>
        <Link to="/login">
          <i className="fas fa-sign-in-alt"></i>
        </Link>
      </ul>
    </nav>
  );
};
