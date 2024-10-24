import { useState } from 'react';
import axios from 'axios';

const SubmitReview = () => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [recommended, setRecommended] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/reviews', {
                rating,
                review: reviewText,
                recommended
            });
            alert("Review submitted successfully!");
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div className="submit-review">
            <h2>Submit Your Review</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rating (1-5):</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Your Review:</label>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Would you recommend this to a friend?</label>
                    <input
                        type="checkbox"
                        checked={recommended}
                        onChange={(e) => setRecommended(e.target.checked)}
                    />
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default SubmitReview;
