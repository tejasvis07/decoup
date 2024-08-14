import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useFavorites } from './FavoritesContext';
import './AmazonCoupon.css';
import AM1 from '../assets/AM1.jpg';
import AM2 from '../assets/AM2.jpg';
import AM3 from '../assets/AM3.jpg';
import AM4 from '../assets/AM4.jpg';
import AM5 from '../assets/AM5.jpg';
import AM6 from '../assets/AM6.jpg';
import AM7 from '../assets/AM7.jpg';
import AM8 from '../assets/AM8.jpg';
import AM9 from '../assets/AM9.jpg';

const AmazonCoupon = () => {
    const { addFavorite, removeFavorite, getFavoritesByType } = useFavorites();
    const [copied, setCopied] = useState(null);

    // Define your coupons here
    const coupons = [
        { title: '20% Off on Electronics', description: 'Get 20% off on electronics', expiryDate: '2024-12-31', minPurchase: '300', code: 'ELECTRO20', image: AM1 },
        { title: '10% Off on Books', description: 'Get 10% off on books', expiryDate: '2024-11-30', minPurchase: '50', code: 'BOOKS10', image: AM2 },
        { title: '20% Off on Electronics', description: 'Get 20% off on electronics', expiryDate: '2024-12-31', minPurchase: '300', code: 'ELECTRO20', image: AM3 },
        { title: '10% Off on Books', description: 'Get 10% off on books', expiryDate: '2024-11-30', minPurchase: '50', code: 'BOOKS10', image: AM4 },
        { title: '20% Off on Electronics', description: 'Get 20% off on electronics', expiryDate: '2024-12-31', minPurchase: '300', code: 'ELECTRO20', image: AM5 },
        { title: '10% Off on Books', description: 'Get 10% off on books', expiryDate: '2024-11-30', minPurchase: '50', code: 'BOOKS10', image: AM6 },
        { title: '20% Off on Electronics', description: 'Get 20% off on electronics', expiryDate: '2024-12-31', minPurchase: '300', code: 'ELECTRO20', image: AM7 },
        { title: '10% Off on Books', description: 'Get 10% off on books', expiryDate: '2024-11-30', minPurchase: '50', code: 'BOOKS10', image: AM8 },
        { title: '20% Off on Electronics', description: 'Get 20% off on electronics', expiryDate: '2024-12-31', minPurchase: '300', code: 'ELECTRO20', image: AM9 },
        // Add more static coupons as needed
    ];

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(code);
            setTimeout(() => setCopied(null), 2000); // Clear copied state after 2 seconds
        });
    };

    const isFavorite = (code) => {
        const favorites = getFavoritesByType('Amazon') || [];
        return favorites.some(favorite => favorite.code === code);
    };

    const handleFavorite = (coupon) => {
        if (isFavorite(coupon.code)) {
            removeFavorite(coupon.code, 'Amazon');
        } else {
            addFavorite(coupon, 'Amazon');
        }
    };

    return (
        <div className="amazon-coupons-container">
            <h2 className="coupon-heading">Amazon Coupons</h2>
            <div className="amazon-coupon-list">
                {coupons.map((coupon, index) => (
                    <div className="amazon-coupon-card" key={index}>
                        <div className="card-inner">
                            <div className="card-front">
                                <img src={coupon.image} alt={`Coupon ${index + 1}`} className="amazon-coupon-image" />
                            </div>
                            <div className="card-back">
                                <div className="amazon-coupon-content">
                                    <h3>{coupon.title}</h3>
                                    <p>{coupon.description}</p>
                                    <p><strong>Minimum Purchase:</strong> ₹{coupon.minPurchase}</p>
                                    <p><strong>Expiry Date:</strong> {coupon.expiryDate}</p>
                                </div>
                                <div className="amazon-actions">
                                    <button 
                                        className={`amazon-copy-button ${copied === coupon.code ? 'copied' : ''}`}
                                        onClick={() => handleCopy(coupon.code)}
                                    >
                                        {copied === coupon.code ? 'Copied!' : 'Copy Code'}
                                    </button>
                                    <FaHeart 
                                        className={`amazon-favorite-icon ${isFavorite(coupon.code) ? 'favorite' : ''}`} 
                                        onClick={() => handleFavorite(coupon)} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AmazonCoupon;
