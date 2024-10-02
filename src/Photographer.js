import React from 'react';
import './Photographer.css';

const Photographer = () => {
    return (
        <section className="photography-section">
            <h2>Book Your Personal Photographer in New York City!</h2>
            <p>📅 Flexible Scheduling for Personal or Business</p>
            <div className="photography-container">
                <div className="photography-item">
                    <img src="/images/headshot.jpg" alt="Portrait" />
                    <span className="photography-caption">📸 Portrait Photography</span>
                </div>
                <div className="photography-item">
                    <img src="/images/NYC.jpg" alt="NYC" />
                    <span className="photography-caption">🗽 Capture Iconic NYC Backdrops</span>
                </div>
                <div className="photography-item">
                    <img src="/images/ocat.jpg" alt="Cat" />
                    <span className="photography-caption">🐾 Capture Your Pet's Personality</span>
                </div>
                <div className="photography-item">
                    <img src="/images/family.jpg" alt="Family" />
                    <span className="photography-caption">👨‍👩‍👧‍👦 Timeless Photos With Loved Ones </span>
                </div>
            </div>
             <a href="./photographer">
              <button className="photographer-button">Book Now!</button>
            </a>
        </section>
    );
};
export default Photographer;