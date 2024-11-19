import React, { useEffect, useState } from 'react';
import DisplayTable from '../components/DisplayTable';
import { UserService } from '../services/userService';
import styles from '../styles/views/Admin.module.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await UserService.getAllUsers();
        const nonAdminUsers = fetchedUsers.filter((user) => user.role !== 'Admin');
        setUsers(nonAdminUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRemove = async (userId) => {
    try {
      await UserService.deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <DisplayTable data={users} onRemove={handleRemove} />
    </div>
  );
}

export default AdminDashboard;
