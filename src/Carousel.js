import React, { useEffect, useState } from 'react';
import './Carousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';


const Carousel = () => {

    const leftImages = [
        '/images/person.JPG',
        '/images/person2.jpg',
        '/images/person3.jpg',
        '/images/person4.jpg',
        '/images/person5.jpg',
        '/images/person6.jpg',
        '/images/person7.jpg',
        '/images/person8.jpg'
    ];

    const rightImages = [
        '/images/curly.jpg',
        '/images/katra.jpg',
        '/images/curly3.JPG',
        '/images/katra2.JPG',
        '/images/curly2.JPG',
        '/images/puppy.JPG',
        '/images/oreo2.JPG',
        '/images/oreo.JPG'
    ];

    const combinedImages = [
        '/images/oreo.JPG',
        '/images/person.jpg',
        '/images/person2.jpg',
        '/images/curly3.JPG',
        '/images/person3.jpg',
        '/images/person4.jpg',
        '/images/person5.jpg',
        '/images/curly2.JPG',
        '/images/person6.jpg',
        '/images/puppy.JPG',
        '/images/person7.jpg',
        '/images/person8.jpg',
        '/images/curly.jpg',
        '/images/katra.jpg',
        '/images/oreo2.JPG',
        '/images/katra2.JPG'
    ];

    const leftSmallImages = [
        '/images/person.JPG',
        '/images/person2.jpg',
        '/images/person3.jpg',
        '/images/person4.jpg',
        '/images/person5.jpg',
        '/images/person6.jpg',
        '/images/person7.jpg',
        '/images/person8.jpg'
    ];

    const rightSmallImages = [
        '/images/curly.jpg',
        '/images/katra.jpg',
        '/images/curly3.JPG',
        '/images/katra2.JPG',
        '/images/curly2.JPG',
        '/images/puppy.JPG',
        '/images/oreo2.JPG',
        '/images/oreo.JPG'
    ];

    const imageList = [
        "/images/poster1.jpg",
        "/images/poster2.jpg",
        "/images/poster3.jpg",
        "/images/poster4.jpg",
        "/images/poster5.jpg",
        "/images/poster6.jpg",
        "/images/poster7.jpg",
        "/images/poster8.jpg",
        "/images/poster9.jpg",
        "/images/poster10.jpg",
        "/images/poster11.jpg",
        "/images/poster12.jpg",
        "/images/poster13.jpg",
        "/images/poster14.jpg",
        "/images/poster15.jpg",
        "/images/poster16.jpg",
        "/images/poster17.jpg",
        "/images/poster18.jpg",
        "/images/poster19.jpg",
        "/images/poster20.jpg",
        "/images/poster21.jpg"
    ];


    const [currentLeftImageIndex, setCurrentLeftImageIndex] = useState(0);
    const [currentRightImageIndex, setCurrentRightImageIndex] = useState(0);
    const [currentCombinedImageIndex, setCurrentCombinedImageIndex] = useState(0);
    const [currentLeftSmallImageIndex, setCurrentLeftSmallImageIndex] = useState(0);
    const [currentRightSmallImageIndex, setCurrentRightSmallImageIndex] = useState(0);

    const [currentImages, setCurrentImages] = useState(imageList.slice(0, 7));
    const [currentIndex, setCurrentIndex] = useState(0);

    // Timer for the left images
    useEffect(() => {
        const leftTimer = setInterval(() => {
            setCurrentLeftImageIndex((prevIndex) => (prevIndex + 1) % leftImages.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(leftTimer);
    }, [leftImages.length]);

    // Timer for the right images
    useEffect(() => {
        const rightTimer = setInterval(() => {
            setCurrentRightImageIndex((prevIndex) => (prevIndex + 1) % rightImages.length);
        }, 3000);

        return () => clearInterval(rightTimer);
    }, [rightImages.length]);

    //Timer for the combined images
    useEffect(() => {
        const combinedTimer = setInterval(() => {
            setCurrentCombinedImageIndex((prevIndex) => (prevIndex + 1) % combinedImages.length);
        }, 3000);

        return () => clearInterval(combinedTimer);
    }, [combinedImages.length]);

    // Timer for the left small images
    useEffect(() => {
        const leftSmallTimer = setInterval(() => {
            setCurrentLeftSmallImageIndex((prevIndex) => (prevIndex + 1) % leftSmallImages.length);
        }, 3000);

        return () => clearInterval(leftSmallTimer);
    }, [leftSmallImages.length]);

    // Timer for the right small images
    useEffect(() => {
        const rightSmallTimer = setInterval(() => {
            setCurrentRightSmallImageIndex((prevIndex) => (prevIndex + 1) % rightSmallImages.length);
        }, 3000);

        return () => clearInterval(rightSmallTimer);
    }, [rightSmallImages.length]);


    //----------------------------------------------------------------------------------------
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const newIndex = (prevIndex + 1) % imageList.length;
                setCurrentImages(imageList.slice(newIndex, newIndex + 7).concat(imageList.slice(0, Math.max(0, newIndex + 7 - imageList.length))));
                return newIndex;
            });
        }, 2000); // Change image every 2 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);


    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            modules={[Pagination, Navigation]}
        >
            {/* 1st slide for Carousel--Posters */}
            <SwiperSlide>
                <div className="carousel-container">
                    <div className="carousel-image" id="person" style={{ backgroundImage: 'url("/images/LargePoster.jpg")' }}></div>
                    <div className="carousel-image" id="cat" style={{ backgroundImage: 'url("/images/cat.jpg")' }}></div>
                </div>
                <div className="carousel-text">
                    <a href="/posters"><h2>Print Larger Than Life for a Fraction of the Price</h2></a>
                    <p>Your go-to place for custom large posters.</p>
                </div>

                {/* For carousel Layout when the screen becomes too small */}
                <div className="carousel-slide-vertical">
                    <div className="carousel-text-top">
                        <a href="/posters"><h2>Print Larger Than Life for a Fraction of the Price</h2></a>
                        <p>Your go-to place for custom large posters.</p>
                    </div>
                    <div className="carousel-container-small">
                        <div className="carousel-image-small" id="person-small" style={{ backgroundImage: 'url("/images/LargePoster.jpg")' }}></div>
                        <div className="carousel-image-small" id="cat-small" style={{ backgroundImage: 'url("/images/cat.jpg")' }}></div>
                    </div>
                </div>
            </SwiperSlide>

            {/* 2nd slide for Carousel--Photographers */}
            <SwiperSlide>
                <div className="carousel-multiple-images">
                    <div className="carousel-image-left" style={{ backgroundImage: `url("${leftImages[currentLeftImageIndex]}")` }}></div>
                    <div className="carousel-text-inline">
                        <a href="/photographer">
                            <h2>Need a Photographer? <br />
                                Local Photographer at Your Service!
                            </h2>
                        </a>
                        <p>Capture your special day with our exclusive photo-poster deal!</p>
                        <a href="photographer"><img src="/images/camera.png" alt="Camera" className="inline-icon" /></a>
                    </div>
                    <div className="carousel-image-right" style={{ backgroundImage: `url("${rightImages[currentRightImageIndex]}")` }}></div>
                    <div className="carousel-image-combined" style={{ backgroundImage: `url("${combinedImages[currentCombinedImageIndex]}")` }}></div>
                </div>

                {/* For carousel Layout when the screen becomes too small */}
                <div className="carousel-slide-vertical2">
                    <div className="carousel-text-top2">
                        <a href="/photographer">
                            <h2>Need a Photographer? <br />
                                Local Photographer at Your Service!
                            </h2>
                        </a>
                        <p>Capture your special day with our exclusive photo-poster deal!</p>
                    </div>
                    <div className="carousel-container-small2">
                        <div className="carousel-image-left-small" style={{ backgroundImage: `url("${leftSmallImages[currentLeftSmallImageIndex]}")` }}></div>
                        <div className="carousel-image-right-small" style={{ backgroundImage: `url("${rightSmallImages[currentRightSmallImageIndex]}")` }}></div>
                    </div>
                </div>
            </SwiperSlide>

            {/* 3rd slide for Carousel--Custom */}
            <SwiperSlide>
                <div className="carousel-slide-vertical3">
                    {/* Text Section */}
                    <div className="carousel-text-top3">
                        <a href="/custom"><h2>Your Vision, Our Canvas—Custom Designs and Templates for Every Poster!</h2></a>
                        <p>Design, explore, and visualize with our Project workspace</p>
                    </div>
                    <div className="carousel-multiple-images3">
                        {currentImages.map((image, index) => (
                            <div
                                key={index}
                                className="carousel-image3"
                                style={{ backgroundImage: `url("${image}")` }}
                            ></div>
                        ))}
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Carousel;
