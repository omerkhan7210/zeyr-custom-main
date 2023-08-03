import React, {useState,createContext } from 'react';
import axios from 'axios';
import validator from 'validator';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';

export const LoginContextC = createContext();

const LoginContext = ({hostlink,children}) => {

       
  //const {isTokenExpired} = useContext(tokenContextC)
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  // if(!isTokenExpired){
  //   history('/my-zf')
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Validate email and password inputs
  if (!validator.isEmail(email)) {
    setErrorMessage('Please enter a valid email address.');
    return;
  }

  if (validator.isEmpty(password)) {
    setErrorMessage('Please enter your password.');
    return;
  }

    try {

      const response = await axios.post(`${hostlink}/login`, {
        email,
        password,
      });
     
        document.cookie = `token=${response.data.token}; path=/`;
            // Redirect to the home page
        history('/my-zf');
        // Reload the page after successful login
        window.location.reload();
      
    } catch (error) {
      console.error(error.response.data);
      // Sanitize the error message before displaying it
      setErrorMessage(DOMPurify.sanitize(error.response.data.message));
    
    }
  };

  return (
    <LoginContextC.Provider value={{handleSubmit,errorMessage,setPassword,setUsername,password,email}}>
        {children}
    </LoginContextC.Provider>
  )
}

export default LoginContext;
