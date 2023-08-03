import React,{useContext} from 'react';
import ProductAddEditForm from './ProductAddEditForm/ProductAddEditForm';
import { AddProductAdminContext } from '../../Context/AddProductContext';



const AddProduct = () => {

  const {handleSubmit} = useContext(AddProductAdminContext)

  return (
    <div className='signup-container '>
      <h3 className='signup-heading'>Add New Product</h3>

      <ProductAddEditForm handleSubmit={handleSubmit}/>
    </div>
  );
};

export default AddProduct;
