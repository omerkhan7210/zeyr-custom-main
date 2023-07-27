// src/components/ProductItem.js
import React,{useContext} from 'react';
import {CartContext} from '../../App';
import { Link } from 'react-router-dom';
import AddtoWishlistButton from "../Wishlist/AddtoWishlistButton"

const ProductItem = ({ hostlink,product }) => {

  const {addToCart} = useContext(CartContext); 
  const productImagesArray = JSON.parse(product.productImages);

  return (

    <li class="product instock">
								<div class="product-inner">
									<div class="product-thumbnail product-thumbnails--hover">
										<Link to={`/products/${product.id}`}>
											<img src={`${hostlink}/uploads/`+product.featuredImage} alt={product.name}/>
											<img src={`${hostlink}/uploads/`+productImagesArray[0]} class="hover-image" alt={product.name}/>
										</Link>
									</div>
									<div class="product-summary">
										<h2 class="loop-product__title"><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
										<span class="price">{product.price}</span>
										<div class="buttons clearfix">
											<a  class="ajax_add_to_cart button" onClick={addToCart}>Add to cart</a>
											<a  class="button" data-toggle="modal" data-target="quick-view-modal" rel="nofollow">
												<span class="svg-icon icon-eye size-normal ">
													<svg width="24px" height="24px" viewBox="0 0 24 24">
														<g>
															<g>
																<circle cx="12" cy="12" r="2"/>
																<path d="M16.466,6.748C15.238,5.583,13.619,5,12,5S8.762,5.583,7.534,6.748L2,12l5.534,5.252C8.762,18.417,10.381,19,12,19 s3.238-0.583,4.466-1.748L22,12L16.466,6.748z M15.089,15.801C14.274,16.574,13.177,17,12,17s-2.274-0.426-3.089-1.199L4.905,12 l4.005-3.801C9.726,7.426,10.823,7,12,7s2.274,0.426,3.089,1.199L19.095,12L15.089,15.801z"/>
															</g>
															<rect fill="none" width="24" height="24"/>
														</g>
													</svg>
												</span>
											</a>
											<AddtoWishlistButton/>
										</div>
									</div>
								</div>
							</li>
  );
};

export default ProductItem;
