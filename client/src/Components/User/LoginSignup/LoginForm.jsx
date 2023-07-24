import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginForm = ({hostlink}) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${hostlink}/login`, {
        email,
        password,
      });
     
        document.cookie = `token=${response.data.token}; path=/`;
            // Redirect to the home page
        history('/');
      
      
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div  className='signup-container'>
      <h2 className="signup-heading"> Login</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p><a href="/forgot-password" className='login-red-btn'>Forgot Your Password?</a></p>
        <button type="submit" className='form-btn'>Sign In</button>
      </form>
      <p><a href="/signup" className='login-red-btn'> Create An Account</a></p>
    </div>
  );
};

export default LoginForm;
