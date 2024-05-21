// AboutUs.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './assets/css/AboutUs.css'; // Import the stylesheet
import image1 from "../src/assets/images/AboutUs/image1.jpg";
import image2 from "../src/assets/images/AboutUs/image2.jpg";
import image3 from "../src/assets/images/AboutUs/image3.jpg";
import image4 from "../src/assets/images/AboutUs/image4.jpg";
import image5 from "../src/assets/images/AboutUs/image5.jpg";
import image6 from "../src/assets/images/AboutUs/image6.jpg";

const AboutUs = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  return (
    <div className="slide-card-container">
      {/* <h2 className='text-center'>About Us</h2> */}
      <Slider {...carouselSettings}>
        <div className="slide-card">
          <h3>Our School</h3>
          <img src={image4} alt="Slide 1" />
          <p>Our school is a vibrant hub of learning, 
            fostering an environment where curiosity thrives.
             With state-of-the-art facilities and a commitment to
              academic excellence, we provide a nurturing space for 
              students to grow, learn, and explore their potential.</p>
        </div>
        <div className="slide-card">
          <h3>Our Students</h3>
          <img src={image1} alt="Slide 1" />
          <p>At the heart of our institution are our students,
             a diverse and dynamic community. Driven by a passion 
             for knowledge, they embody the spirit of curiosity,
              collaboration, and creativity. Our students are not
               just learners; they are future leaders, thinkers, 
               and contributors to society.</p>
        </div>
        <div className="slide-card">
          <h3>Our Educators</h3>
          <img src={image2} alt="Slide 2" />
          <p>Our dedicated team of educators is the backbone
             of our school. Committed to shaping young minds, 
             our teachers bring a wealth of expertise and
              enthusiasm to the classroom. They inspire and 
              guide students, fostering a love for learning 
              that extends beyond textbooks.</p>
        </div>
        <div className="slide-card">
          <h3>Parent Partnership</h3>
          <img src={image3} alt="Slide 3" />
          <p>We believe in the importance of a strong 
            partnership between school and home.
             Through open communication and engagement,
              we empower parents to actively participate 
              in their child's educational journey. Together,
               we form a supportive community that values the
                holistic development of every student.</p>
        </div>
        <div className="slide-card">
          <h3>Playground Fun</h3>
          <img src={image5} alt="Slide 2" />
          <p>Our expansive playground is not just 
            a space for physical activity; it's a 
            canvas for friendship, teamwork, and play.
             From spirited games to moments of laughter,
              the playground is where students 
               social skills, resilience, and a healthy
                sense of competition.</p>
        </div>
        <div className="slide-card">
          <h3>Library Oasis</h3>
          <img src={image6} alt="Slide 3" />
          <p>Our library is a haven for knowledge seekers. 
            Stocked with a diverse collection of books, 
            it's a quiet retreat where students delve into
             the world of literature, research, and 
             self-discovery. The library serves as a 
             resourceful sanctuary for both academic enrichment and leisure reading.</p>
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default AboutUs;
