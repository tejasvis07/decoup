import React, { useState } from 'react';
import './CouponCard.css';

const CouponCard = ({ title, description, expiryDate, minPurchase, code, image, isSignedIn }) => {
    const [showDescription, setShowDescription] = useState(false);

    const handleCopy = () => {
        if (isSignedIn) {
            navigator.clipboard.writeText(code);
            alert('Coupon code copied to clipboard!');
        } else {
            alert('Please sign in to copy the coupon code.');
        }
    };

    return (
        <div 
            className="coupon-card" 
            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
        >
            {showDescription ? (
                <div className="coupon-description">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <p>Min Purchase: {minPurchase}</p>
                    <p>Expiry Date: {expiryDate}</p>
                    <button onClick={handleCopy}>Copy Code</button>
                </div>
            ) : (
                <img src={image} alt={title} className="coupon-image" />
            )}
        </div>
    );
};

export default CouponCard;
