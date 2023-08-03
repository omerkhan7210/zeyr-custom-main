import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductAddEditForm from './ProductAddEditForm/ProductAddEditForm';
import axios from 'axios';
import { AddProductAdminContext } from '../../Context/AddProductContext';


const EditProduct = ({hostLink}) => {
  const { productId } = useParams();
  const {handleSubmitEdit,setFormData} = useContext(AddProductAdminContext)
  
const fetchProductDetails = async () => {
  try {
    const response = await axios.get(`${hostLink}/products/${productId}`);
    setFormData(response.data);
  } catch (error) {
    console.error(error);
  }
};

  

  useEffect(() => {
    // Fetch product details by productId
    fetchProductDetails();
  }, [productId]);


  return (
    <div className='signup-container'>
      <h3 className='signup-heading'>Edit Product</h3>
      
        <ProductAddEditForm handleSubmit={handleSubmitEdit} fetchProductDetails={fetchProductDetails}/>
       
    </div>
  );
};

export default EditProduct;
