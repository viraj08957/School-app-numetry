// Home.jsx
import React from 'react';
import './assets/css/Home.css';

const Home = () => {
  return (
    <div className="home-container" >
      <video className="background-video" autoPlay loop muted >
        <source src="videos/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <h1 className="welcome-text">Welcome to Our School Website</h1>
        {/* Add more text or elements as needed */}
      </div>
    </div>
  );
};

export default Home;
