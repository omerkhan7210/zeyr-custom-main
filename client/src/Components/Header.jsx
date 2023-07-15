import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/header.css';
import logo from '../assets/logo.png'; // Import the logo file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight,faChevronDown, faShoppingBag, faMagnifyingGlass, faHeart } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <header className={`header-container ${isHomepage ? 'homepage-header' : ''}`}>
      <nav className="navbar">
      <ul className="menu">
          <li className="dropdown mega-menu">
            <Link to="/men">Men <FontAwesomeIcon icon={faChevronDown} /></Link>
            <div className="mega-menu-content">
                <div className="column">
                  <ul className="dropdown-menu">
                    <li className='submenu-link'>
                      <Link to="">Ready to Wear <FontAwesomeIcon icon={faChevronRight} /></Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to="/men/shirts">Shirts</Link>
                        </li>
                        
                      </ul>
                    </li>
                    
                  </ul>
                </div>
              </div>
          </li>
          <li className="dropdown mega-menu">
            <Link to="/women">Women <FontAwesomeIcon icon={faChevronDown} /></Link>
            <div className="mega-menu-content right-aligned">
                <div className="column">
                  <ul className="dropdown-menu">
                    <li className='submenu-link'>
                      <Link to="">Ready to Wear <i className='fa fa-chevron-right'></i></Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to="/women/shirts">T-shirts</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
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
          <FontAwesomeIcon icon={faShoppingBag} />
          </li>
          <li>
            <Link to="/login">MyZF</Link>
            
            
          </li>
          <li>
          <Link to="/signup">MyZFS</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
