import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductDetailsContext } from "../ProductDetailPage";

const ProductBreadcrumbs = ()=>{

const {product} = useContext(ProductDetailsContext)

    return (
        <nav className="products-breadcrumb">
										<Link to="/">Home</Link>
										<span className="svg-icon icon-arrow-breadcrumb size-normal delimiter">
											<svg width="10px" height="10px" viewBox="2 2 10 10">
												<g>
													<g>
														<polygon points="9.156,7 6.656,10.125 5.987,9.589 8.058,7 5.987,4.411 6.656,3.875 		"/>
													</g>
													<rect x="2" y="2" fill="none" width="10" height="10"/>
												</g>
											</svg>
										</span>
										<a href="#">{product.categories}</a>
										<span className="svg-icon icon-arrow-breadcrumb size-normal delimiter">
											<svg width="10px" height="10px" viewBox="2 2 10 10">
												<g>
													<g>
														<polygon points="9.156,7 6.656,10.125 5.987,9.589 8.058,7 5.987,4.411 6.656,3.875 		"/>
													</g>
													<rect x="2" y="2" fill="none" width="10" height="10"/>
												</g>
											</svg>
										</span>
										{product.name}
									</nav>
    )
}

export default ProductBreadcrumbs;