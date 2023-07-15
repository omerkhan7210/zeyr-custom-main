// HomePage.js
import React from 'react';
import video from '../assets/new-video.mp4';

const HomePage = () => {
  return (
    <div className="video-container-home">
      <video className="video-home" autoPlay muted playsInline loop src={video}></video>
    </div>
  );
};

export default HomePage;
