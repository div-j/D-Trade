import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../components/context/auth';

const AdminPage = () => {
  const [adminData, setAdminData] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/admin-data`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setAdminData(res.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, [auth.token]);

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Statistics</h2>
        <p>Total Users: {adminData.userCount}</p>
        {/* <p>Total Products: {adminData.productCount}</p> */}
      </div>
      <div>
        <h2>Recent Users</h2>
        {/* <ul>
          {adminData.recentUsers.map(user => (
            <li key={user._id}>{user.name} - {user.email}</li>
          ))}
        </ul> */}
      </div>
      <div>
        <h2>Recent Products</h2>
        {/* <ul>
          {adminData.recentProducts.map(product => (
            <li key={product._id}>{product.name} - ${product.price}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default AdminPage;
