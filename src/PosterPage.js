import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './PosterPage.css';
import ReviewSection from './ReviewSection';

const PosterPage = () => {

  const images = [
    "/images/smallDimensions.jpg",
    "/images/mediumDimensions.jpg",
    "/images/largeDimensions.jpg",
    "/images/wide.jpg",
    "/images/tall.jpg",
  ];

  const sizeToImage = {
    '8.5" x 11"': "/images/smallDimensions.jpg",
    '11" x 17"': "/images/smallDimensions.jpg",
    '16" x 20"': "/images/smallDimensions.jpg",
    '18" x 24"': "/images/smallDimensions.jpg",
    '22" x 28"': "/images/mediumDimensions.jpg",
    '24" x 36"': "/images/mediumDimensions.jpg",
    '28" x 40"': "/images/mediumDimensions.jpg",
    '36" x 48"': "/images/largeDimensions.jpg",
    '40" x 60"': "/images/largeDimensions.jpg"
  };

  const orientationToImage = {
    Horizontal: "/images/wide.jpg",
    Vertical: "/images/tall.jpg",
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('8.5" x 11"');
  const [selectedOrientation, setSelectedOrientation] = useState('Horizontal');

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setSelectedSize(newSize);
    updateImage(newSize, selectedOrientation);
  };

  const handleOrientationChange = (e) => {
    const newOrientation = e.target.value;
    setSelectedOrientation(newOrientation);
    updateImage(selectedSize, newOrientation);
  };


  const updateImage = (size, orientation) => {
    const sizeImage = sizeToImage[size];

    if (sizeImage) {
      setCurrentIndex(images.indexOf(sizeImage));
    }
    else if (orientation === "Horizontal") {
      setCurrentIndex(images.indexOf(orientationToImage.Horizontal));
    } else if (orientation === "Vertical") {
      setCurrentIndex(images.indexOf(orientationToImage.Vertical));
    }
  };

  const [customHeight, setCustomHeight] = useState('');
  const [customWidth, setCustomWidth] = useState('');
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState('Matte');
  const finishPrices = { Matte: 0.00, 'Semi-Gloss': 2.00, Glossy: 3.00 };

  const predefinedPrices = {
    '8.5" x 11"': 5.99,
    '11" x 17"': 7.99,
    '16" x 20"': 9.99,
    '18" x 24"': 12.99,
    '22" x 28"': 15.99,
    '24" x 36"': 18.99,
    '28" x 40"': 24.99,
    '36" x 48"': 27.99,
    '40" x 60"': 29.99,
  };


  const calculatePrice = () => {
    let basePrice;
    if (useCustomSize) {
      const width = parseFloat(customWidth) || 0;
      const height = parseFloat(customHeight) || 0;
      if (width > 60 || width <= 0 || height <= 0) {
        return 'Invalid Size';
      }
      basePrice = (width * height * 0.05).toFixed(2);
    } else {
      basePrice = predefinedPrices[selectedSize];
    }
    const finishPrice = finishPrices[selectedFinish];
    return (parseFloat(basePrice) + finishPrice).toFixed(2);
  };

  const [activeTab, setActiveTab] = useState('overview');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div id="overview" className="tab-pane">
            <div className="tab-pane-text">
              <h2>Welcome to our poster printing service!</h2>
              <p>Whether you need a small poster for a personal project or a large banner for a special event, we offer high-quality prints that cater to all your needs.</p>

              <p>Choose from a range of standard sizes or create your own custom dimensions. </p>

              <p>
                <p>Decide the orientation of your poster: </p>
                <ul>
                  <li>
                    Vertical (tall)
                  </li>
                  <li>
                    Horizontal (wide)
                  </li>
                </ul>
                With multiple finish options for the perfect look and feel:
                <ul>
                  <li>
                    Matte
                  </li>
                  <li>
                    Semi-Gloss
                  </li>
                  <li>
                    Glossy
                  </li>
                </ul>
                Our posters are printed using cutting-edge technology, ensuring that every print is sharp, vibrant, and durable.
                <br />
              </p>
            </div>
            <img className="posterexample" src="/images/posterexample.jpg" />
          </div>
        );
      case 'options':
        return (
          <div id="options" className="tab-pane">
            <div className="tab-pane-text">
              <h2>Choose the perfect paper type:</h2>

              <div className="paper-option">
                <h3>Matte:</h3>
                <p>Non-reflective finish that provides a soft, smooth texture. It is less prone to glare and fingerprints. Best for dark colors, and posters where readability is important.</p>
              </div>

              <div className="paper-option">
                <h3>Semi-Gloss:</h3>
                <p> Balanced between matte and glossy. It has a slight sheen, which enhances colors without producing too much glare. Suitable for colorful posters, photography prints, and graphics that need a bit of shine.</p>
              </div>

              <div className="paper-option">
                <h3>Glossy:</h3>
                <p>Shiny and reflective finish that makes colors appear vibrant and sharp. Ideal for bright, high-contrast images, detailed graphics, and posters with bold colors.</p>
              </div>
            </div>
            <img className="choosepaper" src="/images/choose-right-paper.jpg" />
          </div>
        );

      case 'faq':
        return (
          <div id="faq" className="tab-pane">
            <div className="tab-pane-text2">
              <h2>Frequently Asked Questions</h2>

              <div className="faq-item">
                <h3>What sizes of posters do you offer?</h3>
                <p>
                  We provide both standard and custom sizes. Choose from sizes like 8x10, 16x20, 24x36, or customize up to 60 inches wide.
                </p>
              </div>

              <div className="faq-item">
                <h3>How should I prepare my design for printing?</h3>
                <p>
                  Make sure your design is 300 DPI, in CMYK color mode, and includes bleed and safety margins. Extend your design to the full bleed size, and keep important elements within the safety area.
                </p>
              </div>

              <div className="faq-item">
                <h3>What types of paper do you use?</h3>
                <p>
                  We offer Matte, Semi-Gloss, and Glossy paper. Each type has its own characteristics suited for different purposes. Check the 'Options' section for detailed descriptions and recommendations.
                </p>
              </div>

              <div className="faq-item">
                <h3>Can I order posters in bulk?</h3>
                <p>
                  Yes, we offer bulk discounts. Contact us for more information on pricing and shipping for bulk orders.
                </p>
              </div>

              <div className="faq-item">
                <h3>How long does shipping take?</h3>
                <p>
                  Standard shipping typically takes 5-7 business days. Expedited options are available for faster delivery.
                </p>
              </div>

              <div className="faq-item">
                <h3>Do you offer design services?</h3>
                <p>
                  Yes, we have an in-house design team that can help you create a custom poster. Contact us for more details on pricing and design consultation.
                </p>
              </div>

              <div className="faq-item">
                <h3>Can I request a proof before printing?</h3>
                <p>
                  Yes, we can provide a digital proof for your review before printing. Please indicate this request when placing your order.
                </p>
              </div>
            </div>
          </div>
        );

    }
  };

  return (
    <div className="poster-selling-page">
      <Navbar />
      <div className="poster-page">

        <div className="image-preview">
          <div className="pcarousel">
            <img src={images[currentIndex]} alt={`Poster Preview ${currentIndex + 1}`} />
            <button className="prev" aria-label="Previous Slide" onClick={handlePrev}>
              ⟨
            </button>
            <button className="next" aria-label="Next Slide" onClick={handleNext}>
              ⟩
            </button>
          </div>


          <div className="thumbnails">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(index)}
                className={index === currentIndex ? "active-thumbnail" : ""}
              />
            ))}
          </div>
        </div>


        <div className="product-details">
          <h2>Poster Printing</h2>
          <div className="poster-options">
            <h3>Choose between standard poster sizes or create your own custom size:</h3>
            <label>
              <input
                type="checkbox"
                checked={useCustomSize}
                onChange={() => setUseCustomSize(!useCustomSize)}
              />
              Use Custom Size <br />
            </label>
            <br />

            {!useCustomSize && (
              <>
                <label>Poster Orientation: </label>
                <select value={selectedOrientation} onChange={handleOrientationChange} className="select-box">
                  <option value="Vertical">Vertical (tall)</option>
                  <option value="Horizontal">Horizontal (wide)</option>
                </select>
                <br />
              </>
            )}

            {!useCustomSize && (
              <>
                <label>Standard Sizes:  </label>
                <select value={selectedSize} onChange={handleSizeChange} className="select-box">
                  <option>8.5" x 11"</option>
                  <option>11" x 17"</option>
                  <option>16" x 20"</option>
                  <option>18" x 24"</option>
                  <option>22" x 28"</option>
                  <option>24" x 36"</option>
                  <option>28" x 40"</option>
                  <option>36" x 48"</option>
                  <option>40" x 60"</option>
                </select>
                <br />
              </>
            )}

            {useCustomSize && (
              <div className="custom-size-container">
                <label className="custom-size-label">Custom Size (H" x W"):  </label>
                <input
                  className="custom-size-input"
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  min="1"
                  placeholder="Height"
                />

                <span className="separator"> x </span>
                <input
                  className="custom-size-input"
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  min="1"
                  max="60"
                  placeholder="Width (max 60 inches)"
                />
              </div>
            )}

            <label>Finish Options:  </label>
            <select value={selectedFinish} onChange={(e) => setSelectedFinish(e.target.value)} className="select-box">
              <option>Matte</option>
              <option>Semi-Gloss</option>
              <option>Glossy</option>
            </select>
          </div>

          <div className="price-section">
            <span className="new-price">${calculatePrice()}</span>
          </div>

          <a href="./custom"><button className="create-btn">Create your Poster</button></a>
          <br />
        </div>
        <div className="poster-selling-page">
        </div>
      </div>

      <div className="nav-tabs">
        <div
          className={`tab ${activeTab === 'overview' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </div>
        <div
          className={`tab ${activeTab === 'options' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('options')}
        >
          Options
        </div>
        <div
          className={`tab ${activeTab === 'faq' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </div>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
      <ReviewSection />
      <Footer />
    </div>
  );
};

export default PosterPage;
