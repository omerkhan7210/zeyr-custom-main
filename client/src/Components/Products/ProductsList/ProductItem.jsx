// src/components/ProductItem.js
import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import AddtoWishlistButton from "../../Wishlist/AddtoWishlistButton"

const ProductItem = ({ hostlink,product }) => {

  const productImagesArray = JSON.parse(product.productImages);

  return (

    <li class="product instock">
								<div class="product-inner">
								<div class="buttons clearfix position-a">
											
											<AddtoWishlistButton product={product}/>
										</div>
									<div class="product-thumbnail product-thumbnails--hover">
										<Link to={`/products/${product.id}`}>
											<img src={`${hostlink}/uploads/`+product.featuredImage} alt={product.name}/>
											<img src={`${hostlink}/uploads/`+productImagesArray[0]} class="hover-image" alt={product.name}/>
										</Link>
									</div>
									<div class="product-summary">
										<h2 class="loop-product__title">
											<Link to={`/products/${product.id}`}>{product.name}</Link>
										</h2>
										<span class="price">${product.price}</span>
										
									</div>
								</div>
							</li>
  );
};

export default ProductItem;
