import React, { useContext } from "react";
import { ProductDetailsContext } from "../ProductDetailPage";
import ProductVariationsRow from "./ProductVariationsRow";

const ProductVariations = ()=>{

	const {product} = useContext(ProductDetailsContext);

    return (

		{...product.variations ? (
			<form className="variations_form cart swatches-support" action="#" method="post" >
			<table className="variations">
				<tbody>
					
					<ProductVariationsRow/>
					
				</tbody>
			</table>
			<div className="single_variation_wrap">
				<div className="product-variation-add-to-cart variations_button product-variation-add-to-cart-enabled">
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
						<input type="number" className="input-text qty text" step="1" min="1" max="50" name="quantity" defaultValue="1" title="Qty"/>
						<span className="svg-icon icon-plus size-normal qty-button increase">
							<svg width="16px" height="16px" viewBox="0 0 16 16">
								<g>
									<rect fill="none" width="16" height="16"/>
									<polygon points="13,7 9,7 9,3 7,3 7,7 3,7 3,9 7,9 7,13 9,13 9,9 13,9"/>
								</g>
							</svg>
						</span>
					</div>
					<button type="submit" className="single_add_to_cart_button button alt">Add to cart</button>
				</div>
			</div>
		</form>
		):
		null
	}
       
								
    )
}

export default ProductVariations;