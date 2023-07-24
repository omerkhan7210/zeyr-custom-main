import {React,useState,useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/css/header.css';
import logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown, faShoppingBag, faMagnifyingGlass, faHeart } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode'; // Import jwt-decode library
import CartSidebar from '../Cart/CartSidebar';


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

    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const [isAdminTokenExpired, setIsAdminTokenExpired] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [showCartSidebar, setShowCartSidebar] = useState(false);
  
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
      
      // Load cart items from localStorage on component mount
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(storedCartItems);
      setCartItemsCount(storedCartItems.length);
    }, [token]);

    // Toggle cart sidebar visibility
    const toggleCartSidebar = () => {
      setShowCartSidebar(true);
    };

    const handleCloseSidebar = () => {
      setShowCartSidebar(false);
    };

    
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      )
    );
  };


  return (
    <header className={`header-container ${isHomepage ? 'homepage-header' : ''}`}>
      <nav className="navbar">
        <ul className="menu">
          <li className="dropdown mega-menu">
            <Link to="/men">
              Men <FontAwesomeIcon icon={faChevronDown} />
            </Link>
            {/* Rest of the code */}
          </li>
          <li className="dropdown mega-menu">
            <Link to="/women">
              Women <FontAwesomeIcon icon={faChevronDown} />
            </Link>
            {/* Rest of the code */}
          </li>
        </ul>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
        </div>
        <ul className="menu">
          <li>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </li>
          <li>
            <FontAwesomeIcon icon={faHeart} />
          </li>
          <li>
            <FontAwesomeIcon icon={faShoppingBag} onClick={toggleCartSidebar} />
            {cartItemsCount > 0 && <span className="cart-item-count">{cartItemsCount}</span>}
           
              {showCartSidebar && <CartSidebar hostlink={hostlink} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}  handleCloseSidebar={handleCloseSidebar} cartItems={cartItems} sidebarVisible={showCartSidebar}/>}
           
          </li>
          
          <li>
          {!isTokenExpired ? (
              <Link to="/my-account">MyZF</Link>
            ) : (
              <Link to="/login">MyZF</Link>
            )}
          </li>
        </ul>
      </nav>

      {!isAdminTokenExpired ? (
        <div className='position-a dashboard-btn-home'>
              <Link to="/dashboard">Admin Dashboard</Link>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
