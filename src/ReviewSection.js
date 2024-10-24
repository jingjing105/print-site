import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReviewSection.css'; 

const ReviewSection = () => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [recommendPercentage, setRecommendPercentage] = useState(0);
    const [ratingsDistribution, setRatingsDistribution] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reviews');
                setReviews(response.data);
                
                const totalReviews = response.data.length;
                const totalRating = response.data.reduce((sum, review) => sum + review.rating, 0);
                const recommendCount = response.data.filter(review => review.recommended).length;
                const distribution = response.data.reduce((acc, review) => {
                    acc[review.rating] = (acc[review.rating] || 0) + 1;
                    return acc;
                }, {});

                setAverageRating((totalRating / totalReviews).toFixed(1));
                setRecommendPercentage(((recommendCount / totalReviews) * 100).toFixed(0));
                setRatingsDistribution(distribution);
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
                {Array(fullStars).fill().map((_, i) => <span key={`full-${i}`} className="star">★</span>)}
                {halfStar && <span className="star half">☆</span>}
                {Array(emptyStars).fill().map((_, i) => <span key={`empty-${i}`} className="star empty">☆</span>)}
            </>
        );
    };

    const handleWriteReview = () => {
        navigate('/submit-review');
    };

    return (
        <div className="review-section">
            <h2>Reviews</h2>
            <div className="review-summary">
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
                    return (
                        <div key={starCount} className="rating-row">
                            <span>{starCount} Stars</span>
                            <div className="rating-bar">
                                <div 
                                    className="filled-bar" 
                                    style={{ width: `${(count / reviews.length) * 100}%` }}
                                ></div>
                            </div>
                            <span>{count}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ReviewSection;
