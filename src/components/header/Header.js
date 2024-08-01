import React, { useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaHome,
  FaUserCircle,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa"; // Import icons from react-icons
import "./Header.css"; // Import the CSS file
import { FaXTwitter } from "react-icons/fa6";

function Header() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      const progressBar = document.querySelector(".progress-bar");
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      progressBar.style.width = `${scrollPercent}%`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="topnav" id="myTopnav">
        <div className="social-links">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter />
          </a>
        </div>
        <div className="nav-buttons">
          <a className="home-button" href="https://skytravelclub.com/new/">
            <FaHome /> Home
          </a>
          <button className="login">
            <FaUserCircle /> Login
          </button>
        </div>
      </div>
      <header className="header">
        <div className="header__logo">
          <img src="/images/logo.png" alt="Logo" />
        </div>
        <nav className="header__nav">
          <ul>
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
      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>
    </>
  );
}

export default Header;
