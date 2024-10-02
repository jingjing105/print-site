import React from 'react';
import Carousel from './Carousel';
import Steps from './Steps';
import PosterCarousel from'./PosterCarousel';
import Photographer from './Photographer';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Carousel />
      <hr />
      <Steps />
      <hr />
      <PosterCarousel />
      <hr/>
      <Photographer />

    </div>
  );
};

export default Home;
