import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ForgotPassword = ({hostlink}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${hostlink}/forgot-password`, { email });
      setMessage(response.data.message);
      // Redirect to the home page
      history('/reset-password');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className='signup-container'>
      <h2 className="signup-heading">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div >
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email'/>
        </div>
        <button type="submit" className='form-btn'>Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
