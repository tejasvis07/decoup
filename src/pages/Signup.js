import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios
import { Player } from '@lottiefiles/react-lottie-player';
import signinAnimation from '../assets/signin.json';
import './Signup.css';

const SignUp = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const userInfo = { name, email, password, memberSince: 'July 2024' }; // Example member since date
    
    try {
      const response = await axios.post('http://localhost:8080/decoup/signup', userInfo);  // Correct API endpoint
      onSignUp(response.data);
      
      if (email.includes('admin')) {
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      } else if (email.includes('ajio') || email.includes('amazon') || email.includes('myntra') || email.includes('zomato')) {
        navigate('/merchant-dashboard');
      } else {
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signin-animation">
        <Player autoplay loop src={signinAnimation} />
      </div>
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <div className="signin-link">
          <p>Already have an account? <Link to="/signin">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
