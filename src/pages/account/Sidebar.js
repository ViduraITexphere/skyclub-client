import React from "react";
import "./Sidebar.css"; // Ensure you create this CSS file
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>User Account</h2>
      <div className="divider"></div>
      <ul>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="/saved-quotes">Saved Quotes</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
