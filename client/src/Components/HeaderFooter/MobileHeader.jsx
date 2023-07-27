import React from 'react-dom';
import { Link } from 'react-router-dom';

const MobileHeader = ()=>{
    return (
        
	<div id="mobile-menu" className="mobile-menu-panel offscreen-panel">
		<div className="backdrop"></div>
		<div className="panel">
			<div className="header-mobile custom logo-center">
				<div className="konte-container-fluid">
					<div className="mobile-menu-hamburger">
						<button className="mobile-menu-toggle hamburger-menu" data-toggle="off-canvas" data-target="mobile-menu">
							<span className="hamburger-box">
								<span className="hamburger-inner"></span>
							</span>
						</button>
					</div>
					<div className="site-branding">
						<Link to="/" className='logo'>
							<img src="assets/images/logo.svg" alt="Konte" className="logo-dark"/>
							<img src="assets/images/logo-light.svg" alt="Konte" className="logo-light"/>
						</Link>
						<p className="site-title"><Link to="/">Konte</Link></p>
						<p className="site-description">Premium WordPress theme</p>
					</div>
					<div className="mobile-header-icons">
						<div className="header-cart">
							<a href="other-shop-pages/cart.html" data-toggle="off-canvas" data-target="cart-panel">
								<span className="svg-icon icon-cart size-normal shopping-cart-icon">
									<svg width="24px" height="24px" viewBox="0 0 24 24">
										<g>
											<rect fill="none" width="24" height="24"/>
											<path d="M19,10h-3V7c0-2.206-1.794-4-4-4S8,4.794,8,7v3H5c-0.55,0-0.908,0.441-0.797,0.979l1.879,9.042
											C6.194,20.559,6.736,21,7.286,21h9.429c0.55,0,1.092-0.441,1.203-0.979l1.879-9.042C19.908,10.441,19.55,10,19,10z M10,7 c0-1.103,0.897-2,2-2s2,0.897,2,2v3h-4V7z M16.087,19H7.913l-1.455-7h11.313L16.087,19z"/>
										</g>
									</svg>
								</span>
								<span className="counter cart-counter">2</span>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="mobile-menu__search-form">
				<form method="get" action="#">
					<label>
						<span className="svg-icon icon-search size-normal search-icon">
							<svg width="24px" height="24px" viewBox="0 0 24 24">
								<g>
									<rect fill="none" width="24" height="24"/>
									<path d="M20,18.586l-3.402-3.402C17.474,14.015,18,12.57,18,11c0-3.86-3.141-7-7-7c-3.86,0-7,3.14-7,7c0,3.859,3.14,7,7,7 c1.57,0,3.015-0.526,4.184-1.402L18.586,20L20,18.586z M6,11c0-2.757,2.243-5,5-5s5,2.243,5,5s-2.243,5-5,5S6,13.757,6,11z"/>
								</g>
							</svg>
						</span>
						<input type="text" name="s" className="search-field" defaultValue="" placeholder="Search"/>
					</label>
				</form>
			</div>
			<nav className="mobile-menu__nav">
				<ul className="menu">
					<li className="menu-item menu-item-has-children">
						<Link to="/">Home</Link>
						
					</li>
					<li className="menu-item menu-item-has-children">
						<a>Men</a>
						<ul className="sub-menu">
							<li className="menu-item menu-item-has-children">
								<a>Ready To Wear</a>
								<ul className="sub-menu">
									<li className="menu-item"><Link to="/men">Tshirts</Link></li>
								</ul>
							</li>
							
						</ul>
					</li>
					<li className="menu-item menu-item-has-children">
						<a >Women</a>
						<ul className="sub-menu">
							<li className="menu-item menu-item-has-children">
								<a >Ready To Wear</a>
								<ul className="sub-menu">
									<li className="menu-item"><Link to="/wommen">Tshirts</Link></li>
								</ul>
							</li>
							
						</ul>
					</li>
				</ul>
			</nav>
			<hr className="mobile-menu__divider divider"/>
			<div className="mobile-menu__cart">
				<a href="other-shop-pages/cart.html">
					<span className="mobile-menu__cart-text">Shopping Cart</span>
					<span className="mobile-menu__cart-icon">
						<span className="svg-icon icon-cart size-normal shopping-cart-icon">
							<svg width="24px" height="24px" viewBox="0 0 24 24">
								<g>
									<rect fill="none" width="24" height="24"/>
									<path d="M19,10h-3V7c0-2.206-1.794-4-4-4S8,4.794,8,7v3H5c-0.55,0-0.908,0.441-0.797,0.979l1.879,9.042
									C6.194,20.559,6.736,21,7.286,21h9.429c0.55,0,1.092-0.441,1.203-0.979l1.879-9.042C19.908,10.441,19.55,10,19,10z M10,7 c0-1.103,0.897-2,2-2s2,0.897,2,2v3h-4V7z M16.087,19H7.913l-1.455-7h11.313L16.087,19z"/>
								</g>
							</svg>
						</span>
						<span className="counter cart-counter">2</span>
					</span>
				</a>
			</div>
			<div className="mobile-menu__wishlist">
				<a href="other-shop-pages/wishlist.html" className="wishlist-contents">
					<span className="mobile-menu__wishlist-text">Wishlist</span>
					<span className="mobile-menu__wishlist-icon">
						<span className="svg-icon icon-heart-o size-normal ">
							<svg width="24px" height="24px" viewBox="0 0 24 24">
								<g>
									<path d="M16.243,5.843c0.801,0,1.555,0.312,2.121,0.879c1.17,1.17,1.17,3.073,0,4.243l-2.121,2.121l-2.121,2.121L12,17.328 l-2.121-2.121l-2.121-2.121l-2.121-2.121c-0.567-0.567-0.879-1.32-0.879-2.121c0-0.801,0.312-1.555,0.879-2.121 c0.567-0.567,1.32-0.879,2.121-0.879c0.801,0,1.555,0.312,2.121,0.879l0.707,0.707L12,8.843l1.414-1.414l0.707-0.707 C14.688,6.155,15.441,5.843,16.243,5.843 M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707 c-0.976-0.976-2.256-1.464-3.536-1.464S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121 L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843 L16.243,3.843z"/>
									<rect fill="none" width="24" height="24"/>
								</g>
							</svg>
						</span>
						<span className="counter wishlist-counter">0</span>
					</span>
				</a>
			</div>
			
			
			<div className="mobile-menu__account-login">
				<Link to="/login">Sign In</Link>
			</div>
			
		</div>
	</div>
    )
}

export default MobileHeader;