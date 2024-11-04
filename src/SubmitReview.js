import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from './firebase';
import './SubmitReview.css';

const SubmitReview = () => {
    const [firebaseUid, setFirebaseUid] = useState(null);
    const [rating, setRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [name, setName] = useState('');
    const [recommended, setRecommended] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [photoPreviews, setPhotoPreviews] = useState([]);
    const [videoPreviews, setVideoPreviews] = useState([]);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setFirebaseUid(user.uid);
                console.log('User is logged in:', user.uid);
            } else {
                setFirebaseUid(null);
                console.log('User is not logged in');
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setFirebaseUid(user.uid);
            setName(user.displayName || '');
        }
    }, []);

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setPhotos(prevPhotos => [...prevPhotos, ...files]);
        setPhotoPreviews(prevPreviews => [...prevPreviews, ...previews]);
    };

    const handleVideoChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setVideos(prevVideos => [...prevVideos, ...files]);
        setVideoPreviews(prevPreviews => [...prevPreviews, ...previews]);
    };

    const removePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
        setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
    };

    const removeVideo = (index) => {
        setVideos(videos.filter((_, i) => i !== index));
        setVideoPreviews(videoPreviews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firebaseUid) {
            console.error("User is not logged in.");
            return;
        }

        const formData = new FormData();
        formData.append("firebase_uid", firebaseUid);
        formData.append("rating", rating);
        formData.append("review_title", reviewTitle);
        formData.append("review_text", reviewText);
        formData.append("recommended", recommended);
        formData.append("name", name);

        photos.forEach(photo => formData.append('photos', photo));
        videos.forEach(video => formData.append('videos', video));

        try {
            const response = await axios.post('http://localhost:5000/api/reviews', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log("Review submitted successfully:", response.data);
            setMessage({ type: 'success', text: "Review submitted successfully!" });

            setPhotos([]);
            setVideos([]);
            setPhotoPreviews([]);
            setVideoPreviews([]);
            setReviewTitle('');
            setReviewText('');
            setRecommended(false);
            setRating(0);

            setTimeout(() => {
                navigate('/posters');
            }, 3000);

        } catch (error) {
            console.error("Error submitting review:", error);
            setMessage({ type: 'error', text: "Failed to submit review. Please try again." });

            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            }
        }
    };

    return (
        <div className="submit-review">
            <h2>Submit Your Review</h2>

            <form onSubmit={handleSubmit}>

                {/* Star Rating */}
                <div className="rating">
                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            onClick={() => setRating(i + 1)}
                            className={`star ${i < rating ? 'filled' : ''}`}
                        >
                            ★
                        </span>
                    ))}
                </div>

                {/* Review Title */}
                <input
                    type="text"
                    placeholder="* Review title"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    required
                />

                {/* Review Text */}
                <textarea
                    placeholder="* Write your review here"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                    className="reviewText"
                />

                {/* Recommendation */}
                <div className="recommend-checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={recommended}
                            onChange={(e) => setRecommended(e.target.checked)}
                        />
                        Would you recommend this to a friend?
                    </label>
                </div>

                {/* Name */}
                <input
                    type="text"
                    placeholder="* Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                {/*Photos and Videos */}
                <input
                    type="file"
                    id="photoInput"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoChange}
                    style={{ display: 'none' }}
                />
                <input
                    type="file"
                    id="videoInput"
                    accept="video/*"
                    multiple
                    onChange={handleVideoChange}
                    style={{ display: 'none' }}
                />

                {/* Media Buttons */}
                <div className="media-buttons">
                    <button
                        type="button"
                        className="add-photo"
                        onClick={() => document.getElementById('photoInput').click()}
                    >
                        Add Photos
                    </button>
                    <button
                        type="button"
                        className="add-video"
                        onClick={() => document.getElementById('videoInput').click()}
                    >
                        Add Videos
                    </button>
                </div>

                {/* Previews */}
                <div className="previews">
                    {photoPreviews.map((src, index) => (
                        <div key={index} className="preview">
                            <img src={src} alt="Photo preview" />
                            <button onClick={() => removePhoto(index)}>X</button>
                        </div>
                    ))}
                    {videoPreviews.map((src, index) => (
                        <div key={index} className="preview">
                            <video src={src} controls />
                            <button onClick={() => removeVideo(index)}>X</button>
                        </div>
                    ))}
                </div>

                {/* Display success or error message */}
                {message && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="submit-btn">Submit Review</button>
            </form>
        </div>
    );
};

export default SubmitReview;
