import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MerchantDashboard.css';
import { Player } from '@lottiefiles/react-lottie-player';
import merchant from '../assets/merchant.json';
import { FaEdit } from 'react-icons/fa'; // Import the edit icon

const MerchantDashboard = ({ user }) => {
  const [coupon, setCoupon] = useState({
    title: '',
    description: '',
    expiry: '',
    code: '',
    image: '',
    minimumPurchase: '' // Add minimum purchase field
  });

  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);

  useEffect(() => {
    // Store user details in localStorage on initial load
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    const fetchCoupons = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
          let merchant = '';
          if (savedUser.email.includes('myntra')) merchant = 'myntra';
          else if (savedUser.email.includes('ajio')) merchant = 'ajio';
          else if (savedUser.email.includes('zomato')) merchant = 'zomato';
          else if (savedUser.email.includes('amazon')) merchant = 'amazon';

          if (merchant) {
            const response = await axios.get(`http://localhost:8080/api/coupons/${merchant}`);
            setCoupons(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCoupons();
  }, [user]);

  const handleChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem('user'));
    let merchant = '';
    if (savedUser.email.includes('myntra')) merchant = 'myntra';
    else if (savedUser.email.includes('ajio')) merchant = 'ajio';
    else if (savedUser.email.includes('zomato')) merchant = 'zomato';
    else if (savedUser.email.includes('amazon')) merchant = 'amazon';

    if (merchant) {
      try {
        const newCoupon = { ...coupon, merchant };
        const response = await axios.post('http://localhost:8080/api/coupons/add', newCoupon);
        setCoupons([...coupons, response.data]);
        setCoupon({
          title: '',
          description: '',
          expiry: '',
          code: '',
          image: '',
          minimumPurchase: '' // Reset minimum purchase field
        });
      } catch (error) {
        console.error('Error adding coupon:', error);
      }
    } else {
      console.error("No merchant matched for this email.");
    }
  };

  const handleEditClick = (c) => {
    setCoupon(c);
    setEditingCoupon(c.code);
  };

  const updateCoupon = async (code) => {
    try {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      const merchant = savedUser.email.split('@')[0];
      const updatedCoupon = { ...coupon, merchant };
      const response = await axios.put(`http://localhost:8080/api/coupons/update/${code}`, updatedCoupon);

      if (response.status === 200) {
        setCoupons(coupons.map(c => c.code === code ? response.data : c));
        setCoupon({
          title: '',
          description: '',
          expiry: '',
          code: '',
          image: '',
          minimumPurchase: '' // Reset minimum purchase field
        });
        setEditingCoupon(null);
        alert("Coupon updated successfully");
      } else {
        alert("Failed to update the coupon.");
      }
    } catch (error) {
      console.error("Error updating the coupon:", error.response ? error.response.data : error.message);
      alert("Failed to update the coupon.");
    }
  };

  const deleteCoupon = async (code) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/coupons/delete/${code}`);
      
      if (response.status === 204) { // No content status code for successful delete
        setCoupons(coupons.filter(c => c.code !== code));
        alert("Coupon deleted successfully");
      } else {
        alert("Failed to delete the coupon.");
      }
    } catch (error) {
      console.error("Error deleting the coupon:", error.response ? error.response.data : error.message);
      alert("Failed to delete the coupon.");
    }
  };

  return (
    <div className="merchant-dashboard-container">
      <div className="merchant-animation-section">
        <Player autoplay loop src={merchant} style={{ height: '500px', width: '500px' }} />
      </div>
      <div className="merchant-content-section">
        <div className="merchant-dashboard-content">
          <h1>WELCOME, {user.name}</h1>
          <p>Merchant Email: {user.email}</p>
          <h2>{editingCoupon ? 'Edit Coupon' : 'Add a New Coupon'}</h2>
          <form onSubmit={editingCoupon ? (e) => { e.preventDefault(); updateCoupon(editingCoupon); } : handleSubmit}>
            <div>
              <label>Title:</label>
              <input type="text" name="title" value={coupon.title} onChange={handleChange} required />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="description" value={coupon.description} onChange={handleChange} required />
            </div>
            <div>
              <label>Expiry Date:</label>
              <input type="date" name="expiry" value={coupon.expiry} onChange={handleChange} required />
            </div>
            <div>
              <label>Minimum Purchase:</label>
              <input type="number" name="minimumPurchase" value={coupon.minimumPurchase} onChange={handleChange} required />
            </div>
            <div>
              <label>Coupon Code:</label>
              <input type="text" name="code" value={coupon.code} onChange={handleChange} required />
            </div>
            <div>
              <label>Image URL:</label>
              <input type="text" name="image" value={coupon.image} onChange={handleChange} required />
            </div>
            
            <button type="submit">{editingCoupon ? 'Update Coupon' : 'Add Coupon'}</button>
          </form>

          <h2>Existing Coupons</h2>
          <div className="merchant-existing-coupons">
            {coupons.length > 0 ? (
              coupons.map((c) => (
                <div key={c.code} className="merchant-coupon-item">
                  <FaEdit 
                    className="merchant-edit-icon" 
                    onClick={() => handleEditClick(c)} 
                  />
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <p><strong>Expiry Date:</strong> {c.expiry}</p>
                  <p><strong>Code:</strong> {c.code}</p>
                  <p><strong>Image URL:</strong> {c.image}</p>
                  <p><strong>Minimum Purchase:</strong> ${c.minimumPurchase}</p> {/* Display minimum purchase */}
                  <button onClick={() => deleteCoupon(c.code)}>Remove Coupon</button>
                </div>
              ))
            ) : (
              <p>No coupons available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
