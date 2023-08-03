import React,{useContext, useEffect, useState} from "react";
import { CartContextC } from "../../Context/CartContext";

const CartItemRows = ({item,hostlink})=>{

	const [quantity, setQuantity] = useState(1);
  
  
	const handleQuantityChange = (event) => {
	  const newQuantity = parseInt(event.target.value, 10);
	  setQuantity(newQuantity);
	};
	const {removeFromCart} = useContext(CartContextC);


    return (
        <tr className="cart-form__cart-item cart_item">
													<td className="product-thumbnail"> 
                                                    <a href={`/products/`+ item.id}>
                                                        <img width="340" height="480" src={`${hostlink}/uploads/` + item.featuredImage} className="" alt={item.name}/>

                                                        </a>
													</td>

													<td className="product-name" data-title="Product Name">
														<a href={`/products/`+ item.id}>{item.name}</a>
														<dl className="variation">
															<dt className="variation-Size">Size:</dt>
															<dd className="variation-Size"><p>{item.selectedVariations.size}</p></dd>
															<dt className="variation-Color">Color:</dt>
															<dd className="variation-Color"><p>{item.selectedVariations.color}</p></dd>
														</dl>
														<div className="product-price">
															<span className="amount">
																<span className="currencySymbol">$</span>{item.price}
															</span>
														</div>
													</td>

													<td className="product-price" data-title="Price">
														<span className="amount"><span className="currencySymbol">$</span>{item.price}</span>
													</td>

													<td className="product-quantity" data-title="Quantity">
														<div className="quantity">
															<label className="screen-reader-text">Quantity</label>
															<span className="svg-icon icon-minus size-normal qty-button decrease">
																<svg width="16px" height="16px" viewBox="0 0 16 16">
																	<g>
																		<rect fill="none" width="16" height="16"/>
																		<g>
																			<rect x="3" y="7" width="10" height="2"/>
																		</g>
																	</g>
																</svg>
															</span>
															<input 
																type="number" 
																className="input-text qty text" 
																step="1" 
																min="0" 
																max="50" 
																defaultValue={item.quantity}
																onChange={handleQuantityChange} 
																title="Qty"
															/>
															<span className="svg-icon icon-plus size-normal qty-button increase">
																<svg width="16px" height="16px" viewBox="0 0 16 16">
																	<g>
																		<rect fill="none" width="16" height="16"/>
																		<polygon points="13,7 9,7 9,3 7,3 7,7 3,7 3,9 7,9 7,13 9,13 9,9 13,9"/>
																	</g>
																</svg>
															</span>
														</div>
													</td>

													

													<td className="product-remove">
														<a onClick={()=> removeFromCart(item.id)} className="remove" aria-label="Remove this item">
															<span className="svg-icon icon-close size-normal close-icon">
																<svg width="24px" height="24px" viewBox="0 0 24 24">
																	<g>
																		<rect fill="none" width="24" height="24"/>
																		<polygon points="19.778,5.636 18.364,4.222 12,10.586 5.636,4.222 4.222,5.636 10.586,12 4.222,18.364 5.636,19.778 12,13.414 18.364,19.778 19.778,18.364 13.414,12"/>
																	</g>
																</svg>
															</span>
														</a>
													</td>
												</tr>
    )
}

export default CartItemRows;