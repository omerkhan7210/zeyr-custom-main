import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Import jwt-decode library
import axios from 'axios';

const MyAccount = ({hostlink}) => {
  const history = useNavigate();
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();

      if (!token) {
        // If there's no token, redirect to the login page
        history('/login');
        return;
      }

      // Check if the token is expired
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        // If the token is expired, remove the token from the cookie and redirect to the login page
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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


  const handleLogout = () => {
    // Clear the token from the cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    history('/login'); // Redirect to the login page after logout
  };
  const getToken = () => {
    // Get the token from the cookie
    const tokenCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='));
  
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      return token;
    }
  
    return null; // Token not found or empty cookie, return null or any other appropriate value
  };
  

  return (
    <div className="my-account-container">
      <h1 className="signup-heading">Account</h1>
      <button onClick={handleLogout} className="form-btn">Logout</button>
      <div className="user-profile">
        <div className="left-side-content">
        <h2>Order History</h2>
        <p>You have no orders for now..</p>
        </div>
        <div className="right-side-content">
        <h2>Account Details</h2>
        {/* Display user profile details */}
        {accountDetails ? (
          <div className="profile-details">
            <p>{accountDetails.fname + " " + accountDetails.lname}</p>
            <p>{accountDetails.email}</p>
            <Link to="/view-addresses">View addresses</Link>
            {/* Add other account details */}
          </div>
        ) : (
          <p>Loading account details...</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
