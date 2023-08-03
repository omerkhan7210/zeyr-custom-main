import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import validator from 'validator';
import DOMPurify from 'dompurify';

const ForgotPassword = ({hostlink}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  // Validate email and password inputs
  if (!validator.isEmail(email)) {
    setMessage('Please enter a valid email address.');
    return;
  }
    try {
      const response = await axios.post(`${hostlink}/forgot-password`, { email });
      setMessage(response.data.message);
      // Redirect to the home page
      history('/reset-password');
    } catch (error) {
      // Sanitize the error message before displaying it
      setMessage(DOMPurify.sanitize(error.response.data.message));
    }
  };

  return (
    <div className='d-flex justify-center flex-c align-center w100'>
      <h2 className="signup-heading">Forgot Password</h2>
      <form onSubmit={handleSubmit} className=" products-form products-form-login login w33">
      {message && <p>{message}!</p>}
      <p className="form-row w100">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email' className='input-text w100' />
        </p>
        <p className="form-row w100 d-flex justify-center">
        <button type="submit" className='form-btn'>Reset Password</button>
        </p>
      </form>
      
    </div>
  );
};

export default ForgotPassword;
