// src/components/ProductList.js
import React,{useContext,useState,useEffect} from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ hostlink,products}) => {

  return (
    
    
      <>
      {/* <h1 className='prod-category-title'>{products[0].categories}</h1> */}
      <ul class="products hover-other_image main-products layout-standard columns-4">
							
             
      
      {...products ? (products.map((product) => (
        <ProductItem key={product.id} product={product} hostlink={hostlink} />
      ))
    ): (
      <p>No Products Available</p>
    )}
     </ul>
    </>
    
   
  );
};

export default ProductList;


