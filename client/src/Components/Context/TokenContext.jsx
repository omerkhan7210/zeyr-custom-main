import React,{createContext,useState,useEffect} from 'react'
import jwtDecode from 'jwt-decode'; // Import jwt-decode library

export const tokenContextC = createContext();

const TokenContext = ({children}) => {

const [isTokenExpired, setIsTokenExpired] = useState(false);
const [isAdminTokenExpired, setIsAdminTokenExpired] = useState(false);

  const token = document.cookie
  .split('; ')
  .find((row) => row.startsWith('token='))
  ?.split('=')[1]; // Extract the token from the cookie

  
  const adminToken = document.cookie
  .split('; ')
  .find((row) => row.startsWith('adminToken='))
  ?.split('=')[1]; // Extract the token from the cookie


  useEffect(() => {
    if (token) {
      // Token is present, check if it's expired or not
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token is expired
        setIsTokenExpired(true);
      } else {
        // Token is still valid
        setIsTokenExpired(false);
      }
    } else {
      // Token is not present, set isTokenExpired to true
      setIsTokenExpired(true);
    }
    
    if (adminToken) {
      // Admin token is present, check if it's expired or not
      const decodedToken = jwtDecode(adminToken);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Admin token is expired
        setIsAdminTokenExpired(true);
      } else {
        console.log("true")
        // Admin token is still valid
        setIsAdminTokenExpired(false);
      }
    } else {
      // Admin token is not present, set isAdminTokenExpired to true
      setIsAdminTokenExpired(true);
    }
  },[token]);

  return (
    <tokenContextC.Provider value={{token,adminToken,isTokenExpired,isAdminTokenExpired}}>
        {children}
    </tokenContextC.Provider>
  )
}

export default TokenContext;
