import React, { useState } from 'react';
import axios from 'axios';
import '../../../assets/css/signup_login.css';
import {useNavigate} from 'react-router-dom';



const SignupForm = ({hostlink}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [message, setMessage] = useState('');
  const history = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${hostlink}/signup`, { fname,email });
      setMessage(response.data.message);
      setOtpCode(response.data.otpCode);
      setShowOtpPopup(true);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${hostlink}/verify-otp`, { fname,lname,email, password ,otpCode });
      
      setMessage(response.data.message);
      setShowOtpPopup(false);
       
      // Store the token in a cookie
      document.cookie = `token=${response.data.token}; path=/`;
      history('/');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div  className='signup-container'>
      <h2 className="signup-heading">Signup</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <div>
          <label>First Name:</label>
          <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='login-red-btn'>Signup</button>
      </form>
      {message && <p>{message}</p>}

      {showOtpPopup && (
        <div>
          <h3>Enter OTP</h3>
          <input type="text" placeholder='Enter the otp code sent in your email..' onChange={(e) => setOtpCode(e.target.value)} required />
          <button onClick={handleVerifyOtp} className='login-red-btn'>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
