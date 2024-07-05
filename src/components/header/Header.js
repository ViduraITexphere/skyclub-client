import React from "react";
import "./Header.css"; // Import the CSS file

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <a href="https://skytravelclub.com/new/">Home</a>
          </li>
          <li className="dropdown">
            <a href="#communities">Communities</a>
            <ul className="dropdown-content">
              <li>
                <a href="https://skytravelclub.com/new/the-premium-club/">
                  The Premium Club
                </a>
              </li>
              <li>
                <a href="https://skytravelclub.com/new/the-nomads-club/">
                  The Nomads Club
                </a>
              </li>
              <li>
                <a href="https://skytravelclub.com/new/the-global-club/">
                  The Global Club
                </a>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#trips">Trips</a>
            <ul className="dropdown-content">
              <li>
                <a href="https://skytravelclub.com/new/create-trip-with-ai/">
                  Create trip with AI
                </a>
              </li>
              <li>
                <a href="https://skytravelclub.com/new/tailor-made-tours/">
                  Tailor made tours
                </a>
              </li>
              <li>
                <a href="https://skytravelclub.com/new/most-popular/">
                  Most popular
                </a>
              </li>
              <li>
                <a href="https://skytravelclub.com/new/budget-packages/">
                  Budget packages
                </a>
              </li>
              <li>
                <a href="https://skytravelclub.com/new/group-trips/">
                  Group trips
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#bucket-list">Bucket List</a>
          </li>
          <li>
            <a href="https://skytravelclub.com/new/latest-offers/">
              Latest Offers
            </a>
          </li>
          <li>
            <a href="#the-club">The Club</a>
          </li>
          <li>
            <a href="https://skytravelclub.com/new/blog/">Blog</a>
          </li>
          <li>
            <a href="https://skytravelclub.com/new/contact-us/">Contact Us</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
