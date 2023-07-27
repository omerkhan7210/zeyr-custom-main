import React from "react";
import WishlistItem from "./WishlistItem"

const WishlistPage = ()=>{
    return (
        <div id="content" className="site-content">
			<div className="site-content-container container">
				<div id="primary" className="content-area">
					<main id="main" className="site-main">
						<div className="page hentry">
							<header className="entry-header"><h1 className="entry-title">Wishlist </h1></header>
							<div className="entry-content">
								<div className="soo-wishlist">
									<table className="shop_table shop_table_responsive wishlist_table">
										<thead>
											<tr>
												<th className="product-thumbnail">Product</th>
												<th className="product-name">&nbsp;</th>
												<th className="product-price">Price</th>
												<th className="product-stock-status">Stock status</th>
												<th className="product-add-to-cart">&nbsp;</th>
												<th className="product-remove">&nbsp;</th>
											</tr>
										</thead>
										<tbody>

											<WishlistItem/>

										</tbody>
									</table>
									<div className="soo-wishlist-share wishlist-share">
										<h4>Share on</h4>
										<ul>
											<li>
												<a href="https://twitter.com" className="konte-social konte-social--larger" target=" _blank">
													<i className="konte-social__icon fa fa-twitter"></i>
												</a>
											</li>
											<li>
												<a href="https://facebook.com" className="konte-social konte-social--larger" target=" _blank">
													<i className="konte-social__icon fa fa-facebook"></i>
												</a>
											</li>
											<li>
												<a href="https://instagram.com" target=" _blank" className="konte-social konte-social--larger">
													<i className="konte-social__icon fa fa-instagram"></i>
												</a>
											</li>
											<li>
												<a href="https://pinterest.com" target=" _blank" className="konte-social konte-social--larger">
													<i className="konte-social__icon fa fa-pinterest-p"></i>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
    )
}

export default WishlistPage;