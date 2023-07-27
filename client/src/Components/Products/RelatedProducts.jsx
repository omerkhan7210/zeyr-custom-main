import React from "react";

const RelatedProducts = ()=>{
    return (
        <section className="related products">
							<h2>Related products</h2>

							<div className="konte-products konte-product-carousel konte-product-carousel__nav-angle" data-panel="1" data-slick="{&quot;arrows&quot;:false,&quot;dots&quot;:true,&quot;autoplay&quot;:true,&quot;autoplaySpeed&quot;:5000,&quot;infinite&quot;:false,&quot;slidesToShow&quot;:4,&quot;slidesToScroll&quot;:2}" data-nav_style="angle">
								<div className="columns-4 ">
									<ul className="products hover-slider columns-4">
										<li className="product instock">
											<div className="product-inner">
												<div className="product-thumbnail product-thumbnails--slider">
													<a href="#"><img src="../assets/images/product/pants-1.jpg" alt="The Slouch Dress"/></a>
													<a href="#"><img src="../assets/images/product/pants-2.jpg" alt="The Slouch Dress"/></a>
													<a href="#"><img src="../assets/images/product/pants-3.jpg" alt="The Slouch Dress"/></a>
												</div>
												<div className="product-summary">
													<h2 className="loop-product__title">
														<a href="../product/product-v2.html">The Slouch Dress</a>
													</h2>
													<span className="price">$180</span>
													<div className="buttons clearfix">
														<a href="#" className="ajax_add_to_cart button">Add to cart</a>
														<a href="#" className="button" data-toggle="modal" data-target="quick-view-modal" rel="nofollow">
															<span className="svg-icon icon-eye size-normal ">
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
														<a href="#" className="button add-to-wishlist-button" rel="nofollow">
															<span className="add-to-wishlist add">
																<span className="svg-icon icon-heart-o size-normal ">
																	<svg width="24px" height="24px" viewBox="0 0 24 24">
																		<g>
																			<path d="M16.243,5.843c0.801,0,1.555,0.312,2.121,0.879c1.17,1.17,1.17,3.073,0,4.243l-2.121,2.121l-2.121,2.121L12,17.328 l-2.121-2.121l-2.121-2.121l-2.121-2.121c-0.567-0.567-0.879-1.32-0.879-2.121c0-0.801,0.312-1.555,0.879-2.121 c0.567-0.567,1.32-0.879,2.121-0.879c0.801,0,1.555,0.312,2.121,0.879l0.707,0.707L12,8.843l1.414-1.414l0.707-0.707 C14.688,6.155,15.441,5.843,16.243,5.843 M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707 c-0.976-0.976-2.256-1.464-3.536-1.464S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121 L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843 L16.243,3.843z"/>
																			<rect fill="none" width="24" height="24"/>
																		</g>
																	</svg>
																</span>
																<span className="screen-reader-text button-text">Add to wishlist</span>
															</span>
															<span className="adding-to-wishlist adding">
																<span className="spinner"></span>
																<span className="screen-reader-text button-text">Adding to wishlist</span>
															</span>
															<span className="brow-wishlist added">
																<span className="svg-icon icon-heart size-normal ">
																	<svg width="24px" height="24px" viewBox="0 0 24 24">
																		<g>
																			<path d="M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707c-0.976-0.976-2.256-1.464-3.536-1.464 S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121 c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843L16.243,3.843z"/>
																			<rect fill="none" width="24" height="24"/>
																		</g>
																	</svg>
																</span>
																<span className="screen-reader-text button-text">Added to wishlist</span>
															</span>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li className="product instock">
											<div className="product-inner">
												<span className="products-badges products-badges--round"> <span className="onsale products-badge"><span>25%</span></span> </span>
												<div className="product-thumbnail product-thumbnails--slider">
													<a href="#"><img src="../assets/images/product/pants-4.jpg" alt="Wyoming Backpack"/></a>
													<a href="#"><img src="../assets/images/product/pants-5.jpg" alt="Wyoming Backpack"/></a>
												</div>
												<div className="product-summary">
													<h2 className="loop-product__title">
														<a href="../product/product-v3.html">Wyoming Backpack</a>
													</h2>
													<span className="price">$90</span>
													<div className="buttons clearfix">
														<a href="#" className="ajax_add_to_cart button">Add to cart</a>
														<a href="#" className="button" data-toggle="modal" data-target="quick-view-modal" rel="nofollow">
															<span className="svg-icon icon-eye size-normal ">
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
														<a href="#" className="button add-to-wishlist-button" rel="nofollow">
															<span className="add-to-wishlist add">
																<span className="svg-icon icon-heart-o size-normal ">
																	<svg width="24px" height="24px" viewBox="0 0 24 24">
																		<g>
																			<path d="M16.243,5.843c0.801,0,1.555,0.312,2.121,0.879c1.17,1.17,1.17,3.073,0,4.243l-2.121,2.121l-2.121,2.121L12,17.328 l-2.121-2.121l-2.121-2.121l-2.121-2.121c-0.567-0.567-0.879-1.32-0.879-2.121c0-0.801,0.312-1.555,0.879-2.121 c0.567-0.567,1.32-0.879,2.121-0.879c0.801,0,1.555,0.312,2.121,0.879l0.707,0.707L12,8.843l1.414-1.414l0.707-0.707 C14.688,6.155,15.441,5.843,16.243,5.843 M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707 c-0.976-0.976-2.256-1.464-3.536-1.464S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121 L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843 L16.243,3.843z"/>
																			<rect fill="none" width="24" height="24"/>
																		</g>
																	</svg>
																</span>
																<span className="screen-reader-text button-text">Add to wishlist</span>
															</span>
															<span className="adding-to-wishlist adding">
																<span className="spinner"></span>
																<span className="screen-reader-text button-text">Adding to wishlist</span>
															</span>
															<span className="brow-wishlist added">
																<span className="svg-icon icon-heart size-normal ">
																	<svg width="24px" height="24px" viewBox="0 0 24 24">
																		<g>
																			<path d="M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707c-0.976-0.976-2.256-1.464-3.536-1.464 S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121 c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843L16.243,3.843z"/>
																			<rect fill="none" width="24" height="24"/>
																		</g>
																	</svg>
																</span>
																<span className="screen-reader-text button-text">Added to wishlist</span>
															</span>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li className="product instock">
											<div className="product-inner">
												<div className="product-thumbnail product-thumbnails--slider">
													<a href="#"><img src="../assets/images/product/shirt-1.jpg" alt="Text Printed T-Shirt"/></a>
													<a href="#"><img src="../assets/images/product/shirt-2.jpg" alt="Text Printed T-Shirt"/></a>
													<a href="#"><img src="../assets/images/product/shirt-3.jpg" alt="Text Printed T-Shirt"/></a>
												</div>
												<div className="product-summary">
													<h2 className="loop-product__title">
														<a href="../product/product-v4.html">Text Printed T-Shirt</a>
													</h2>
													<span className="price">$45</span>
													<div className="buttons clearfix">
														<a href="#" className="ajax_add_to_cart button">Add to cart</a>
														<a href="#" className="button" data-toggle="modal" data-target="quick-view-modal" rel="nofollow">
															<span className="svg-icon icon-eye size-normal ">
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
														<a href="#" className="button add-to-wishlist-button" rel="nofollow">
															<span className="add-to-wishlist add">
																<span className="svg-icon icon-heart-o size-normal ">
																	<svg width="24px" height="24px" viewBox="0 0 24 24">
																		<g>
																			<path d="M16.243,5.843c0.801,0,1.555,0.312,2.121,0.879c1.17,1.17,1.17,3.073,0,4.243l-2.121,2.121l-2.121,2.121L12,17.328 l-2.121-2.121l-2.121-2.121l-2.121-2.121c-0.567-0.567-0.879-1.32-0.879-2.121c0-0.801,0.312-1.555,0.879-2.121 c0.567-0.567,1.32-0.879,2.121-0.879c0.801,0,1.555,0.312,2.121,0.879l0.707,0.707L12,8.843l1.414-1.414l0.707-0.707 C14.688,6.155,15.441,5.843,16.243,5.843 M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707 c-0.976-0.976-2.256-1.464-3.536-1.464S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121 L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843 L16.243,3.843z"/>
																			<rect fill="none" width="24" height="24"/>
																		</g>
																	</svg>
																</span>
																<span className="screen-reader-text button-text">Add to wishlist</span>
															</span>
															<span className="adding-to-wishlist adding">
																<span className="spinner"></span>
																<span className="screen-reader-text button-text">Adding to wishlist</span>
															</span>
															<span className="brow-wishlist added">
																<span className="svg-icon icon-heart size-normal ">
																	<svg width="24px" height="24px" viewBox="0 0 24 24">
																		<g>
																			<path d="M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707c-0.976-0.976-2.256-1.464-3.536-1.464 S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121 c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843L16.243,3.843z"/>
																			<rect fill="none" width="24" height="24"/>
																		</g>
																	</svg>
																</span>
																<span className="screen-reader-text button-text">Added to wishlist</span>
															</span>
														</a>
													</div>
												</div>
											</div>
										</li>

										<li className="product instock">
											<div className="product-inner">
												<div className="product-thumbnail product-thumbnails--slider">
													<a href="#"><img src="../assets/images/product/shirt-4.jpg" alt="Duck Bag"/></a>
													<a href="#"><img src="../assets/images/product/shirt-5.jpg" alt="Duck Bag"/></a>
													<a href="#"><img src="../assets/images/product/shirt-6.jpg" alt="Duck Bag"/></a>
												</div>
												<div className="product-summary">
													<h2 className="loop-product__title">
														<a href="../product/product-v1.html">Duck Bag</a>
													</h2>
													<span className="price">$220</span>
													<div className="buttons clearfix">
														<a href="#" className="ajax_add_to_cart button">Add to cart</a>
														<a href="#" className="button" data-toggle="modal" data-target="quick-view-modal" rel="nofollow">
															<span className="svg-icon icon-eye size-normal ">
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
														<a href="#" className="button add-to-wishlist-button" rel="nofollow">
															<span className="add-to-wishlist add">
																<span className="svg-icon icon-heart-o size-normal ">
																	<svg width="24px" height="24px" viewBox="0 0 24 24">
																		<g>
																			<path d="M16.243,5.843c0.801,0,1.555,0.312,2.121,0.879c1.17,1.17,1.17,3.073,0,4.243l-2.121,2.121l-2.121,2.121L12,17.328 l-2.121-2.121l-2.121-2.121l-2.121-2.121c-0.567-0.567-0.879-1.32-0.879-2.121c0-0.801,0.312-1.555,0.879-2.121 c0.567-0.567,1.32-0.879,2.121-0.879c0.801,0,1.555,0.312,2.121,0.879l0.707,0.707L12,8.843l1.414-1.414l0.707-0.707 C14.688,6.155,15.441,5.843,16.243,5.843 M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707 c-0.976-0.976-2.256-1.464-3.536-1.464S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121 L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843 L16.243,3.843z"/>
																			<rect fill="none" width="24" height="24"/>
																		</g>
																	</svg>
																</span>
																<span className="screen-reader-text button-text">Add to wishlist</span>
															</span>
															<span className="adding-to-wishlist adding">
																<span className="spinner"></span>
																<span className="screen-reader-text button-text">Adding to wishlist</span>
															</span>
															<span className="brow-wishlist added">
																<span className="svg-icon icon-heart size-normal ">
																	<svg width="24px" height="24px" viewBox="0 0 24 24">
																		<g>
																			<path d="M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707c-0.976-0.976-2.256-1.464-3.536-1.464 S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121 c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843L16.243,3.843z"/>
																			<rect fill="none" width="24" height="24"/>
																		</g>
																	</svg>
																</span>
																<span className="screen-reader-text button-text">Added to wishlist</span>
															</span>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li className="product instock">
											<div className="product-inner">
												<div className="product-thumbnail product-thumbnails--slider">
													<a href="#"><img src="../assets/images/product/shirt-7.jpg" alt="The Slouch Dress"/></a>
													<a href="#"><img src="../assets/images/product/shirt-8.jpg" alt="The Slouch Dress"/></a>
												</div>
												<div className="product-summary">
													<h2 className="loop-product__title">
														<a href="../product/product-v2.html">The Slouch Dress</a>
													</h2>
													<span className="price">$180</span>
													<div className="buttons clearfix">
														<a href="#" className="ajax_add_to_cart button">Add to cart</a>
														<a href="#" className="button" data-toggle="modal" data-target="quick-view-modal" rel="nofollow">
															<span className="svg-icon icon-eye size-normal ">
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
														<a href="#" className="button add-to-wishlist-button" rel="nofollow">
															<span className="add-to-wishlist add">
																<span className="svg-icon icon-heart-o size-normal ">
																	<svg width="24px" height="24px" viewBox="0 0 24 24">
																		<g>
																			<path d="M16.243,5.843c0.801,0,1.555,0.312,2.121,0.879c1.17,1.17,1.17,3.073,0,4.243l-2.121,2.121l-2.121,2.121L12,17.328 l-2.121-2.121l-2.121-2.121l-2.121-2.121c-0.567-0.567-0.879-1.32-0.879-2.121c0-0.801,0.312-1.555,0.879-2.121 c0.567-0.567,1.32-0.879,2.121-0.879c0.801,0,1.555,0.312,2.121,0.879l0.707,0.707L12,8.843l1.414-1.414l0.707-0.707 C14.688,6.155,15.441,5.843,16.243,5.843 M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707 c-0.976-0.976-2.256-1.464-3.536-1.464S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121 L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843 L16.243,3.843z"/>
																			<rect fill="none" width="24" height="24"/>
																		</g>
																	</svg>
																</span>
																<span className="screen-reader-text button-text">Add to wishlist</span>
															</span>
															<span className="adding-to-wishlist adding">
																<span className="spinner"></span>
																<span className="screen-reader-text button-text">Adding to wishlist</span>
															</span>
															<span className="brow-wishlist added">
																<span className="svg-icon icon-heart size-normal ">
																	<svg width="24px" height="24px" viewBox="0 0 24 24">
																		<g>
																			<path d="M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707c-0.976-0.976-2.256-1.464-3.536-1.464 S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121 c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843L16.243,3.843z"/>
																			<rect fill="none" width="24" height="24"/>
																		</g>
																	</svg>
																</span>
																<span className="screen-reader-text button-text">Added to wishlist</span>
															</span>
														</a>
													</div>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</section>
    )
}

export default RelatedProducts;