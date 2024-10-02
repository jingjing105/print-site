import React, { useState } from 'react';
import './PosterCarousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';

const PosterCarousel = () => {
  //slide 2
  const sizeImages = [
    { src: '/images/smallDimensions.jpg', caption: [<span className="underline">Small Sized Posters-</span>, 'Perfect posters for personal touches'] },
    { src: '/images/mediumDimensions.jpg', caption: [<span className="underline">Medium Sized Posters-</span>, 'Perfect posters for balanced design'] },
    { src: '/images/largeDimensions.jpg', caption: [<span className="underline">Large Sized Posters-</span>, 'Perfect posters for maximum visual impact'] },
    { src: '/images/wide.jpg', caption: [<span className="underline">Wide Posters-</span>, 'Stretch your creativity up to 60 inches wide'] },
    { src: '/images/tall.jpg', caption: [<span className="underline">Tall Posters-</span>, 'Elevate your vision with unlimited length'] }
  ];
  //slide 3
  const images = [
    { src: '/images/consult.jpg', overlay: 'Personalized poster design.', caption: 'Design Consultation' },
    { src: '/images/quality.jpg', overlay: 'Vibrant, sharp, and professional prints.', caption: 'High-Quality Printing' },
    { src: '/images/inspect.jpg', overlay: 'Inspected for perfect results.', caption: 'Quality Inspection' },
    { src: '/images/satisfaction.jpg', overlay: "We're not happy until you are!", caption: 'Satisfaction Guaranteed' }
  ];

  // State to track the current image index -- slide 2
  const [currentSizeImageIndex, setCurrentSizeImageIndex] = useState(0);
  // State to track the current image index -- slide 3
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle clicking on the image to move to the next one -- slide 2
  const handleSizeImageClick = () => {
    setCurrentSizeImageIndex((prevIndex) =>
      prevIndex === sizeImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle clicking image to move to the next one -- slide 3
  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="poster-carousel-custom">
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        slidesPerView={1}
      >
        {/* Slide 1: Available Poster Selection */}
        <SwiperSlide>
          <section className="poster-slides-custom" id="poster-section">
            <h2>Explore Our Selection of Posters, Fit for Every Style and Need</h2>
            <div className="poster-row">
              <div className="poster-item">
                <img src="/images/photographic.jpg" alt="Photographic Poster" />
                <span className="poster-caption">Photographic</span>
              </div>
              <div className="poster-item">
                <img src="/images/minimal.jpg" alt="Minimalistic Poster" />
                <span className="poster-caption">Minimalistic</span>
              </div>
              <div className="poster-item">
                <img src="/images/abstract.jpg" alt="Abstract Poster" />
                <span className="poster-caption">Abstract</span>
              </div>
              <div className="poster-item">
                <img src="/images/typography.jpg" alt="Typography Poster" />
                <span className="poster-caption">Typography</span>
              </div>
              <div className="poster-item">
                <img src="/images/illustrative.jpg" alt="Illustrative Poster" />
                <span className="poster-caption">Illustrative</span>
              </div>
              <div className="poster-item">
                <img src="/images/popart.jpg" alt="Pop Art Poster" />
                <span className="poster-caption">Pop Art</span>
              </div>
              <div className="poster-item">
                <img src="/images/vintage.jpg" alt="Vintage Poster" />
                <span className="poster-caption">Vintage</span>
              </div>
              <div className="poster-item">
                <img src="/images/collage.jpg" alt="Collage Poster" />
                <span className="poster-caption">Collage</span>
              </div>
            </div>
          </section>
          <section className="poster-order-section">
            <a href="./posters">
              <button className="order-button-custom">Get Your Poster</button>
            </a>
          </section>
        </SwiperSlide>

        {/* Slide 2: Custom Poster Sizes */}
        <SwiperSlide>
          <section className="poster-slides-size" id="poster-size-section">
            <div className="poster-size-container">
              <div className="poster-size-click">
                <img
                  src={sizeImages[currentSizeImageIndex].src}
                  alt={`${sizeImages[currentSizeImageIndex].caption.join(' ')} Poster`}
                  onClick={handleSizeImageClick}
                  style={{ cursor: 'pointer' }}
                />
                <span className="poster-caption">
                  <div className="poster-text-content">
                    <h2>Browse Our Custom Poster Sizes</h2>
                  </div>
                  <div className="poster-description">
                    {sizeImages[currentSizeImageIndex].caption.map((line, index) => (
                      <span key={index}>{line}<br /></span>
                    ))}
                  </div>
                  <a href="./posters">
                    <button className="order-button-custom">Get Your Poster</button>
                  </a>
                </span>
              </div>
            </div>
            <div className="image-caption"><p>Click image to display next image</p></div>
          </section>

          {/*Column layout for when screen becomes too small*/}
          <section className="poster-slides-stack" id="poster-size-stack">
            <div className="poster-size-stack">
              <div className="poster-text-content2">
                <h2>Browse Our Custom Poster Sizes</h2>
                <p> Stretch your creativity up to 60 inches wide <br /> Elevate you vision with unlimited length</p>
              </div>
              <div className="poster-item2">
                <span className="poster-caption2">Small Sized Posters-Perfect posters for personal touches</span>
                <img src="/images/smallDimensions.jpg" alt="Small Dimesions of Poster" />
              </div>
              <div className="poster-item2">
                <span className="poster-caption2">Medium Sized Posters-Perfect posters for balanced design</span>
                <img src="/images/mediumDimensions.jpg" alt="Medium Dimensions of Poster" />
              </div>
              <div className="poster-item2">
                <span className="poster-caption2">Large Sized Posters-Perfect posters for maximum visual impact</span>
                <img src="/images/largeDimensions.jpg" alt="Large Dimesions of Poster" />
              </div>
              <a href="./posters">
                <button className="order-button-custom2">Get Your Poster</button>
              </a>
            </div>
          </section>
        </SwiperSlide>

        {/*Slide3： Process of Making Posters*/}
        <SwiperSlide>
          {/*Row layout*/}
          <section className="poster-slides-process" id="poster-process">
            <h2>A Look into Our Process</h2>
            <div className="poster-row2">
              <div className="poster-item3">
                <div class="image-container">
                  <img src="/images/consult.jpg" alt="Consultation Picture" />
                  <div class="overlay-text">Personalized poster design.</div>
                </div>
                <span className="poster-caption3">Design Consultation</span>
              </div>
              <div className="poster-item3">
                <div class="image-container">
                  <img src="/images/quality.jpg" alt="Quality Prints Picture" />
                  <div class="overlay-text">Vibrant, sharp, and professional prints.</div>
                </div>
                <span className="poster-caption3">High-Quality Printing</span>
              </div>
              <div className="poster-item3">
                <div class="image-container">
                  <img src="/images/inspect.jpg" alt="Quality Inspection Picture" />
                  <div class="overlay-text">Inspected for perfect results.</div>
                </div>
                <span className="poster-caption3">Quality Inspection</span>
              </div>
              <div className="poster-item3">
                <div class="image-container">
                  <img src="/images/satisfaction.jpg" alt="Satisfaction Guaranteed Picture" />
                  <div class="overlay-text">We're not happy until you are!</div>
                </div>
                <span className="poster-caption3">Satisfaction Guaranteed</span>
              </div>
            </div>
            <a href="./posters">
              <button className="order-button-custom3">Get Your Poster</button>
            </a>
          </section>

          {/*Clickable combined images for when screen is too small */}
          <div className="poster-process-click">
            <h2>A Look into Our Process</h2>
            <div className="poster-item3">
              <div className="image-container" style={{ position: 'relative' }}>
                <span className="poster-caption3">{images[currentImageIndex].caption}</span>
                <img
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].caption}
                  onClick={handleImageClick}
                />
                <div className="overlay-text" onClick={handleImageClick}>
                  {images[currentImageIndex].overlay}
                </div>
              </div>
            </div>
            <div className="image-caption2"><p>Click image to display next image</p></div>
            <a href="./posters">
              <button className="order-button-custom3">Get Your Poster</button>
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PosterCarousel;
