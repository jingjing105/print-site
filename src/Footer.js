// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <form class="newsletter-signup">
                <label for="email">Subscribe to our newsletter: </label>
                <input type="email" id="email" placeholder="Please enter your email address" />
                <button type="submit">Subscribe</button>
            </form>
            <div class="footer-content">
                <ul class="footer-links">
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>
                </ul>
                <hr />
                <div class="media-payment-delivery">
                    <div class="social-media">
                        <h3>Get in Touch</h3>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src="/images/facebook.png" alt="Facebook" /></a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer"><img src="/images/twitter.png" alt="X" /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src="/images/instagram.png" alt="Instagram" /></a>
                    </div>
                    <div class="secure-payment">
                        <h3>Secure Payment</h3>
                        <img src="/images/paypal.png" alt="PayPal" />
                        <img src="/images/visa.png" alt="Visa" />
                        <img src="/images/mastercard.png" alt="MasterCard" />
                    </div>
                    <div class="certified-delivery">
                        <h3>Certified Delivery</h3>
                        <img src="/images/ups.png" alt="UPS" />
                        <img src="/images/fedex.png" alt="FedEx" />
                    </div>
                </div>
                <hr />
                <p>&copy; 2024 Let'sPrint. All rights reserved.</p>
            </div>
        </footer>

    );
};

export default Footer;
