import React,{useEffect,createContext,useState,useContext} from 'react'
import axios from 'axios';
import { tokenContextC } from './TokenContext';
import { useNavigate } from 'react-router-dom';

export const UserDetailsContext = createContext();

const UserDetails = ({hostlink,children}) => {
    const history = useNavigate();
    const [accountDetails, setAccountDetails] = useState(null);
    const {token,isTokenExpired} = useContext(tokenContextC)

    useEffect(() => {
   
        const checkAuth = async () => {
    
          if (!token || isTokenExpired) {
            // If there's no token, redirect to the login page
            history('/login');
            return;
          }
    
    
          // Fetch account details from the server
          try {
            const response = await axios.get(`${hostlink}/account-details`, {
              headers: {
                Authorization: `Bearer ${token}`, // Pass the JWT token in the request headers
              },
            });
            setAccountDetails(response.data);
          } catch (error) {
            console.error(error);
            // Handle error fetching account details
          }
        };
    
        checkAuth();
      }, [hostlink, history]);

  return (
    <UserDetailsContext.Provider value={{accountDetails,history}}>
        {children}
    </UserDetailsContext.Provider>
  )
}

export default UserDetails;
