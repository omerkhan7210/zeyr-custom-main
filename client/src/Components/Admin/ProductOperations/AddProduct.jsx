import React,{useContext} from 'react';
import ProductAddEditForm from './ProductAddEditForm';
import { ProductContext } from "../../../App";



const AddProduct = () => {

  const {handleSubmit} = useContext(ProductContext)

  return (
    <div className='signup-container '>
      <h3 className='signup-heading'>Add New Product</h3>

      <ProductAddEditForm handleSubmit={handleSubmit}/>
    </div>
  );
};

export default AddProduct;
