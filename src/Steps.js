import React from 'react';
import './Steps.css';

const Steps = () => {
    const steps = [
        {
            image: '/images/upload.png',
            title: 'Upload your Image',
        },
        {
            image: '/images/customize.png',
            title: 'Create and Design',
        },
        {
            image: '/images/selection.png',
            title: 'Select your Size and Material',
        },
        {
            image: '/images/customize.png',
            title: 'Add Touch Ups',
        },
        {
            image: '/images/add-to-cart.png',
            title: 'Finally Add to Cart',
        },
    ];

    return (
        <div className="steps-container">
            <h2>Your Guide to Custom Poster Printing</h2>
            <div className="steps">
                {steps.map((step, index) => (
                    <div key={index} className="step">
                        <img src={step.image} alt={`Step ${index + 1}`} className="step-icon" />
                        <p className="step-title">{step.title}</p>
                    </div>
                ))}
            </div>
            <a href='/posters'><button className="make-poster-button">MAKE YOUR OWN POSTER</button></a>
        </div>
    );
};

export default Steps;
