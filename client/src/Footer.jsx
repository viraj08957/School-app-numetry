// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../src/assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-column">
        <div className="logo-copyright">
          <img src="path/to/your/logo.png" alt="School Logo" />
          <p>&copy; 2023 School Name. All rights reserved.</p>
        </div>
      </div>
      <div className="footer-column">
        <div className="quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/registration">Registration</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-column">
        <div className="contact-info">
          <h4>Contact Information</h4>
          <p>Address: 123 School Street, Cityville</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Email: info@school.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

