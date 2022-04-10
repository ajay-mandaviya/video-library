import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
const Sidebar = () => {
  const getActiveStyle = ({ isActive }) => {
    return isActive ? "sidebar-link active" : "sidebar-link";
  };
  return (
    <div className="sidebar-container">
      <ul>
        <li>
          <NavLink to="/" className={getActiveStyle}>
            <i className="fa fa-home" aria-hidden="true"></i>
            <div>Home</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/playlist" className={getActiveStyle}>
            <i className="fas fa-play-circle"></i>
            <div>PlayList</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/liked" className={getActiveStyle}>
            <i className="fas fa-thumbs-up"></i>

            <div>Liked</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/watchLater" className={getActiveStyle}>
            <i className="fas fa-clock"></i>
            <div>Watch Later</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className={getActiveStyle}>
            <i className="fas fa-history"></i>
            <div>History</div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
