// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
// import './Profile.css';
// import avatar from '../assets/avatar.png';

// const data = [
//   { name: 'Amazon', value: 400 },
//   { name: 'Myntra', value: 300 },
//   { name: 'Ajio', value: 300 },
//   { name: 'Zomato', value: 200 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const Profile = ({ user }) => {
//   return (
//     <div className="profile-container">
//       <h1 className="profile-title">Profile</h1>
//       <div className="profile-content">
//         <div className="profile-details">
//           <img src={avatar} alt="Avatar" className="profile-avatar" />
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Member Since:</strong> {user.memberSince}</p>

//         </div>
//         {<div className="chart-container">
//           <h2>Coupon Usage</h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>}
//       </div>
//     </div>
//   );
// };

// export default Profile;
