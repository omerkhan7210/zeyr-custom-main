// src/components/CartSidebar.js
import React,{useContext} from 'react';
import { CartContextC } from '../Context/CartContext';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const CartSidebar = ({hostlink}) => {

  const {cartItems} = useContext(CartContextC); 
 // Calculate the total price by multiplying the price of each item with its quantity and then summing them up
 const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (

    <div id="cart-panel" className="cart-panel offscreen-panel">
		<div className="backdrop"></div>
		<div className="panel">
			<div className="hamburger-menu button-close active">
				<span className="menu-text" >Close</span>
				<div className="hamburger-box">
					<div className="hamburger-inner"></div>
				</div>
			</div>
			<div className="panel-header">
			{cartItems.length === 0 ? null :(
				<h1 style={{marginBottom:'0px'}}>Your Shopping Bag </h1>
			)
			}
			</div>
			<div className="panel-content">
				<div className="widget_shopping_cart_content products">
					
					
						{cartItems.length === 0 ? (
						<p>Your Shopping Bag is empty.</p>
						) : (
							<>
							<ul className="mini-cart cart_list product_list_widget ">
							{cartItems.map((item) => (
							<CartItem key={item.id} item={item}  hostlink={hostlink} />
							
							))}
							</ul>
							<p className="mini-cart__total total">
								<strong>Subtotal:</strong>
								<span className="amount">
									<span className="currencySymbol">$</span>{totalPrice}
								</span>
							</p>
							<p className="mini-cart__buttons buttons">
								<Link to="/cart" className="button">View cart</Link>
								<Link to="/checkout" className="button checkout">Checkout</Link>
							</p>
							</>
						)}
					
					
				</div>
			</div>
		</div>
	</div>
    
  );
};

export default CartSidebar;
