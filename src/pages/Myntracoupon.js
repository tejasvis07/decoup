import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useFavorites } from './FavoritesContext';
import { useCoupons } from './CouponsContext';
import './MyntraCoupon.css';
import MY1 from '../assets/MY1.jpg';
import MY2 from '../assets/MY2.jpg';
import MY3 from '../assets/MY3.jpg';
import MY4 from '../assets/MY4.jpg';
import MY5 from '../assets/MY5.jpg';
import MY6 from '../assets/MY6.jpg';
import MY7 from '../assets/MY7.jpg';
import MY8 from '../assets/MY8.jpg';
import MY9 from '../assets/MY9.jpg';

const MyntraCoupon = () => {
    const { getCouponsByMerchant } = useCoupons();
    const { addFavorite, removeFavorite, getFavoritesByType } = useFavorites();
    const [copied, setCopied] = useState(null);

    // Static coupons
    const staticCoupons = [
        { title: '25% Off on Clothing', description: 'Get 25% off on clothing', expiryDate: '2024-12-31', minPurchase: '200', code: 'CLOTHING25', image: MY1 },
        { title: '15% Off on Accessories', description: 'Get 15% off on accessories', expiryDate: '2024-11-30', minPurchase: '50', code: 'ACCESS15', image: MY2 },
        { title: '15% Off on Accessories', description: 'Get 15% off on accessories', expiryDate: '2024-11-30', minPurchase: '50', code: 'ACCESS15', image: MY3 },
        { title: '15% Off on Accessories', description: 'Get 15% off on accessories', expiryDate: '2024-11-30', minPurchase: '50', code: 'ACCESS15', image: MY4 },
        { title: '15% Off on Accessories', description: 'Get 15% off on accessories', expiryDate: '2024-11-30', minPurchase: '50', code: 'ACCESS15', image: MY5 },
        { title: '15% Off on Accessories', description: 'Get 15% off on accessories', expiryDate: '2024-11-30', minPurchase: '50', code: 'ACCESS15', image: MY6 },
        { title: '15% Off on Accessories', description: 'Get 15% off on accessories', expiryDate: '2024-11-30', minPurchase: '50', code: 'ACCESS15', image: MY7 },
        { title: '15% Off on Accessories', description: 'Get 15% off on accessories', expiryDate: '2024-11-30', minPurchase: '50', code: 'ACCESS15', image: MY8 },
        { title: '15% Off on Accessories', description: 'Get 15% off on accessories', expiryDate: '2024-11-30', minPurchase: '50', code: 'ACCESS15', image: MY9 },
    ];

    // Fetch dynamic coupons and combine with static coupons
    const dynamicCoupons = getCouponsByMerchant('myntra') || [];
    const combinedCoupons = [...staticCoupons, ...dynamicCoupons];

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(code);
            setTimeout(() => setCopied(null), 2000); // Clear copied state after 2 seconds
        });
    };

    const isFavorite = (code) => {
        const favorites = getFavoritesByType('Myntra') || [];
        return favorites.some(favorite => favorite.code === code);
    };

    const handleFavorite = (coupon) => {
        if (isFavorite(coupon.code)) {
            removeFavorite(coupon.code, 'Myntra');
        } else {
            addFavorite(coupon, 'Myntra');
        }
    };

    return (
        <div className="myntra-coupons-container">
            <h2 className="coupon-heading">Myntra Coupons</h2>
            <div className="myntra-coupon-list">
                {combinedCoupons.map((coupon, index) => (
                    <div className="myntra-coupon-card" key={index}>
                        <div className="card-inner">
                            <div className="card-front">
                                <img src={coupon.image} alt={`Coupon ${index + 1}`} className="myntra-coupon-image" />
                            </div>
                            <div className="card-back">
                                <div className="myntra-coupon-content">
                                    <h3>{coupon.title}</h3>
                                    <p>{coupon.description}</p>
                                    <p><strong>Minimum Purchase:</strong> ₹{coupon.minPurchase}</p>
                                    <p><strong>Expiry Date:</strong> {coupon.expiryDate}</p>
                                </div>
                                <div className="myntra-actions">
                                    <button 
                                        className={`myntra-copy-button ${copied === coupon.code ? 'copied' : ''}`}
                                        onClick={() => handleCopy(coupon.code)}
                                    >
                                        {copied === coupon.code ? 'Copied!' : 'Copy Code'}
                                    </button>
                                    <FaHeart 
                                        className={`myntra-favorite-icon ${isFavorite(coupon.code) ? 'favorite' : ''}`} 
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

export default MyntraCoupon;

