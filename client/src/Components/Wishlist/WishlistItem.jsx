import React from "react";

const WishlistItem = ()=>{
    return (
        <tr className="product-item">
												<td className="product-thumbnail">
													<a href="#">
                                                        <img width="680" height="920" src="../assets/images/product/shirt-10.jpg" className="" alt="The Slouch Dress"/></a>
												</td>

												<td className="product-name" data-title="Product">
													<a href="#">The Slouch Dress</a>
												</td>

												<td className="product-price" data-title="Price">
													<span className="amount"><span className="currencySymbol">$</span>185</span>
												</td>

												<td className="product-stock-status"> In stock</td>

												<td className="product-add-to-cart">
													<a href="#" data-quantity="1" className="button product_type_simple add_to_cart_button ajax_add_to_cart loop-product__button" aria-label="Add “Tennis Shoes” to your cart" rel="nofollow">Add to cart</a>
												</td>

												<td className="product-remove">
													<a href="#" className="remove" aria-label="Remove this item">
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

export default WishlistItem;