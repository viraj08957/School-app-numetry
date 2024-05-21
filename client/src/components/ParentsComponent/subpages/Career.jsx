/* eslint-disable no-unused-vars */
import React from "react";
import "../../../../src/assets/css/Career.css";
const Career = () => {
  return (
    <div className="career-container">
      <section className="search">
        <h2>Find Your Dream Job</h2>
        <form action="#" method="get">
          <input type="text" name="keywords" placeholder="Keywords" />
          <input type="text" name="location" placeholder="Location" />
          <input type="text" name="company" placeholder="Company" />
          <button type="submit">Search</button>
        </form>
      </section>

      <section className="job-listings">
        <h2>Latest Job Listings</h2>
        <ul>
          <li>
            <h3>Assistant Professor</h3>
            <p>Location: Mumbai</p>
            <p>Description: Good at Computer Graphics</p>
            <a href="#">Apply Now</a>
          </li>
          <li>
            <h3>Lab Assistant</h3>
            <p>Location: Mumbai</p>
            <p>Description: need to be graduated stem subjects</p>
            <a href="#">Apply Now</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Career;
