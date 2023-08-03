import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';


const AdminRegister = ({ hostlink }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const history = useNavigate();

  
     // Validate email and password inputs
     if (!validator.isEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
  
    if (validator.isEmpty(password)) {
      setErrorMessage('Please enter your password.');
      return;
    }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show the loading icon
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post(`${hostlink}/admin/register`, formData);
      setSuccessMessage(response.data.message);
      setTimeout(() => {
        history('/dashboard');
      }, 1000);
      // You can redirect to a success page or display a success message here.
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage(DOMPurify.sanitize(error.response.data.message));
    } finally {
      setLoading(false); // Hide the loading icon
    }
  };

  return (
    <div className='d-flex flex-c align-center justify-center g1'>
      <h2 className='signup-heading'>Admin Registration</h2>
      <form onSubmit={handleSubmit} className='signup-form'>
      <p className="form-row w100">
          <label>Email:</label>
          <input type="email" className='input-text w100' value={formData.email} onChange={handleChange} required />
        </p>
        <p className="form-row w100">
          <label>Password:</label>
          <input type="password" className='input-text w100' value={formData.password} onChange={handleChange} required />
        </p>
        
        <p className="form-row w100 d-flex justify-center">
        <button type="submit" className='button medium' disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
        {successMessage && <p>{successMessage}</p>}
        </p>
      </form>
    </div>
  );
};

export default AdminRegister;
