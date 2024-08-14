import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './AdminDashboard.css';

const COLORS = ['#142727', '#183D3D', '#5C8374', '#93B1A6'];

const AdminDashboard = ({ user }) => {
  const [couponSalesData, setCouponSalesData] = useState([]);

  useEffect(() => {
    const fetchCouponSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/couponsales/all');
        setCouponSalesData(response.data);
      } catch (error) {
        console.error('Error fetching coupon sales data:', error);
      }
    };

    fetchCouponSalesData();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      <div className="admin-dashboard-content">
        <div className="admin-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Member Since:</strong> {user.memberSince}</p>
        </div>
        <div className="admin-stats">
          <h2>Coupon Sales Overview</h2>
          {couponSalesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={couponSalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sold">
                  {couponSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
