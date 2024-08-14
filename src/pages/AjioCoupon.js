import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useFavorites } from './FavoritesContext';
import { useCoupons } from './CouponsContext';
import './AjioCoupon.css';
import AJ2 from '../assets/AJ2.jpg';
import AJ3 from '../assets/AJ3.jpg';
import AJ4 from '../assets/AJ4.jpg';
import AJ5 from '../assets/AJ5.jpg';
import AJ6 from '../assets/AJ6.jpg';
import AJ7 from '../assets/AJ7.jpg';
import AJ8 from '../assets/AJ8.jpg';
import AJ9 from '../assets/AJ9.jpg';
import AJ10 from '../assets/AJ10.jpg';

const AjioCoupon = () => {
    const { getCouponsByMerchant } = useCoupons();
    const { addFavorite, removeFavorite, getFavoritesByType } = useFavorites();
    const [copied, setCopied] = useState(null);

    // Static coupons
    const staticCoupons = [
        { title: '25% Off on Shoes', description: 'Get 25% off on shoes', expiryDate: '2024-11-30', minPurchase: '100', code: 'SHOES25', image: AJ2 },
        { title: '10% Off on Dress', description: 'Get 10% off on dress', expiryDate: '2024-08-24', minPurchase: '1000', code: 'DRESS10', image: AJ3 },
        { title: '25% Off on Clothing', description: 'Get 25% off on clothing', expiryDate: '2024-12-31', minPurchase: '200', code: 'CLOTHING25', image: AJ4 },
        { title: '25% Off on Clothing', description: 'Get 25% off on clothing', expiryDate: '2024-12-31', minPurchase: '200', code: 'CLOTHING25', image: AJ5 },
        { title: '25% Off on Shoes', description: 'Get 25% off on shoes', expiryDate: '2024-11-30', minPurchase: '100', code: 'SHOES25', image: AJ6 },
        { title: '25% Off on Shoes', description: 'Get 25% off on shoes', expiryDate: '2024-11-30', minPurchase: '100', code: 'SHOES25', image: AJ7 },
        { title: '25% Off on Shoes', description: 'Get 25% off on shoes', expiryDate: '2024-11-30', minPurchase: '100', code: 'SHOES25', image: AJ8 },
        { title: '25% Off on Shoes', description: 'Get 25% off on shoes', expiryDate: '2024-11-30', minPurchase: '100', code: 'SHOES25', image: AJ9 },
        { title: '25% Off on Shoes', description: 'Get 25% off on shoes', expiryDate: '2024-11-30', minPurchase: '100', code: 'SHOES25', image: AJ10 },
    ];

    // Fetch dynamic coupons and combine with static coupons
    const dynamicCoupons = getCouponsByMerchant('ajio') || [];
    const combinedCoupons = [...staticCoupons, ...dynamicCoupons];

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(code);
            setTimeout(() => setCopied(null), 2000); // Clear copied state after 2 seconds
        });
    };

    const isFavorite = (code) => {
        const favorites = getFavoritesByType('Ajio') || [];
        return favorites.some(favorite => favorite.code === code);
    };

    const handleFavorite = (coupon) => {
        if (isFavorite(coupon.code)) {
            removeFavorite(coupon.code, 'Ajio');
        } else {
            addFavorite(coupon, 'Ajio');
        }
    };

    return (
        <div className="ajio-coupons-container">
            <h2 className="coupon-heading">Ajio Coupons</h2>
            <div className="ajio-coupon-list">
                {combinedCoupons.map((coupon, index) => (
                    <div className="ajio-coupon-card" key={index}>
                        <div className="card-inner">
                            <div className="card-front">
                                <img src={coupon.image} alt={`Coupon ${index + 1}`} className="ajio-coupon-image" />
                            </div>
                            <div className="card-back">
                                <div className="ajio-coupon-content">
                                    <h3>{coupon.title}</h3>
                                    <p>{coupon.description}</p>
                                    <p><strong>Minimum Purchase:</strong> ₹{coupon.minPurchase}</p>
                                    <p><strong>Expiry Date:</strong> {coupon.expiryDate}</p>
                                </div>
                                <div className="ajio-actions">
                                    <button 
                                        className={`ajio-copy-button ${copied === coupon.code ? 'copied' : ''}`}
                                        onClick={() => handleCopy(coupon.code)}
                                    >
                                        {copied === coupon.code ? 'Copied!' : 'Copy Code'}
                                    </button>
                                    <FaHeart 
                                        className={`ajio-favorite-icon ${isFavorite(coupon.code) ? 'favorite' : ''}`} 
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

export default AjioCoupon;
