import React from "react";

const SearchModal = ()=>{
    return (
	<div id="search-modal" className="search-modal modal">
		<div className="modal-header">
			<h3>Search</h3>
			<div className="hamburger-menu button-close active">
				<span className="menu-text">Close</span>
				<div className="hamburger-box">
					<div className="hamburger-inner"></div>
				</div>
			</div>
		</div>
		<div className="modal-content">
			<div className="search-form konte-container">
				<form method="get" className="instance-search" action="#">
					<div className="search-fields">
						<input type="text" name="s" className="search-field" placeholder="Search…" autoComplete="off"/>

						<span className="spinner"></span>
						<button type="reset" className="search-reset">
							<svg width="24px" height="24px" viewBox="0 0 24 24">
								<g>
									<rect fill="none" width="24" height="24"/>
									<polygon points="19.778,5.636 18.364,4.222 12,10.586 5.636,4.222 4.222,5.636 10.586,12 4.222,18.364 5.636,19.778 12,13.414 18.364,19.778 19.778,18.364 13.414,12 	"/>
								</g>
							</svg>
						</button>
					</div>
				</form>
			</div>
			<div className="search-result konte-container">
				<p className="label">Search Result</p>
				<div className="view-more">
					<a href="#" className="button alt">View All</a>
				</div>
			</div>
		</div>
		<div className="modal-footer">
			<div className="konte-container">
				<div className="quick-links">
					<p className="label">Quick Links</p>
					<ul className="links">
						<li><a href="../shop/standard.html" className="underline-hover">SS2018</a></li>
						<li><a href="../shop/standard.html" className="underline-hover">Dresses</a></li>
						<li><a href="../shop/standard.html" className="underline-hover">Accessories</a></li>
						<li><a href="../shop/standard.html" className="underline-hover">Footwear</a></li>
						<li><a href="../shop/standard.html" className="underline-hover">Sweatshirt</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
    )
}

export default SearchModal;