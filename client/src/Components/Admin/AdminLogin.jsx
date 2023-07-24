import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminLogin = ({ hostlink }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${hostlink}/admin/login`, formData);
      console.log(response.data.message); // Login success message
      document.cookie = `adminToken=${response.data.token}; path=/`;
      // Redirect to the home page
      history('/dashboard');

    } catch (error) {
      console.error(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className='signup-container'>
      <h2 className='signup-heading'>Admin Login</h2>
      <form onSubmit={handleSubmit} className='signup-form'>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className='form-btn'>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
