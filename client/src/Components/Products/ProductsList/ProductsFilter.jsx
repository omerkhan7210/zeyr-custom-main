import React from "react";

const ProductsFilter = ()=>{
    return (
        <div id="products-filter" className="products-filter-sidebar products-filter dropdown-panel">
									<div className="konte-container products-filter-container">
										<div className="hamburger-menu button-close active">
											<span className="menu-text">Close</span>
											<div className="hamburger-box">
												<div className="hamburger-inner"></div>
											</div>
										</div>

										<div className="panel-header">
											<h3>Filter By</h3>
										</div>

										<div className="filter-widgets">
											<section id="konte-products-filter-3" className="widget products-filter-widget">
												<form action="#" method="get" className="ajax-filter">
													<div className="filters">
														<div className="filter product_cat list ">
															<span className="filter-name">Categories</span>
															<div className="filter-control">
																<ul className="filter-list">
																	<li className="filter-list-item " data-value="bedroom">
																		<span className="name">Bedroom</span>
																		<span className="count">2</span>
																	</li>
																	<li className="filter-list-item " data-value="kitchen">
																		<span className="name">Kitchen</span>
																		<span className="count">5</span>
																	</li>
																	<li className="filter-list-item " data-value="living-room">
																		<span className="name">Living Room</span>
																		<span className="count">9</span>
																	</li>
																	<li className="filter-list-item " data-value="outdoor">
																		<span className="name">Outdoor</span>
																		<span className="count">4</span>
																	</li>
																</ul>
															</div>
														</div>

														<div className="filter products_group list ">
															<span className="filter-name">Sort By</span>
															<div className="filter-control">
																<ul className="filter-list">
																	<li className="filter-list-item " data-value="">
																		<span className="name">All Products</span>
																		<span className="count">0</span>
																	</li>
																	<li className="filter-list-item " data-value="best_sellers">
																		<span className="name">Best Sellers</span>
																		<span className="count">0</span>
																	</li>
																	<li className="filter-list-item " data-value="new">
																		<span className="name">New Products</span>
																		<span className="count">0</span>
																	</li>
																	<li className="filter-list-item " data-value="sale">
																		<span className="name">Sale Products</span>
																		<span className="count">0</span>
																	</li>
																	<li className="filter-list-item " data-value="featured">
																		<span className="name">Hot Products</span>
																		<span className="count">0</span>
																	</li>
																</ul>
															</div>
														</div>

														<div className="filter filter_color attribute list color multiple">
															<span className="filter-name">Color</span>
															<div className="filter-control">
																<ul className="filter-list">
																	<li className="filter-list-item " data-value="black">
																		<span className="name">Black</span>
																		<span className="count">7</span>
																	</li>
																	<li className="filter-list-item " data-value="blue">
																		<span className="name">Blue</span>
																		<span className="count">7</span>
																	</li>
																	
																</ul>
															</div>
														</div>

														<div className="filter price slider ">
															<span className="filter-name">Price</span>
															<div className="filter-control">
																<div className="widget widget_price_filter">
																	<h2 className="widgettitle">Filter by price</h2>

																	<div className="konte-price-slider" data-min = "20" data-max= "1000" data-currency = '$'>
																		<div id ="konte-price-slider__inner">

																		</div>
																		<p>
							  												<label>Price:</label>
																			<input type="text" id="konte-price-slider__amount"/>
																		</p>
																	</div>
																</div>
															</div>
														</div>

													</div>

													<button type="submit" defaultValue="Filter" className="button filter-button">Filter</button>
													<button type="reset" defaultValue="Reset Filter" className="button alt reset-button">Reset Filter</button>
												</form>
											</section>

										</div>
									</div>
								</div>
    )
}

export default ProductsFilter;