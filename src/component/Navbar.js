import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo (3).png';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />

            </div>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/suggestions" className="nav-link">Top Deals</Link>
                <div className="nav-link">
                    Search
                    <div className="dropdown-menu">
                        <Link to="/myntra-coupons" className="dropdown-item">Myntra</Link>
                        <Link to="/amazon-coupons" className="dropdown-item">Amazon</Link>
                        <Link to="/ajio-coupons" className="dropdown-item">Ajio</Link>
                        <Link to="/zomato-coupons" className="dropdown-item">Zomato</Link>
                    </div>
                </div>
                <Link to="/favorites" className="nav-link">
                    <FontAwesomeIcon icon={faHeart} className="favorites-icon" />
                </Link>
                <div className="nav-link profile-dropdown">
                    <FontAwesomeIcon icon={faUser} className="profile-icon" />
                    <div className="dropdown-menu">
                        <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                        <Link to="/signin" className="dropdown-item">Signin</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
