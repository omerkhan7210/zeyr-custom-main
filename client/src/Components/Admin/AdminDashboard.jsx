import React,{createContext,useState,useEffect} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; 

const AdminDashboard = ({hostlink}) => {
  const path = "/dashboard"
  const history = useNavigate();
   
    useEffect(() => {
        
        const checkAuth = async () => {
          const token = getToken();
    
          if (!token) {
            // If there's no token, redirect to the login page
            history('/admin');
            return;
          }
    
          // Check if the token is expired
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp < Date.now() / 1000) {
            // If the token is expired, remove the token from the cookie and redirect to the login page
            document.cookie = 'adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            history('/admin');
            return;
          }
        }
        
    checkAuth();
    },[history]); 

    const getToken = () => {
        // Get the token from the cookie
        const tokenCookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith('adminToken='));
      
        if (tokenCookie) {
          const token = tokenCookie.split('=')[1];
          return token;
        }
      
        return null; // Token not found or empty cookie, return null or any other appropriate value
      };

      const handleLogout = () => {
        // Clear the token from the cookie
        document.cookie = 'adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
        history('/admin'); // Redirect to the login page after logout
      };

 
      return (
        
        
        <div className='d-flex flex-c justify-center align-center g1'>
        <h2>Admin Dashboard</h2>
        <a  onClick={handleLogout} className='button medium'>Log out</a>
        <ul className='d-flex justify-evenly g1' style={{listStyleType:'none',padding:'0'}}>
          <li>
            <Link to={`${path}/add-product`} className='button medium'>Add Product</Link>
          </li>
          <li>
            <Link to={`${path}/product-list`} className='button medium'>Product List</Link>
          </li>
          <li>
            <Link to={`${path}/categories`} className='button medium'>Categories</Link>
          </li>
         
        </ul>
        </div>
        
      );
};

export default AdminDashboard;





