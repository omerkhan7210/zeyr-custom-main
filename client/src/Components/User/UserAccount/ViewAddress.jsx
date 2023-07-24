import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const ViewAddress = ({hostlink}) => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
      firstName: '',
        lastName: '',
        company: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        zipCode: '',
        phone: ''
  });

  // Sample country options, replace it with your actual country options
const countryOptions = [
  { value: 'usa', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  // Add more countries as needed
];

  // Fetch the addresses for the logged-in user
  async function fetchAddresses() {
    try {
      const response = await axios.get(`${hostlink}/retrieve-address`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  
  
  // Function to handle editing an address
  const handleEditAddress = (addressId) => {
    // Find the address to be edited from the addresses list
    const addressToEdit = addresses.find((address) => address._id === addressId);

    // Populate the form data with the address details to be edited
    setFormData({
      firstName: addressToEdit.firstName,
      lastName: addressToEdit.lastName,
      company: addressToEdit.company,
      addressLine1: addressToEdit.addressLine1,
      addressLine2: addressToEdit.addressLine2,
      city: addressToEdit.city,
      country: addressToEdit.country,
      zipCode: addressToEdit.zipCode,
      phone: addressToEdit.phone,
    });

    // Show the form for editing the address
    setShowForm(true);
  };

  // Function to handle deleting an address
  const handleDeleteAddress = async (addressId) => {
    try {
      // Send a request to delete the address from the backend
      await axios.delete(`${hostlink}/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      // Update the addresses list by removing the deleted address
      setAddresses(addresses.filter((address) => address._id !== addressId));
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle setting a default address
  const handleSetDefaultAddress = async (addressId) => {
    try {
      // Send a request to the backend to set the address as the default address
      await axios.put(
        `${hostlink}/address/${addressId}/set-default`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

            // Fetch updated addresses from the backend
            fetchAddresses();
          } catch (error) {
            console.error(error);
          }
        };
      

  // Handle form submission to add a new address
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${hostlink}/address`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      // Update the addresses list with the newly added address
      setAddresses([...addresses, response.data.address]);
      // Clear the form data
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        zipCode: '',
        phone: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  
  const getToken = () => {
    // Get the token from the cookie
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      .split('=')[1];

    return cookieValue;
  };

  return (
    <div className='signup-container'>
      <h2 className="signup-heading">Addresses</h2>
      <Link to="/my-account">Return to account details</Link>
      
      
      <button className='form-btn' onClick={() => setShowForm(!showForm)}>Add a New Address</button>

      {/* Conditionally render the form based on the showForm state */}
      {showForm && (
        <>
        <h3 className="signup-heading signup-heading-two">Add A New Address</h3>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className='form-two-col'>
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
          </div>

          <input
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />

            <input
                type="text"
                placeholder="Address 1"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              />

              <input
                type="text"
                placeholder="Address 1"
                value={formData.addressLine2}
                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
              />

              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />

          
            <select
              id="country-dropdown"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            >
              {/* Generate country options */}
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="zipCode" // Add name attribute
              inputMode="numeric" // Set the input mode to numeric
              pattern="[0-9]*" // Add pattern to further enforce number input
              placeholder="Postal Code/Zip Code"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} // Use e.target.name
            />

            <input
              type="text"
              name="phone" // Add name attribute
              inputMode="numeric" // Set the input mode to numeric
              pattern="[0-9]*" // Add pattern to further enforce number input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} // Use e.target.name
            />

            
          <button type="submit"  className='form-btn'>Add Address</button>
        </form>
        </>
      )}

    {addresses.length > 0 ? (

      <div className='existing-address'>
      
        <h1 className="signup-heading m1">Your Addresses</h1>
        {addresses.map((address) => (
          <div className="signup-container" key={address._id}>
            {address.isDefault && <h2>Default Address</h2>}
            <p>{address.firstName} {address.lastName}</p>
            
            <p>{address.company}</p>
            <p>{address.addressLine1}</p>
            <p>{address.addressLine2}</p>
            <p>{address.country},{address.city}, {address.state} {address.zipCode}</p>
            <p>{address.phone}</p> 
          {/* Edit and Delete buttons */}
          <button onClick={() => handleEditAddress(address._id)}>Edit</button>
          <button onClick={() => handleDeleteAddress(address._id)}>Delete</button>

          {/* Default Address checkbox */}
          <input
            type="checkbox"
            checked={address.isDefault}
            onChange={() => handleSetDefaultAddress(address._id)}
          />
          <label htmlFor={`defaultbox-${address._id}`}>Set as default</label>
          
          <hr />
          </div>
        ))}
      </div>
    ) : (
      <p>You have no addresses</p>
    )}
    </div>
  );
};

export default ViewAddress;
