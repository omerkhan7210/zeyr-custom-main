import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { LocationInfoContext } from '../../Context/LocationInfo';
import { UserDetailsContext } from '../../Context/UserDetails';

const MyAccount = () => {
 
  const {accountDetails,history} = useContext(UserDetailsContext);
  const {countryName} = useContext(LocationInfoContext);


  const handleLogout = () => {
    // Clear the token from the cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    history('/login'); // Redirect to the login page after logout
  };
 
  

  return (
    <div className="d-flex justify-center align-center g1 flex-c">
      <h1 className="signup-heading">Account</h1>
      <button onClick={handleLogout} className="button small" >Logout</button>
      <div className="user-profile d-flex justify-around w100 pi2">
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
            {countryName && <p>{countryName}</p>}
            <Link to="/view-addresses" className="button small">View addresses</Link>
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
