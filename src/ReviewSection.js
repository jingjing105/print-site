import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Modal from 'react-modal';
import { useUser } from "./UserContext";
import './ReviewSection.css';

const ReviewSection = () => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [recommendPercentage, setRecommendPercentage] = useState(0);
    const [ratingsDistribution, setRatingsDistribution] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
    const [mediaItems, setMediaItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('Most Recent');
    const { userIsLoggedIn } = useUser();

    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5;

    const reviewSectionRef = useRef(null);

    const navigate = useNavigate();
    const { user, setRedirectPath } = useUser();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reviews');
                setReviews(response.data);

                const allMedia = response.data.flatMap((review) =>
                    review.media.map((media) => ({ ...media, review }))
                );

                const totalReviews = response.data.length;
                const totalRating = response.data.reduce((sum, review) => sum + review.rating, 0);
                const recommendCount = response.data.filter((review) => review.recommended).length;
                const distribution = response.data.reduce((acc, review) => {
                    acc[review.rating] = (acc[review.rating] || 0) + 1;
                    return acc;
                }, {});

                setAverageRating(totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0);
                setRecommendPercentage(((recommendCount / totalReviews) * 100).toFixed(0));
                setRatingsDistribution(distribution);
                setMediaItems(allMedia);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {Array(fullStars).fill().map((_, i) => <span key={`full-${i}`} className="star filled">★</span>)}
                {halfStar && <span key="half" className="star half">☆</span>}
                {Array(emptyStars).fill().map((_, i) => <span key={`empty-${i}`} className="star empty">☆</span>)}
            </>
        );
    };

    const handleWriteReview = () => {
        if (!userIsLoggedIn) {
            setRedirectPath("/submit-review");
            navigate('/login', { state: { from: '/submit-review' } });
          } else {
            navigate('/submit-review');
          }
    };

    const openModal = (mediaIndex) => {
        setSelectedMediaIndex(mediaIndex);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMediaIndex(null);
    };

    const goToNextReview = () => {
        setSelectedMediaIndex((prevIndex) =>
            prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevReview = () => {
        setSelectedMediaIndex((prevIndex) =>
            prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
        );
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const highlightText = (text, query) => {
        if (!query) return text;

        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
            ) : (
                part
            )
        );
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const filteredAndSortedReviews = reviews
        .filter(review => review.review_text.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortOption === 'Highest Rated') return b.rating - a.rating;
            if (sortOption === 'Lowest Rated') return a.rating - b.rating;
            if (sortOption === 'Oldest') return new Date(a.created_at) - new Date(b.created_at);
            return new Date(b.created_at) - new Date(a.created_at);
        });

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredAndSortedReviews.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(filteredAndSortedReviews.length / reviewsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        reviewSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="review-section" >
            <hr />
            <br />
            <div className="review-head">
                <div className="review-summary">
                    <h1>Reviews</h1>
                    <div className="average-rating">
                        <span className="stars">{renderStars(averageRating)}</span>
                        <span className="rating-number">{averageRating} ({reviews.length})</span>
                    </div>
                    <button className="write-review-button" onClick={handleWriteReview}>Write a Review</button>
                </div>

                <div className="recommendation">
                    <h3>{recommendPercentage}%</h3>
                    <p>of respondents would recommend this to a friend</p>
                </div>

                <div className="ratings-distribution">
                    {Array.from({ length: 5 }, (_, i) => {
                        const starCount = 5 - i;
                        const count = ratingsDistribution[starCount] || 0;
                        const percentage = (count / reviews.length) * 100;
                        return (
                            <div key={starCount} className="rating-row">
                                <span>{starCount} Stars</span>
                                <div className="rating-bar">
                                    <div
                                        className="filled-bar"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <span>{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <br />
            <hr />

            {/* Media Carousel */}
            <h2 className="media-carousel-header">Reviews with images</h2>
            <div className="media-carousel">

                <Swiper
                    slidesPerView={6}
                    navigation={{
                        prevEl: '.custom-prev',
                        nextEl: '.custom-next',
                    }}
                    modules={[Navigation]}
                    breakpoints={{
                        1500: {
                            slidesPerView: 6
                        },
                        1200: {
                            slidesPerView: 5
                        },
                        1000: {
                            slidesPerView: 4,
                        },
                        700: {
                            slidesPerView: 3,
                        },
                        600: {
                            slidesPerView: 2,
                        },
                        400: {
                            slidesPerView: 2,
                        }
                    }}
                >
                    {mediaItems.map((media, index) => (
                        <SwiperSlide key={index}>
                            {media.media_type === 'photo' ? (
                                <img
                                    src={`http://localhost:5000/${media.file_path}`}
                                    alt="User uploaded"
                                    className="carousel-image"
                                    onClick={() => openModal(index)}
                                />
                            ) : (
                                <video
                                    src={`http://localhost:5000/${media.file_path}`}
                                    controls
                                    className="carousel-video"
                                    onClick={() => openModal(index)}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="custom-prev">⟨</button>
                <button className="custom-next">⟩</button>
            </div>

            {/* Modal */}
            {isModalOpen && selectedMediaIndex !== null && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Review Details"
                    ariaHideApp={false}
                    className="review-modal"
                    overlayClassName="modal-overlay"
                >
                    {mediaItems[selectedMediaIndex] && (
                        <div className="review-modal-content">
                            <button onClick={closeModal} className="close-button">X</button>
                            <button onClick={goToPrevReview} className="prev-button">◀</button>
                            <div className="modal-media">
                                {mediaItems[selectedMediaIndex].media_type === 'photo' ? (
                                    <img
                                        src={`http://localhost:5000/${mediaItems[selectedMediaIndex].file_path}`}
                                        alt="User uploaded"
                                        className="modal-image"
                                    />
                                ) : (
                                    <video
                                        src={`http://localhost:5000/${mediaItems[selectedMediaIndex].file_path}`}
                                        controls
                                        className="modal-video"
                                    />
                                )}
                            </div>
                            <button onClick={goToNextReview} className="next-button">▶</button>
                            <div className="modal-info">
                                <div className="review-header">
                                    <span className="stars">{renderStars(mediaItems[selectedMediaIndex].review.rating)}</span>
                                    <span className="rating-number">{mediaItems[selectedMediaIndex].review.rating}</span>
                                </div>
                                <h2 className="review-title">{mediaItems[selectedMediaIndex].review.review_title}</h2>
                                <div className="review-meta">
                                    <span>{new Date(mediaItems[selectedMediaIndex].review.created_at).toLocaleDateString()}</span>
                                    <span> | {mediaItems[selectedMediaIndex].review.name || "Anonymous"}</span>
                                </div>
                                <p className="review-text">{mediaItems[selectedMediaIndex].review.review_text}</p>
                            </div>
                        </div>
                    )}
                </Modal>
            )}
            <br />
            <hr />

            <div className="review-list-section" ref={reviewSectionRef}>
                <div className="review-head-section">
                    <h2 className="review-list-heading">Reviewed by {reviews.length} customers</h2>
                    <div className="review-controls">
                        <input
                            type="text"
                            placeholder="Search reviews"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="review-search"
                        />

                        <select value={sortOption} onChange={handleSortChange} className="review-sort">
                            <option value="Most Recent">Most Recent</option>
                            <option value="Oldest">Oldest</option>
                            <option value="Highest Rated">Highest Rated</option>
                            <option value="Lowest Rated">Lowest Rated</option>
                        </select>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="reviews-list">
                    {currentReviews.map((review, reviewIndex) => (
                        <div key={reviewIndex} className="review-item">
                            <span className="review-rating">{renderStars(review.rating)}</span>
                            <p className="review-title">{review.review_title}</p>

                            <div className="review-header">
                                <span className="review-author">{review.name || "Anonymous"}</span>
                                <span className="review-date">{new Date(review.created_at).toLocaleDateString()}</span>
                                <span className="review-recommendation">Recommended: {review.recommended ? "Yes" : "No"}</span>
                            </div>

                            <p className="review-text"> {highlightText(review.review_text, searchQuery)}</p>
                            {review.media && review.media.length > 0 && (
                                <div className="review-media">
                                    {review.media.map((media, mediaIdx) => {

                                        const mediaIndex = mediaItems.findIndex(
                                            (item) =>
                                                item.file_path === media.file_path &&
                                                item.review &&
                                                item.review.review_id === review.review_id
                                        );

                                        if (mediaIndex === -1) return null;
                                        return media.media_type === 'photo' ? (
                                            <img
                                                key={mediaIdx}
                                                src={`http://localhost:5000/${media.file_path}`}
                                                alt="User uploaded"
                                                className="review-media-image"
                                                onClick={() => openModal(mediaIndex)}
                                            />
                                        ) : (
                                            <video
                                                key={mediaIdx}
                                                src={`http://localhost:5000/${media.file_path}`}
                                                controls
                                                className="review-media-video"
                                                onClick={() => openModal(mediaIndex)}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="pagination-container">
                    <p>Displaying Reviews {indexOfFirstReview + 1}-{Math.min(indexOfLastReview, reviews.length)} of {reviews.length}</p>
                    <div className="pagination-buttons">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>

                        {[...Array(totalPages).keys()].map(number => {
                            const page = number + 1;
                            const isFirstPage = page === 1;
                            const isLastPage = page === totalPages;
                            const isCurrentPage = page === currentPage;
                            const isNearCurrentPage = Math.abs(currentPage - page) <= 1;

                            if (isFirstPage || isLastPage || isNearCurrentPage) {
                                return (
                                    <button
                                        key={page}
                                        onClick={() => paginate(page)}
                                        className={isCurrentPage ? 'active' : ''}
                                    >
                                        {page}
                                    </button>
                                );
                            } else if (
                                (page === currentPage - 2 && page > 1) ||
                                (page === currentPage + 2 && page < totalPages)
                            ) {
                                return <span key={page}>...</span>;
                            }
                            return null;
                        })}

                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;
