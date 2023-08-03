import React, { useContext } from "react";
import { CartContextC } from "../../Context/CartContext";
import CartItemRows from "./CartItemRows"
import { Link } from "react-router-dom";

const CartPage = ({hostLink})=>{

    const {cartItems} = useContext(CartContextC);
// Calculate the total price by multiplying the price of each item with its quantity and then summing them up
const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div id="content" className="site-content">
			<div className="site-content-container container">
				<div id="primary" className="content-area">
					<main id="main" className="site-main">
						<div className="page hentry">
							<header className="entry-header"><h1 className="entry-title">Cart</h1></header>

							<div className="entry-content " >

                                {cartItems.length>0 ? (

								<div className="products">
									<form className="cart-form" action="#" method="post">
										<table className="shop_table shop_table_responsive cart cart-form__contents">
											<thead>
												<tr>
													<th className="product-thumbnail">Product</th>
													<th className="product-name">&nbsp;</th>
													<th className="product-price">Price</th>
													<th className="product-quantity">Quantity</th>
													<th className="product-remove">&nbsp;</th>
												</tr>
											</thead>
											<tbody>
												
                                            {cartItems.map((item) => (
                                                    <CartItemRows key={item.id} item={item} hostlink={hostLink}/>
                                            )
                                            )}

												{/* COUPON CODE */}

											</tbody>
										</table>
									</form>

									<div className="cart-collaterals">
										<div className="cart_totals ">
											<h2>Cart totals</h2>

											<table className="shop_table shop_table_responsive cart-subtotal-table">
												<tbody>
													<tr className="cart-subtotal">
														<th>Subtotal</th>
														<td data-title="Subtotal">
															<span className="amount"><span className="currencySymbol">$</span>{totalPrice}</span>
														</td>
													</tr>
												</tbody>
											</table>


											<div className="wc-proceed-to-checkout">
												<Link to="/checkout" className="checkout-button button alt wc-forward"> Proceed to checkout</Link></div>
										</div>
									</div>
								</div>
                                ):(
								<>	
								<p className="cart-empty d-flex flex-c g1 align-center">
								<img src="/images/empty-bag.svg" width="150" alt="Cart is empty"/>Your cart is currently empty.</p>

								<p className="return-to-shop"> <Link className="button wc-backward" to="/"> Return to shop </Link></p>
								</>
								)
                                }
                                
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
    )
}

export default CartPage;