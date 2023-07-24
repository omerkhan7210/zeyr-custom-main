// src/components/ProductList.js
import React,{useContext,useState,useEffect} from 'react';
import ProductItem from './ProductItem';
import { AppContext } from '../Categories/DisplayProducts';
import axios from 'axios';


const ProductList = ({ hostlink,products}) => {

  const {addToCart} = useContext(AppContext); 

  return (
    <>
    <h1 className='prod-category-title'>{products[0].categories}</h1>
    <div className='prod-container'>
      
      {products.map((product) => (
        <ProductItem key={product.id} product={product} addToCart={addToCart} hostlink={hostlink} />
      ))}
    </div>
    </>
  );
};

export default ProductList;


