import React from 'react';
import Carousel from './Carousel';
import Steps from './Steps';
import PosterCarousel from'./PosterCarousel';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Carousel />
      <hr />
      <Steps />
      <hr />
      <PosterCarousel />

    </div>
  );
};

export default Home;
