import {React,useState,useEffect, useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode'; // Import jwt-decode library
import { CartContext } from '../../App';


const Header = ({hostlink}) => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1]; // Extract the token from the cookie
    const adminToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('adminToken='))
    ?.split('=')[1]; // Extract the token from the cookie
    const {cartItemsCount} = useContext(CartContext);

    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const [isAdminTokenExpired, setIsAdminTokenExpired] = useState(false);
    
  
    useEffect(() => {
      if (token) {
        // Token is present, check if it's expired or not
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token is expired
          setIsTokenExpired(true);
        } else {
          // Token is still valid
          setIsTokenExpired(false);
        }
      } else {
        // Token is not present, set isTokenExpired to true
        setIsTokenExpired(true);
      }
      
      if (adminToken) {
        // Admin token is present, check if it's expired or not
        const decodedToken = jwtDecode(adminToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Admin token is expired
          setIsAdminTokenExpired(true);
        } else {
          console.log("true")
          // Admin token is still valid
          setIsAdminTokenExpired(false);
        }
      } else {
        // Admin token is not present, set isAdminTokenExpired to true
        setIsAdminTokenExpired(true);
      }
    },[token]);


  return (
    
		<header id="masthead" className={`site-header light  header-v1 transparent-hover ${isHomepage ? 'text-light' : 'text-dark'}`}>
			<div className="header-main header-contents has-center logo-center menu-center">
				<div className=" d-grid grid-3 pi4 p1">
					
					
						<nav id="primary-menu" className="main-navigation primary-navigation">
							<ul className="menu nav-menu">
								
									<li className="menu-item menu-item-has-children">
										<Link >
									Men <FontAwesomeIcon icon={faChevronDown} />
									</Link>
									<ul className="sub-menu">
										<li className="menu-item menu-item-has-children">
											<Link>Ready To Wear <FontAwesomeIcon icon={faChevronRight} /></Link>
											<ul className="sub-menu">
												<li className="menu-item"> 
												<Link to="/men">
												Tshirts 
												</Link></li>
												
											</ul>
										</li>
										
									</ul>
								</li>
									<li className="menu-item menu-item-has-children">
									<Link >
									Women <FontAwesomeIcon icon={faChevronDown} />
									</Link>
									<ul className="sub-menu">
										<li className="menu-item menu-item-has-children">
											<Link>Ready To Wear <FontAwesomeIcon icon={faChevronRight} /></Link>
											<ul className="sub-menu">
												<li className="menu-item"> 
												<Link to="/women">
              									Tshirts
           										</Link></li>
												
											</ul>
										</li>
										
									</ul>
								</li>
							</ul>
						</nav>
						
					<div className="header-center-items header-items has-menu">
						<div className="site-branding">
							<Link to="/" className="logo">
								<img src="/images/logo.svg" alt="Konte" className="logo-dark"/>
								<img src="/images/logo-light.svg" alt="Konte" className="logo-light"/>
							</Link>
							<p className="site-title"><a href="#" rel="home">Zeyr Fineri</a></p>
						</div>
						
					</div>
					<div class="header-right-items header-items ">
						<div class="header-account">
							<a href="#" data-toggle="off-canvas" data-target="login-panel">Sign in</a>
						</div>
						<div class="header-search icon-modal">
							<span class="svg-icon icon-search search-icon" data-toggle="modal" data-target="search-modal">
								<svg  width="24px" height="24px" viewBox="0 0 24 24">
									<g>
										<rect fill="none" width="24" height="24"/>
										<path d="M20,18.586l-3.402-3.402C17.474,14.015,18,12.57,18,11c0-3.86-3.141-7-7-7c-3.86,0-7,3.14-7,7c0,3.859,3.14,7,7,7 c1.57,0,3.015-0.526,4.184-1.402L18.586,20L20,18.586z M6,11c0-2.757,2.243-5,5-5s5,2.243,5,5s-2.243,5-5,5S6,13.757,6,11z"/>
									</g>
								</svg>
							</span>
						</div>
						<div class="header-wishlist">
							<a href="../other-shop-pages/wishlist.html" class="wishlist-contents">
								<span class="svg-icon icon-heart-o size-normal ">
									<svg width="24px" height="24px" viewBox="0 0 24 24">
										<g>
											<path d="M16.243,5.843c0.801,0,1.555,0.312,2.121,0.879c1.17,1.17,1.17,3.073,0,4.243l-2.121,2.121l-2.121,2.121L12,17.328 l-2.121-2.121l-2.121-2.121l-2.121-2.121c-0.567-0.567-0.879-1.32-0.879-2.121c0-0.801,0.312-1.555,0.879-2.121 c0.567-0.567,1.32-0.879,2.121-0.879c0.801,0,1.555,0.312,2.121,0.879l0.707,0.707L12,8.843l1.414-1.414l0.707-0.707 C14.688,6.155,15.441,5.843,16.243,5.843 M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707 c-0.976-0.976-2.256-1.464-3.536-1.464S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121 L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843 L16.243,3.843z"/>
											<rect fill="none" width="24" height="24"/>
										</g>
									</svg>
								</span>
								<span class="counter wishlist-counter">1</span>
							</a>
						</div>
						<div class="header-cart">
							<a href="#" data-toggle="off-canvas" data-target="cart-panel">
								<span class="svg-icon icon-cart size-normal shopping-cart-icon">
									<svg width="24px" height="24px" viewBox="0 0 24 24">
										<g>
											<rect fill="none" width="24" height="24"/>
											<path d="M19,10h-3V7c0-2.206-1.794-4-4-4S8,4.794,8,7v3H5c-0.55,0-0.908,0.441-0.797,0.979l1.879,9.042
											C6.194,20.559,6.736,21,7.286,21h9.429c0.55,0,1.092-0.441,1.203-0.979l1.879-9.042C19.908,10.441,19.55,10,19,10z M10,7 c0-1.103,0.897-2,2-2s2,0.897,2,2v3h-4V7z M16.087,19H7.913l-1.455-7h11.313L16.087,19z"/>
										</g>
									</svg>
								</span>
								<span class="counter cart-counter">{cartItemsCount}</span>
							</a>
						</div>
					</div>
				</div>
			  </div>
        

      {!isAdminTokenExpired ? (
        <div className='position-a dashboard-btn-home'>
              <Link to="/dashboard">Admin Dashboard</Link>
        </div>
      ) : null}
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
						<Link to="/"  className="logo">
							<img src="/images/logo.svg" alt="Konte" className="logo-dark"/>
							<img src="/images/logo-light.svg" alt="Konte" class="logo-light"/>
						</Link>
						<p className="site-title">
							<Link to="/" rel="home">ZeyrFineri</Link>
							</p>
					</div>
					<div className="mobile-header-icons">
						<div className="header-cart">
							<a href="#" data-toggle="off-canvas" data-target="cart-panel">
								<span className="svg-icon icon-cart size-normal shopping-cart-icon">
									<svg width="24px" height="24px" viewBox="0 0 24 24">
										<g>
											<rect fill="none" width="24" height="24"></rect>
											<path d="M19,10h-3V7c0-2.206-1.794-4-4-4S8,4.794,8,7v3H5c-0.55,0-0.908,0.441-0.797,0.979l1.879,9.042
											C6.194,20.559,6.736,21,7.286,21h9.429c0.55,0,1.092-0.441,1.203-0.979l1.879-9.042C19.908,10.441,19.55,10,19,10z M10,7 c0-1.103,0.897-2,2-2s2,0.897,2,2v3h-4V7z M16.087,19H7.913l-1.455-7h11.313L16.087,19z"></path>
										</g>
									</svg>
								</span>
								<span className="counter cart-counter">2</span>
							</a>
						</div>
					</div>
				</div>
			</div>
    </header>

  );
};

export default Header;
