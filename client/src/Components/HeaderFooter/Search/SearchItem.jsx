
import React from 'react';
import { Link } from 'react-router-dom';


const SearchItem = ({ hostlink,item}) => {
 
  return (

    <li className="mini-cart-item d-flex flex-c g1 align-start justify-center">
    <div className="mini-cart-item__thumbnail">
    <Link to={"/products/"+item.id}>
        <img  src={`${hostlink}/uploads/`+item.featuredImage} alt={item.name} style={{width:'100%' , height:'150px' , objectFit:'cover'}} />
      </Link>
    </div>
    <div className="mini-cart-item__summary">
      <span className="mini-cart-item__name">
        <Link to={"/products/"+item.id}>{item.name}</Link>
      </span>
      <span className="mini-cart-item__name">
        ${item.price}
      </span>
     
    </div>
   
  
  </li>


  )
}
export default SearchItem;

