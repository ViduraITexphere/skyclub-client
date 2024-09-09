import React, { useState, useEffect } from "react";
import "./ProfileMenu.css";
import { FaUserCircle } from "react-icons/fa";

const ProfileMenu = () => {
  const [avatar, setAvatar] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Retrieve avatar from localStorage
  useEffect(() => {
    const avatarUrl = localStorage.getItem("userAvatar");
    setAvatar(avatarUrl);

    const handleAvatarUpdate = () => {
      const updatedAvatar = localStorage.getItem("userAvatar");
      setAvatar(updatedAvatar);
    };

    // Listen for custom event when avatar is updated
    window.addEventListener("avatarUpdate", handleAvatarUpdate);

    return () => {
      window.removeEventListener("avatarUpdate", handleAvatarUpdate);
    };
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle logout (clear localStorage, redirect, etc.)
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="profile-menu">
      {avatar ? (
        <div className="profile-icon" onClick={toggleDropdown}>
          <img src={avatar} alt="Profile" className="avatar" />
        </div>
      ) : (
        <button onClick={() => (window.location.href = "/login")}>
          <FaUserCircle />
          Login
        </button>
      )}

      {showDropdown && (
        <ul className="dropdown-profile">
          <li onClick={() => (window.location.href = "/account")}>Account</li>
          <li onClick={handleLogout}>Logout</li>
          {!avatar && (
            <li onClick={() => (window.location.href = "/login")}>Login</li>
          )}
          <li onClick={() => (window.location.href = "/itinerary-list")}>
            Saved Itineraries
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
