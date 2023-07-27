import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';


const LoginForm = ({hostlink,noClasses}) => {
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

    
    <form className={`${noClasses ? null : "d-flex justify-center flex-c align-center w25   mauto"} products-form products-form-login login`}  method="post" onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
					<p className="form-row w100">
						<label htmlFor="panel_username">Email</label>
						<input  className="input-text w100"  id="panel_username" type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setUsername(e.target.value)} />
					</p>
					<p className="form-row w100">
						<label htmlFor="panel_password">Password</label>
						<input className="input-text w100"  name="password" id="panel_password"  type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
					</p>
					<p className="form-row d-flex justify-center">
						<button type="submit" className="button large"  defaultValue="Sign in" data-signing="Siging in..." data-signed="Signed In">Sign in</button>
						
					</p>
          <p className="lost_password">
						<Link href="/forgot-password">Lost your password?</Link>
					</p>
          <p className="form-row w100 d-flex justify-center">
          <Link to="/signup"> <span className="create-account button large alt">Create An Account</span></Link>
          </p>
				
				</form>
   
  );
};

export default LoginForm;
