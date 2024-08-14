import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { useFavorites } from './FavoritesContext';
import './ZomatoCoupon.css';

const ZomatoPage = () => {
  const [coupons, setCoupons] = useState([]);
  const { addFavorite, removeFavorite, getFavoritesByType } = useFavorites();
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/coupons/zomato');
        console.log(response);
        setCoupons(response.data);
      } catch (error) {
        console.error('Error fetching Zomato coupons:', error);
      }
    };

    fetchCoupons();
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(code);
      setTimeout(() => setCopied(null), 2000); // Clear copied state after 2 seconds
    });
  };

  const isFavorite = (code) => {
    const favorites = getFavoritesByType('Zomato') || [];
    return favorites.some(favorite => favorite.code === code);
  };

  const handleFavorite = (coupon) => {
    if (isFavorite(coupon.code)) {
      removeFavorite(coupon.code, 'Zomato');
    } else {
      addFavorite(coupon, 'Zomato');
    }
  };

  return (
    <div className="zomato-coupons-container">
      <h2 className="coupon-heading">Zomato Coupons</h2>
      <div className="zomato-coupon-list">
        {coupons.length > 0 ? (
          coupons.map((coupon) => (
            <div key={coupon.code} className="zomato-coupon-card">
              <div className="card-inner">
                <div className="card-front">
                  <img src={coupon.image} alt={coupon.title} className="zomato-coupon-image" />
                </div>
                <div className="card-back">
                  <div className="zomato-coupon-content">
                    <h3>{coupon.title}</h3>
                    <p>{coupon.description}</p>
                    <p><strong>Minimum Purchase:</strong> ${coupon.minimumPurchase}</p>
                    <p><strong>Expiry Date:</strong> {coupon.expiry}</p>
                  </div>
                  <div className="zomato-actions">
                    <button 
                      className={`zomato-copy-button ${copied === coupon.code ? 'copied' : ''}`}
                      onClick={() => handleCopy(coupon.code)}
                    >
                      {copied === coupon.code ? 'Copied!' : 'Copy Code'}
                    </button>
                    <FaHeart 
                      className={`zomato-favorite-icon ${isFavorite(coupon.code) ? 'favorite' : ''}`} 
                      onClick={() => handleFavorite(coupon)} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No coupons available.</p>
        )}
      </div>
    </div>
  );
};

export default ZomatoPage;
