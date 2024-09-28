import React from 'react';
import Carousel from './Carousel';
import Steps from './Steps';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Carousel />
      <hr />
      <Steps />
      <hr />
      <FeaturedServices />
      <hr />

    </div>
  );
};

// Featured Services Component
const FeaturedServices = () => {
  return (
    <div className="featured-services">
      <div className="service">
        <h2>Poster Printing</h2>
        <p>Transform your space with our high-quality posters.</p>
        <h3>Your Guide to Custom Poster Printing</h3>

        <h3>Browse Our Custom Poster Sizes</h3>
        <p> We offer a wide range of sizes, up to 60 inches wide and as long as you need. </p>

        <h3>A Look into Our Process</h3>
        <p>Care and quality quranteed</p>

        <a href="/posters" className="cta-button">Get Your Poster</a>
      </div>
      <hr />
      <div className="service">
        <h2>Photography Services</h2>
        <p>Capture your special moments with our professional photography services. Book a session today!</p>
        <a href="/photographer" className="cta-button">Book a Photographer</a>
      </div>
      <hr />
      <div className="design">
        <h2>Design Workspace</h2>
        <p>Capture your special moments with our professional photography services. Book a session today!</p>
        <a href="/photographer" className="cta-button">Book a Photographer</a>
      </div>
    </div>
  );
};

export default Home;
