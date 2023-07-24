import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductAddEditForm from './ProductAddEditForm';
import { ProductContext } from "../../../App";
import axios from 'axios';


const EditProduct = ({hostLink}) => {
  const { productId } = useParams();
  const {handleSubmitEdit,setFormData} = useContext(ProductContext)
  
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
