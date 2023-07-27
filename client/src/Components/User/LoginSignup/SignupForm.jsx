import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';



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

    <div id="login-panel" className="login-panel d-flex justify-center w25 align-center mauto">
		    <div className="panel w100">
            <form method="post"  onSubmit={handleSignup} className="products-form products-form-register register w100">
          <p className="form-row form-row-wide w100">
                <label for="panel_reg_fname">First Name:</label>
                <input type="text w100" className="input-text w100"  id="panel_reg_fname" value={fname} onChange={(e) => setFname(e.target.value)} required />
              </p>
              <p className="form-row form-row-wide w100">
                <label for="panel_reg_lname">Last Name:</label>
                <input type="text w100" className="input-text w100"  id="panel_reg_lname" value={lname} onChange={(e) => setLname(e.target.value)} required  />
              </p>
              <p className="form-row form-row-wide w100">
                <label for="panel_reg_email">Email address</label>
                <input type="email" className="input-text w100"  id="panel_reg_email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              </p>
              <p className="form-row form-row-wide w100">
                <label for="panel_reg_password">Password</label>
                <input type="password" className="input-text w100" name="password" id="panel_reg_password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
              </p>
              
              <p className="form-row w100 d-flex justify-center">
                <button type="submit" className="button large" name="register" defaultValue="Sign up">Sign up</button>
              </p>
              <p className="already_registered d-flex justify-center">
                <Link to="/login">Already has an account</Link>
              </p>

             
            </form>
            {message && <p>{message}</p>}

            {showOtpPopup && (
              <div className='d-flex flex-c justify-center align-center w100 g1'>
                <p className="form-row form-row-wide w100">
                <label for="panel_reg_otp">Enter OTP</label>
                <input type="text" id='panel_reg_otp' className="input-text w100" placeholder='Enter the otp code sent in your email..' onChange={(e) => setOtpCode(e.target.value)} required />
                <button onClick={handleVerifyOtp} className='login-red-btn'>Verify OTP</button>
                </p>
              </div>
            )}
        </div>
     </div>

  );
};

export default SignupForm;
