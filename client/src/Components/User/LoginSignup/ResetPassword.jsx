import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({hostlink}) => {
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${hostlink}/reset-password`, {
        email,
        otpCode,
        newPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className='d-flex align-center justify-center flex-c w100'>
      <h2 >Reset Password</h2>
      <form onSubmit={handleSubmit} className='w33  products-form products-form-login login'>
      {message && <p>{message}!</p>}
      <p className="form-row w100">
          
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Enter your Email' className='input-text w100'/>
        </p>
        <p className="form-row w100">
          
          <input type="text" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} required placeholder='Enter OTP Code' className='input-text w100'/>
        </p>
        <p className="form-row w100">
          
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className='input-text w100'
            placeholder='Enter your New Password'
          />
        </p>
        <p className="form-row w100 d-flex justify-center">
        <button type="submit" className='form-btn'>Reset Password</button>
        </p>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
