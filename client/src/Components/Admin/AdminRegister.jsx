import React, { useState } from 'react';
import axios from 'axios';

const AdminRegister = ({ hostlink }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${hostlink}/admin/register`, formData);
      console.log(response.data.message); // Registration success message
      // You can redirect to a success page or display a success message here.
    } catch (error) {
      console.error(error.response.data);
      // Handle registration errors (e.g., email already exists, server error)
    }
  };

  return (
    <div className='signup-container'>
      <h2 className='signup-heading'>Admin Registration</h2>
      <form onSubmit={handleSubmit} className='signup-form'>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className='form-btn'>Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
