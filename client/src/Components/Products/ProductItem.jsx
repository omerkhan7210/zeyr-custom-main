// src/components/ProductItem.js
import React,{useContext} from 'react';
import { AppContext } from '../Categories/DisplayProducts';
import { Link } from 'react-router-dom';

const ProductItem = ({ hostlink,product }) => {

  const {addToCart} = useContext(AppContext); 

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className='prod-inner-container'>
      <Link to={"/products/"+product.id} className='d-flex align-center justify-center flex-c'>
      <img className='prod-img' src={`${hostlink}/uploads/`+product.featuredImage} alt={product.name}  />
      <h2 className='prod-title'>{product.name}</h2>
      <p className='prod-price'>Price: ${product.price}</p>
      </Link>
      <button onClick={handleAddToCart} className='form-btn'>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
