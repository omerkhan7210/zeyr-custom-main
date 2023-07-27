// src/components/Cart.js
import React,{useState,useContext} from 'react';
import {CartContext} from '../../App';
import CartSidebar from './CartSidebar';

const Cart = ({hostlink}) => {

  const {cartItems,sidebarVisible,removeFromCart,handleCloseSidebar,increaseQuantity,decreaseQuantity} = useContext(CartContext); 

  return (
    <div>
     
{sidebarVisible && <CartSidebar 
                      hostlink={hostlink} 
                      cartItems={cartItems} 
                      sidebarVisible={sidebarVisible} 
                      onClose={handleCloseSidebar} 
                      onRemove={removeFromCart} 
                      onIncrease={increaseQuantity} // Pass the event handler for increasing quantity
                      onDecrease={decreaseQuantity} // Pass the event handler for decreasing quantity
                 />}

    </div>
  );
};

export default Cart;
