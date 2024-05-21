/* eslint-disable no-unused-vars */
// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./assets/css/Navbar.css"; // Import the stylesheet

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation();

  const handleLinkClick = (link) => {
    setActiveLink(link);
    localStorage.setItem("activeLink", link);
  };

  useEffect(() => {
    const storedLink = localStorage.getItem("activeLink");
    if (storedLink) {
      setActiveLink(storedLink);
    }
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed"
      style={{ height: "80px" }}
    >
      <Link
        className={`navbar-brand ${activeLink === "/" ? "active" : ""}`}
        to="/"
        onClick={() => handleLinkClick("/")}
      >
        Home
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className={`nav-link ${activeLink === "/about" ? "active" : ""}`}
              to="/about"
              onClick={() => handleLinkClick("/about")}
            >
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                activeLink === "/contact" ? "active" : ""
              }`}
              to="/contact"
              onClick={() => handleLinkClick("/contact")}
            >
              Contact Us
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${activeLink === "/awards" ? "active" : ""}`}
              to="/awards"
              onClick={() => handleLinkClick("/awards")}
            >
              Awards and certifcation
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${activeLink === "/career" ? "active" : ""}`}
              to="/career"
              onClick={() => handleLinkClick("/career")}
            >
              Career
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                activeLink === "/register" ? "active" : ""
              }`}
              to="/register"
              onClick={() => handleLinkClick("/register")}
            >
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeLink === "/login" ? "active" : ""}`}
              to="/login"
              onClick={() => handleLinkClick("/login")}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
