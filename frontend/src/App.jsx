import { useState, useEffect } from 'react';
import { userAPI } from './services/api';
import Message from './components/Message';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

/**
 * App Component - Main Application Component
 * Demonstrates: useState hooks, useEffect hook, Component composition, Props passing
 */
function App() {
  // useState hooks to manage application state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // useEffect hook to fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch all users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userAPI.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission (passed as prop to UserForm)
  const handleSubmit = async (formData) => {
    try {
      setError(null);
      setSuccess(null);
      
      if (editingId) {
        await userAPI.update(editingId, formData);
        setSuccess('User updated successfully!');
      } else {
        await userAPI.create(formData);
        setSuccess('User created successfully!');
      }
      
      setFormData({ name: '', email: '' });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Failed to save user');
      console.error('Error saving user:', err);
    }
  };

  // Handle edit action (passed as prop to UserList/UserCard)
  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditingId(user.id);
    setError(null);
    setSuccess(null);
  };

  // Handle cancel action (passed as prop to UserForm)
  const handleCancel = () => {
    setFormData({ name: '', email: '' });
    setEditingId(null);
    setError(null);
    setSuccess(null);
  };

  // Handle delete action (passed as prop to UserList/UserCard)
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setError(null);
        setSuccess(null);
        await userAPI.delete(id);
        setSuccess('User deleted successfully!');
        fetchUsers();
      } catch (err) {
        setError(err.message || 'Failed to delete user');
        console.error('Error deleting user:', err);
      }
    }
  };

  // Handle message close (passed as prop to Message)
  const handleMessageClose = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>User Management</h1>
        <p>React Components, Hooks, and Props Demo</p>
      </header>

      <main className="app-main">
        {/* Message component - demonstrates props */}
        <Message 
          message={error || success} 
          type={error ? 'error' : 'success'} 
          onClose={handleMessageClose}
        />
        
        <section className="form-section">
          <h2>{editingId ? 'Edit User' : 'Add New User'}</h2>
          {/* UserForm component - demonstrates props and useState */}
          <UserForm
            initialData={formData}
            editingId={editingId}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </section>

        <section className="users-section">
          <h2>Users List</h2>
          {/* UserList component - demonstrates props and component composition */}
          <UserList
            users={users}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}

export default App;

