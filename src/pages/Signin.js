import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import signinAnimation from '../assets/signin.json';
import './Signin.css';

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userinfo = {email, password};
    try {
      const response = await axios.post('http://localhost:8080/decoup/signin', userinfo);
      
      if (response.status === 200) {
        onSignIn(response.data);

        if (email.includes('admin')) {
          navigate('/admin-dashboard');
        } else if (email.includes('myntra') || email.includes('ajio') || email.includes('zomato') || email.includes('amazon')) {
          navigate('/merchant-dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Sign-in error:', error);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-animation">
        <Player autoplay loop src={signinAnimation} />
      </div>
      <div className="signin-container alternate-style">
        <h2>SIGN IN</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Sign In</button>
        </form>
        <div className="signup-link alternate-style">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
