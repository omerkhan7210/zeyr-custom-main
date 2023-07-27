import React,{useContext} from 'react';
import {CartContext} from '../../App';
import { Link } from 'react-router-dom';

const CartItem = ({ hostlink,item}) => {

  const {removeFromCart,increaseQuantity,decreaseQuantity} = useContext(CartContext); 

  return (

    <li className="mini-cart-item">
    <div className="mini-cart-item__thumbnail">
    <Link to={"/products/"+item.id}>
        <img width="120" height="140" src={`${hostlink}/uploads/`+item.featuredImage} alt={item.name}  />
      </Link>
    </div>
    <div className="mini-cart-item__summary">
      <span className="mini-cart-item__name">
        <Link to={"/products/"+item.id}>{item.name}</Link>
      </span>
      <div className="mini-cart-item__qty">
        <span className="label">Qty</span>
        <div className="quantity quantity-dropdown">
          <label className="screen-reader-text">Quantity: {item.quantity}</label>
          <span className="svg-icon icon-minus size-normal qty-button decrease" onClick={() => decreaseQuantity(item.id)}></span>
          <input type="number" className="input-text qty text" step="1" min="0" max="50" defaultValue="1" title="Qty"/>
          <span className="svg-icon icon-plus size-normal qty-button increase" onClick={() => increaseQuantity(item.id)}></span>
        </div>
        <span className="price">
          <span className="amount">
            <span className="currencySymbol">$</span> ${item.price}
          </span>
        </span>
      </div>
    </div>
    <a href="#" className="remove remove_from_cart_button" aria-label="Remove this item" onClick={() => removeFromCart(item.id)}>
      <span className="svg-icon icon-close-mini size-normal ">
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <g>
            <rect fill="none" width="18" height="18"/>
            <g>
              <polygon points="11.576,5.576 9,8.152 6.424,5.576 5.576,6.424 8.152,9 5.576,11.576 6.424,12.424 9,9.848 11.576,12.424 12.424,11.576 9.848,9 12.424,6.424"/>
              <path d="M9,1C4.582,1,1,4.582,1,9s3.582,8,8,8s8-3.582,8-8S13.418,1,9,1z M9,16c-3.86,0-7-3.14-7-7s3.14-7,7-7s7,3.14,7,7 S12.86,16,9,16z"/>
            </g>
          </g>
        </svg>
      </span>
    </a>
  </li>
    
  );
};

export default CartItem;
