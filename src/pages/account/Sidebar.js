import React from "react";
import "./Sidebar.css"; // Ensure you create this CSS file

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>User Account</h2>
      <div className="divider"></div>
      <ul>
        <li>Home</li>
        <li>Quotes</li>
        <li>Profile</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;
