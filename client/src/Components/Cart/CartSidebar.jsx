// src/components/CartSidebar.js
import React,{useContext} from 'react';
import { CartContext } from '../../App';
import CartItem from './CartItem';

const CartSidebar = ({hostlink}) => {

  const {cartItems,handleCloseSidebar,showCartSidebar,toggleCartSidebar} = useContext(CartContext); 

// Calculate the total quantity of items in the cart
const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (

    <div id="cart-panel" className={`cart-panel offscreen-panel ${showCartSidebar ? ' open' : ''}`}>
		<div className="backdrop"></div>
		<div className="panel">
			<div className="hamburger-menu button-close active" onClick={toggleCartSidebar}>
				<span className="menu-text" >Close</span>
				<div className="hamburger-box">
					<div className="hamburger-inner"></div>
				</div>
			</div>
			<div className="panel-header">
				<h3>Cart <span className="cart-panel-counter">{totalQuantity}</span></h3>
			</div>
			<div className="panel-content">
				<div className="widget_shopping_cart_content products">
					<ul className="mini-cart cart_list product_list_widget ">
					
						{cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.id} item={item}  hostlink={hostlink} />
        ))
      )}
					</ul>
					<p className="mini-cart__total total">
						<strong>Subtotal:</strong>
						<span className="amount">
							<span className="currencySymbol">$</span>PRODUCTS SUBTOTAL
						</span>
					</p>
					<p className="mini-cart__buttons buttons">
						<a href="other-shop-pages/cart.html" className="button">View cart</a>
						<a href="other-shop-pages/checkout.html" className="button checkout">Checkout</a>
					</p>
				</div>
			</div>
		</div>
	</div>
    
  );
};

export default CartSidebar;
