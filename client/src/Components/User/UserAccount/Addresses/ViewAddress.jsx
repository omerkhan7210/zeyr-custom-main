import React, { useState, useEffect, useContext } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import AddressForm from './AddressForm';
import { tokenContextC } from '../../../Context/TokenContext';

const ViewAddress = ({hostlink}) => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const {token,isTokenExpired} = useContext(tokenContextC);
  const [btnText,setBtnText] = useState('Add Address');
  const history = useNavigate();

  if(isTokenExpired){
    history('/login')
  }

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


  // Fetch the addresses for the logged-in user
  async function fetchAddresses() {
    try {
      const response = await axios.get(`${hostlink}/retrieve-address`, {
        headers: {
          Authorization: `Bearer ${token}`,
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

  
  // Handle form submission to add a new address
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${hostlink}/address`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
  
  // Function to handle editing an address
  const handleEditAddress = async (addressId) => {
    // Find the address to be edited from the addresses list
    const addressToEdit = addresses.find((address) => address.id === addressId);
    console.log(addressToEdit)

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
    console.log(formData)
    setBtnText("Edit Address")
    // Show the form for editing the address
    setShowForm(true);

    try{
 // Send a request to delete the address from the backend
      await axios.put(`${hostlink}/address/${addressId}`,formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
      }); // Fetch updated addresses from the backend
      
    fetchAddresses();
    } catch (error) {
        console.error(error);
    }
  };

  // Function to handle deleting an address
  const handleDeleteAddress = async (addressId) => {
    try {
      // Send a request to delete the address from the backend
      await axios.delete(`${hostlink}/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the addresses list by removing the deleted address
      setAddresses(addresses.filter((address) => address._id !== addressId));
      window.location.reload();
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

            // Fetch updated addresses from the backend
            fetchAddresses();
          } catch (error) {
            console.error(error);
          }
        };
      


  return (
    <div className='d-flex align-center flex-c justify-center'>
      <h2>Addresses</h2>
      <Link to="/my-account">Return to account details</Link>
      
      
      <button className='button medium' onClick={() => setShowForm(!showForm)}>Add a New Address</button>

      {/* Conditionally render the form based on the showForm state */}
      {showForm && (
        <>
        <h3 className="signup-heading signup-heading-two">Add A New Address</h3>
        <AddressForm handleSubmit={btnText === 'Add Address' ? handleSubmit : handleEditAddress} formData={formData} setFormData={setFormData} btnText={btnText}/>
        <button className='button small' onClick={() => setShowForm(!showForm)}>^</button>
        </>
      )}

    {addresses.length > 0 ? (
      <>      
      <h2>Your Addresses</h2>
      <div className='existing-address d-flex w100'>
      
        
        {addresses.map((address) => (
          <div className="d-flex flex-c w100 align-center nomargin" key={address.id}>
            {address.isDefault && <h2>Default Address</h2>}
            <p>{address.firstName} {address.lastName}</p>
            
            <p>{address.company}</p>
            <p>{address.addressLine1}</p>
            <p>{address.addressLine2}</p>
            <p>{address.country},{address.city}, {address.state} {address.zipCode}</p>
            <p>{address.phone}</p> 
          {/* Edit and Delete buttons */}
          <div className='d-flex g2 mt1'>
              <button onClick={() => handleEditAddress(address.id)} className='button small'>Edit</button>
              <button onClick={() => handleDeleteAddress(address.id)}  className='button small'>Delete</button>
          </div>
          

          {/* Default Address checkbox */}
          <p className="form-row w100 d-flex align-center justify-center g1">
          <input
            type="checkbox"
            checked={address.isDefault}
            onChange={() => handleSetDefaultAddress(address.id)}
          />
          <label htmlFor={`defaultbox-${address.id}`}>Set as default</label>
          </p>

          <hr />
          </div>
        ))}
      </div>
      </>

    ) : (
      <p>You have no addresses</p>
    )}
    </div>
  );
};

export default ViewAddress;
