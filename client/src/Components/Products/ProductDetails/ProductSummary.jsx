import React, { useContext } from "react";
import ProductVariations from "./ProductVariations";
import ProductMeta from "./ProductMeta"
import ProductBreadcrumbs from "./ProductBreadcrumbs"
import { ProductDetailsContext } from "../ProductDetailPage";

const ProductSummary = ()=>{

	const {product} = useContext(ProductDetailsContext)

    return (
        <div className="summary entry-summary">
								<div className="product-toolbar clearfix">
									<ProductBreadcrumbs/>

								</div>

								<h1 className="product_title entry-title">{product.name}</h1>
								<div className="product-details__short-description">
									<p>{product.shortDescription}</p>
								</div>
								
								<p className="price">
									<ins>
										<span className="amount">
											<span className="currencySymbol">$</span>{product.price}
										</span>
									</ins>
									{/* <del>
										<span className="amount">
											<span className="currencySymbol">$</span>120
										</span>
									</del> */}
								</p>

								<p className="product-size-guide">
									<a
										href="#"
										data-toggle="off-canvas"
										data-target="size-guide-panel"
										className="size-guide-button"
										>
										Size Guide
									</a>
								</p>
								<ProductVariations/>

								<ProductMeta/>

								
							</div>
    )
}

export default ProductSummary;