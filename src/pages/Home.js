import React, { useState, useEffect } from 'react';
import Carousel from '../component/Carousel';
import CouponCard from '../component/CouponCard';
import ReviewCard from '../component/ReviewCard';
import { Player } from '@lottiefiles/react-lottie-player';
import './Home.css';

import cp1 from '../assets/cp1.jpg';
import cp2 from '../assets/cp2.jpg';
import cp3 from '../assets/cp3.jpg';
import cp4 from '../assets/cp4.jpg';
import cp5 from '../assets/cp5.jpg';
import cp6 from '../assets/cp6.jpg';
import cp7 from '../assets/cp7.jpg';
import cp8 from '../assets/cp8.jpg';
import cp9 from '../assets/cp9.jpg';

import limitedsale from '../assets/limited sale.png';
import couponAnimation from '../assets/aboutus.json';
import faq from '../assets/faq.json';

const Home = () => {
    const [currentCouponIndex, setCurrentCouponIndex] = useState(0);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const signedInStatus = checkSignInStatus();
        setIsSignedIn(signedInStatus);
    }, []);

    const checkSignInStatus = () => {
        const user = JSON.parse(localStorage.getItem('user')); 
        return user !== null; // Returns true if user is signed in, false otherwise
    };

    const reviews = [
        { text: "I love the variety of coupons available. I always find great deals!", name: "Siva", rating: 5 },
        { text: "The website is easy to use and the discounts are amazing.", name: "Michel", rating: 3 },
        { text: "Decoup helped me save a lot on my shopping. Highly recommend!", name: "Benita", rating: 4 },
    ];

    const coupons = [
        { title: '10% Off on Electronics', description: 'Get 10% off on Dresses', expiryDate: '2024-08-10', minPurchase: '500', code: 'FASHOION10', image: cp1 },
        { title: '20% Off on Fashion', description: 'Get 20% off on fashion items', expiryDate: '2024-11-30', minPurchase: '50', code: 'FASHION20', image: cp2 },
        { title: '15% Off on Home Decor', description: 'Get 15% off on home decor items', expiryDate: '2024-12-15', minPurchase: '75', code: 'HOME15', image: cp3 },
        { title: '15% Off on Home Decor', description: 'Get 15% off on home decor items', expiryDate: '2024-12-15', minPurchase: '75', code: 'HOME15', image: cp4 },
        { title: '15% Off on Home Decor', description: 'Get 15% off on home decor items', expiryDate: '2024-12-15', minPurchase: '75', code: 'HOME15', image: cp5 },
        { title: '20% Off on Fashion', description: 'Get 20% off on fashion items', expiryDate: '2024-11-30', minPurchase: '50', code: 'FASHION20', image: cp6 },
        { title: '20% Off on Fashion', description: 'Get 20% off on fashion items', expiryDate: '2024-11-30', minPurchase: '50', code: 'FASHION20', image: cp7 },
        { title: '20% Off on Fashion', description: 'Get 20% off on fashion items', expiryDate: '2024-11-30', minPurchase: '50', code: 'FASHION20', image: cp8 },
        { title: '20% Off on Fashion', description: 'Get 20% off on fashion items', expiryDate: '2024-11-30', minPurchase: '50', code: 'FASHION20', image: cp9 },
    ];

    const couponsPerPage = 3;
    const totalCoupons = coupons.length;
    const totalPages = Math.ceil(totalCoupons / couponsPerPage);

    const handleNextCoupons = () => {
        setCurrentCouponIndex((prevIndex) =>
            prevIndex + 1 < totalPages ? prevIndex + 1 : 0
        );
    };

    const visibleCoupons = coupons.slice(
        currentCouponIndex * couponsPerPage,
        (currentCouponIndex + 1) * couponsPerPage
    );

    const handleCopyCouponCode = (code) => {
        if (isSignedIn) {
            navigator.clipboard.writeText(code);
            alert('Coupon code copied to clipboard!');
        } else {
            alert('Please sign in to copy the coupon code.');
        }
    };

    return (
        <div>
            <Carousel />

            <section className="about-us-section">
                <div className="about-us-animation">
                    <Player
                        autoplay
                        loop
                        src={couponAnimation}
                    />
                </div>
                <div className="about-us-content">
                    <h2>About Us</h2>
                    <p><b>Decoup</b> is a modern coupon code platform that helps users find the best deals from top e-commerce sites like Amazon, Myntra, and Ajio. Whether you're shopping for fashion, electronics, or beauty products, Decoup offers a wide range of curated coupons to meet your needs.</p>
                    <p>With its user-friendly interface, Decoup makes it easy to browse, search, and save your favorite coupons. Detailed information on discounts, categories, and expiration dates ensures you make informed decisions. The platform also includes helpful features like search filters and a responsive design for a seamless experience on any device.</p>
                    <p>Decoup is your go-to destination for discovering great deals and making smart online purchases.</p>
                </div>
            </section>

            <section className="limited-time-offer-banner">
                <img src={limitedsale} alt="Limited Time Offer" className="limited-offer-image" />
            </section>

            <section className="section coupon-section">
                <h2>Top Available Coupons</h2>
                <div className="coupon-grid">
                    {visibleCoupons.map((coupon, index) => (
                        <CouponCard
                            key={index}
                            title={coupon.title}
                            description={coupon.description}
                            expiryDate={coupon.expiryDate}
                            minPurchase={coupon.minPurchase}
                            code={coupon.code}
                            image={coupon.image}
                            onCopyCode={() => handleCopyCouponCode(coupon.code)}
                        />
                    ))}
                </div>
                <button onClick={handleNextCoupons} className="suggestion-button">
                    <i className="fas fa-chevron-right"></i>
                </button>
            </section>

            <section className="section faq-section alternate-style">
                <div className="faq-animation">
                    <Player
                        autoplay
                        loop
                        src={faq}
                    />
                </div>
                <div className="faq-content">
                    <h2>Frequently Asked Questions</h2>
                    <ul>
                        <li><strong>How do I use a coupon?</strong> Simply copy the code and paste it during checkout.</li>
                        <li><strong>Can I use multiple coupons?</strong> Usually, only one coupon can be applied per order, but check the specific terms of each coupon.</li>
                        <li><strong>Do the coupons expire?</strong> Yes, each coupon has an expiry date listed.</li>
                    </ul>
                </div>
            </section>

            <section className="section review-section">
                <h2><b>Customer Reviews</b></h2>
                <div className="review-grid">
                    {reviews.map((review, index) => (
                        <ReviewCard
                            key={index}
                            reviewText={review.text}
                            reviewerName={review.name}
                            rating={review.rating}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
