import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import validator from 'validator';
import DOMPurify from 'dompurify';
import PopupOtp from './PopupOtp';


const SignupForm = ({hostlink}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otpMessage, setOTPMessage] = useState('');
  const history = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();

      // Validate email and password inputs
  if (!validator.isEmail(email)) {
    setErrorMessage('Please enter a valid email address.');
    return;
  }
// Validate first name and last name inputs
if (!validator.isAlpha(fname, 'en-US', { ignore: ' ' })) {
  setErrorMessage('Please enter a valid first name.');
  return;
}

if (!validator.isAlpha(lname, 'en-US', { ignore: ' ' })) {
  setErrorMessage('Please enter a valid last name.');
  return;
}


  if (validator.isEmpty(password)) {
    setErrorMessage('Please enter your password.');
    return;
  }

    try {
      const response = await axios.post(`${hostlink}/signup`, { fname,email });
      setErrorMessage(response.data.message);
      setOtpCode(response.data.otpCode);
      setShowOtpPopup(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${hostlink}/verify-otp`, { fname,lname,email, password ,otpCode });
      
      setOTPMessage(response.data.message);
      setShowOtpPopup(false);
       
      // Store the token in a cookie
      document.cookie = `token=${response.data.token}; path=/`;
      history('/');
    } catch (error) {
      setOTPMessage(error.response.data.message);
    }
  };

  const handleCloseOtpPopup = () => {
    setShowOtpPopup(false);
    setOtpCode(''); // Clear OTP input field when closing the popup
  };

  return (

    <div id="login-panel" className="login-panel d-flex justify-center w25 align-center mauto">
		    <div className="panel w100">
            <form method="post"  onSubmit={handleSignup} className="products-form products-form-register register w100">
            {errorMessage && <p>{errorMessage}</p>}
          <p className="form-row  w100">
                <label htmlFor="panel_reg_fname">First Name:</label>
                <input type="text" className="input-text w100"  id="panel_reg_fname" value={fname} onChange={(e) => setFname(e.target.value)} required />
              </p>
              <p className="form-row  w100">
                <label htmlFor="panel_reg_lname">Last Name:</label>
                <input type="text" className="input-text w100"  id="panel_reg_lname" value={lname} onChange={(e) => setLname(e.target.value)} required  />
              </p>
              <p className="form-row  w100">
                <label htmlFor="panel_reg_email">Email address</label>
                <input type="email" className="input-text w100"  id="panel_reg_email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              </p>
              <p className="form-row form-row-wide w100">
                <label htmlFor="panel_reg_password">Password</label>
                <input type="password" className="input-text w100" name="password" id="panel_reg_password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
              </p>
              
              <p className="form-row w100 d-flex justify-center">
                <button type="submit" className="button large" name="register" defaultValue="Sign up">Sign up</button>
              </p>
              <p className="already_registered d-flex justify-center">
                <Link to="/login">Already has an account?</Link>
              </p>

             
            </form>
            {otpMessage && <p>{otpMessage}</p>}

            {showOtpPopup && <PopupOtp
          show={showOtpPopup}
          handleClose={handleCloseOtpPopup}
          handleVerifyOtp={handleVerifyOtp}
          otpCode={otpCode}
          handleChange={(e) => setOtpCode(e.target.value)}
        />}
        </div>
     </div>

  );
};

export default SignupForm;
