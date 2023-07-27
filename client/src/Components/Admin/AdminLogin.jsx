import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ hostlink }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show the loading icon
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post(`${hostlink}/admin/login`, formData);
      setSuccessMessage(response.data.message);
      document.cookie = `adminToken=${response.data.token}; path=/`;
      // Redirect to the home page after a short delay (e.g., 1 second)
      setTimeout(() => {
        history('/dashboard');
      }, 1000);
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false); // Hide the loading icon
    }
  };

  return (
    <div className='signup-container'>
      <h2 className='signup-heading'>Admin Login</h2>
      <form onSubmit={handleSubmit} className='signup-form'>
        <div>
          <p>{errorMessage}</p>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className='form-btn' disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default AdminLogin;
