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
    <div className='signup-container'>
      <h2 className="signup-heading">Reset Password</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>OTP Code:</label>
          <input type="text" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} required />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='form-btn'>Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
