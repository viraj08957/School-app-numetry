/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import "../../../../src/assets/css/Awards.css";

const awards = [
  {
    title: "Best School 2021",
    description:
      "Awarded for outstanding performance in academics and extracurricular activities.",
    image: "https://picsum.photos/200/300?random=1",
  },
  {
    title: "Excellence in Sports",
    description:
      "Awarded for exceptional performance in various sports competitions.",
    image: "https://picsum.photos/200/300?random=2",
  },
];

const certifications = [
  {
    title: "Advanced Mathematics",
    description:
      "Certification for completing the Advanced Mathematics course.",
    image: "https://picsum.photos/200/300?random=3",
  },
  {
    title: "Creative Writing",
    description:
      "Certification for successfully completing the Creative Writing course.",
    image: "https://picsum.photos/200/300?random=4",
  },
];

const Awards = () => {
  return (
    <div className="awards-certifications-container">
      <h1>Awards and Certifications</h1>
      <div className="section">
        <h2>Awards</h2>
        <div className="cards">
          {awards.map((award, index) => (
            <div key={index} className="card">
              <img src={award.image} alt={award.title} />
              <h3>{award.title}</h3>
              <p>{award.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h2>Certifications</h2>
        <div className="cards">
          {certifications.map((cert, index) => (
            <div key={index} className="card">
              <img src={cert.image} alt={cert.title} />
              <h3>{cert.title}</h3>
              <p>{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Awards;
