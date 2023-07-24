// src/components/CartSidebar.js
import React,{useContext} from 'react';
import { AppContext } from '../Categories/DisplayProducts';
import CartItem from './CartItem';

const CartSidebar = (props) => {

  const context = useContext(AppContext); 
  const cartItems = context?.cartItems || props.cartItems;
  const handleCloseSidebar = context?.handleCloseSidebar || props.handleCloseSidebar;
  const sidebarVisible = context?.sidebarVisible || props.sidebarVisible;


// Calculate the total quantity of items in the cart
const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


  return (
    <div className={`cart-sidebar${sidebarVisible ? ' active' : ''}`}>
      <button className='close-sidebar form-btn' onClick={handleCloseSidebar}>X</button>
      <h1 className='cart-sidebar-heading'>Shopping Bag</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.id} item={item} removeFromCart2={props.removeFromCart} increaseQuantity2={props.increaseQuantity} decreaseQuantity2={props.decreaseQuantity} hostlink={props.hostlink} />
        ))
      )}

      <p>Total Items: {totalQuantity}</p>
      
    </div>
  );
};

export default CartSidebar;
