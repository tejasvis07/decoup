// src/component/ReviewCard.js
import React from 'react';
import './ReviewCard.css';

const ReviewCard = ({ reviewText, reviewerName, rating }) => {
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={`star ${index < rating ? 'filled' : ''}`}
            >
                &#9733; {/* Unicode star character */}
            </span>
        ));
    };

    return (
        <div className="review-card">
            <div className="star-rating">
                {renderStars(rating)}
            </div>
            <p className="review-text">"{reviewText}"</p>
            <p className="reviewer-name">- {reviewerName}</p>
        </div>
    );
};

export default ReviewCard;
