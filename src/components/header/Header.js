import React, { useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaHome,
  FaUserCircle,
  FaTiktok,
  FaYoutube,
  FaCaretDown,
  FaComments,
} from "react-icons/fa"; // Import icons from react-icons
import "./Header.css"; // Import the CSS file
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProfileMenu from "../ProfileMenu";

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
      {/* <div className="social-links">
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
        </div> */}

      {/* divider */}
      {/* header */}
      <header className="header">
        <div className="topnav" id="myTopnav">
          <div className="nav-buttons">
            <a className="home-button" href="https://skytravelclub.com/">
              <FaHome /> Home
            </a>
            {/* select country dropdown */}
            <div className="dropdown">
              <a className="home-button">
                Select Country <FaCaretDown />
              </a>
              <div className="dropdown-content">
                <a href="https://skytravelclub.com/sri-lanka/">Sri Lanka</a>
                <a href="#">United Kingdom</a>
                <a href="#">Australia</a>
                <a href="#">Dubai</a>
                <a href="#">France</a>
              </div>
            </div>

            <a
              className="home-button"
              href="https://skytravelclub.com/sky-chat/"
            >
              <FaComments /> Sky Chat
            </a>
            <a
              className="home-button"
              href="https://skytravelclub.com/new/blog/"
            >
              Blog
            </a>

            {/* <a href="https://skytravelclub.com/new/login/">
              <button className="login">
                <FaUserCircle /> Login
              </button>
            </a> */}
            <div className="profile-menu">
              <ProfileMenu />
            </div>

            {/* <Link to="/login">
              <button className="login">
                <FaUserCircle /> Login
              </button>
            </Link> */}
          </div>
        </div>

        <div className="header__bootom">
          <div className="header__logo">
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <nav className="header__nav">
            <ul>
              <li>
                <a href="https://skytravelclub.com/the-club/">Sky Club</a>
              </li>
              <li>
                <a href="https://skytravelclub.com/membership/">Membership</a>
              </li>
              <li className="dropdown">
                <a href="#trips">Tours</a> <FaCaretDown />
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
                    <a href="https://skytravelclub.com/new/destinations/">
                      International Tours
                    </a>
                  </li>
                  <li>
                    <a href="https://skytravelclub.com/solo-travelers/">
                      Solo Travelers
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="https://skytravelclub.com/hotels/">Hotels</a>
              </li>
              <li>
                <a href="https://skytravelclub.com/gift-card/">
                  Sky Gift Cards
                </a>
              </li>
              <li>
                <a href="https://skytravelclub.com/sky-weddings/">
                  Sky Weddings
                </a>
              </li>
              <li>
                <a href="https://skytravelclub.com/bucket-list/">Bucket List</a>
              </li>
              <li>
                <a href="https://skytravelclub.com/latest-offers/">
                  Latest Offers
                </a>
              </li>
              <li>
                <a href="https://skytravelclub.com/new/contact-us/">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>
    </>
  );
}

export default Header;
