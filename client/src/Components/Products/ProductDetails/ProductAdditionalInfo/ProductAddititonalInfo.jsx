import React from "react";
import ProductInfoTabs from "./ProductInfoTabs";
import ProductReviews from "../ProductReviews/ProductReviews";

const ProductAddtionalInfo = ()=>{
    return (
        <div className="products-tabs wc-tabs-wrapper panels-offscreen">
									<ProductInfoTabs />
									<div className="panels">
										<div className="backdrop"></div>
										<div className="products-tabs-panel products-tabs-panel--description panel entry-content wc-tab" id="tab-description" role="tabpanel" aria-labelledby="tab-title-description">
											<div className="hamburger-menu button-close active">
												<span className="menu-text">Close</span>
												<div className="hamburger-box">
													<div className="hamburger-inner"></div>
												</div>
											</div>
											<div className="panel-header">
												<h3>Description</h3>
											</div>
											<div className="panel-content">
												<p className="fs-24 lh-32">Sed do eiusmod tempor incididunt ut labore</p>
												<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p><p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
											</div>
										</div>
										<div className="products-tabs-panel products-tabs-panel--additional_information panel entry-content wc-tab" id="tab-additional_information" role="tabpanel" aria-labelledby="tab-title-additional_information">
											<div className="hamburger-menu button-close active">
												<span className="menu-text">Close</span>
												<div className="hamburger-box">
													<div className="hamburger-inner"></div>
												</div>
											</div>
											<div className="panel-header">
												<h3>Additional information</h3>
											</div>
											<div className="panel-content">
												<table className="product-attributes shop_attributes">
													<tbody>
														<tr>
															<th >Size</th>
															<td >
																<p>Extra Large, Extra Small, Large, Medium, Small</p>
															</td>
														</tr>
														<tr>
															<th>Color</th>
															<td>
																<p>Black, Navy Blue, Pink, Yellow</p>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
										<div className="products-tabs-panel products-tabs-panel--reviews panel entry-content wc-tab" id="tab-reviews" role="tabpanel">
											<div className="hamburger-menu button-close active">
												<span className="menu-text">Close</span>
												<div className="hamburger-box">
													<div className="hamburger-inner"></div>
												</div>
											</div>
											<div className="panel-header"><h3>Reviews (1)</h3></div>
											<div className="panel-content">
												<ProductReviews/>
											</div>
										</div>
									</div>
								</div>
    )
}

export default ProductAddtionalInfo;