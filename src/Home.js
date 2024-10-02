import React from 'react';
import Carousel from './Carousel';
import Steps from './Steps';
import PosterCarousel from'./PosterCarousel';
import Photographer from './Photographer';
import Footer from './Footer';
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
      <hr />
      <Footer/>

    </div>
  );
};

export default Home;
