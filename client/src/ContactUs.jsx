// ContactUs.jsx
import React, { useState } from 'react';
import { Carousel, Card } from 'react-bootstrap';

import "./assets/css/ContactUs.css"


const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="contact-map">
        <iframe
          title="School Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.8459669515486!2d38.7603752!3d9.0095184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b858d83d9580f%3A0x8ddb931cc833c8d7!2sSJS%20Highschool%2C%20Bus%20Station%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1637351575868!5m2!1sen!2set"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>


{/* Trail */}

  </div>
  );
};

export default ContactUs;
