import React, { useState } from 'react';
import Navbar from './Navbar';
import './PhotographerPage.css';
import axios from 'axios';

const PhotographerPage = () => {

    const steps = [
        {
            image: '/images/appointment.png',
            title: 'Book your Photo Shoot',
        },
        {
            image: '/images/pic.png',
            title: 'Get your Pictures Taken',
        },
        {
            image: '/images/pick.png',
            title: 'Select your Pictures and Poster Material',
        },
        {
            image: '/images/edit.png',
            title: 'Edit the Posters',
        },
        {
            image: '/images/discount.png',
            title: 'Add to Cart with 20% Off',
        },
    ];


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const ABSTRACT_API_KEY = process.env.REACT_APP_ABSTRACT_API_KEY;
    const validateEmailWithAPI = async (email) => {
        try {
            const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&email=${email}`);
            if (response.data && response.data.is_valid_format && response.data.is_smtp_valid) {
                return response.data.is_valid_format.value && response.data.is_smtp_valid.value;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Email validation API error:", error);
            return false;
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email with API
        const isEmailValid = await validateEmailWithAPI(formData.email);
        console.log('Email validation result:', isEmailValid);

        if (!isEmailValid) {
            setError('Please enter a valid email address.');
            return;
        }

        setError('');

        fetch('https://formspree.io/f/xvgopqjk', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(async (response) => {
                console.log('Formspree response status:', response.status);
                const data = await response.json();
                console.log('Formspree response data:', data);

                if (response.ok) {
                    setSubmitted(true);
                } else {
                    console.error('Formspree error data:', data);
                    setError(`Failed to send email. Error: ${data.error || 'Unknown error'}`);
                }
            })
            .catch((error) => {
                setError('Oops! There was a problem sending your email.');
                console.error('Error sending email:', error);
            });
    };


    return (
        <div className="photographer-page">
            <Navbar />
            {/* Hero Section */}
            <section className="hero-section" id="hero">
                <img src="/images/photographybg.jpg" alt="Showcase" className="hero-image" />
                <div className="hero-text">
                    <h1>Capture Life's Moments</h1>
                    <p>Professional Photography Services in NYC</p>
                </div>
                <div className="scroll-buttons">
                    <a href="#about" className="scroll-button">Meet Your Photographer</a>
                    <a href="#portfolio" className="scroll-button">Memorable Photos</a>
                    <a href="#services" className="scroll-button">Services</a>
                    <a href="#contact" className="scroll-button">Book a Session</a>
                </div>
                <img src="/images/scroll-down.png" alt="arrow down" className="scroll-down" />
            </section>

            {/* About Section */}
            <section className="about-section" id="about">
                <h2>Meet Your Photographer</h2>
                <div className="images-container">
                    <img src="/images/photographer-image.JPG" alt="Photographer" className="photographer-image" />
                    <img src="/images/photographer-image2.JPG" alt="Photographer" className="photographer-image" />
                </div>
                <p>"I am a NYC-based photographer specializing in portrait and event photography. <br /> I am passionate about capturing the essence of your special moments—every shot tells a unique story."</p>
            </section>

            {/* Portfolio Section */}
            <section className="portfolio-section" id="portfolio">
                <h2>Memorable Photos of This Year</h2>
                <p>Trip to Cayman Islands 2024</p>
                <div className="user-review"><p>"The photos beautifully captured the heart of our group. <br /> Each shot brought out the laughter and joy we shared, turning every moment into a lasting memory. - Tony"</p></div>
                <div className="portfolio-grid">
                    <img src="/images/trip.jpg" alt="Trip 1" />
                    <img src="/images/trip11.jpg" alt="Trip 11" />
                    <img src="/images/trip2.jpg" alt="Trip 2" />
                    <img src="/images/trip4.jpg" alt="Trip 4" />
                    <img src="/images/trip13.jpg" alt="Trip 13" />
                    <img src="/images/trip7.jpg" alt="Trip 7" />
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section" id="services">
                <h2>Our Services</h2>
                <p className="services-title">Photography services starting at just <b>$100 per hour</b> and get <b>20% OFF</b> our <b>Photo-Poster Package</b> when you book a photography session with us.</p>
                <div className="photography-steps">
                    {steps.map((step, index) => (
                        <div key={index} className="photography-step">
                            <img src={step.image} alt={`Step ${index + 1}`} className="photography-step-icon" />
                            <p className="photography-step-title">{step.title}</p>
                        </div>
                    ))}
                </div>
                <h3>Book Below!</h3>
                <img src="/images/scroll-down.png" alt="arrow down" className="scroll" />
            </section>

            {/* Contact Section */}
            <section className="contact-section" id="contact">
                <h2>Book a Session</h2>
                {!submitted ? (
                    <form onSubmit={handleSubmit}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <label>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell me about your event or session"
                            required
                        ></textarea>

                        <button type="submit">Submit</button>
                    </form>
                ) : (
                    <h4>Thank you for reaching out! We will get back to you soon.</h4>
                )}
                <footer className="footer">
                    <p>© 2024 Let's Print | Photography by Yan</p>
                </footer>
            </section>
        </div>
    );
};
export default PhotographerPage;
