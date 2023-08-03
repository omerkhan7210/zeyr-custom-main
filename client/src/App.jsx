import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//GLOBAL ELEMENTS
import Header from './Components/HeaderFooter/Header';
import Footer from './Components/HeaderFooter/Footer';
import MobileHeader from './Components/HeaderFooter/MobileHeader';
import SearchModal from './Components/HeaderFooter/Search/SearchModal';
import CartSidebar from './Components/Cart/CartSidebar';
import LoginSidebar from "./Components/User/LoginSignup/LoginComponents/LoginSidebar"
//STATIC PAGES
import HomePage from './Components/Static/HomePage';
import AboutPage from './Components/Static/AboutPage';
import ContactPage from './Components/Static/ContactPage';
//USER LOGIN SIGNUP
import LoginPage from './Components/User/LoginSignup/LoginComponents/LoginPage';
import SignupForm from './Components/User/LoginSignup/SignupForm';
import ForgotPassword from './Components/User/LoginSignup/ForgotPassword';
import ResetPassword from './Components/User/LoginSignup/ResetPassword';
import MyAccount from './Components/User/UserAccount/MyAccount';
import ViewAddress from './Components/User/UserAccount/Addresses/ViewAddress';
// ADMIN PAGES
import AdminLogin from './Components/Admin/AdminLogin';
import AdminRegister from './Components/Admin/AdminRegister';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AddProduct from './Components/Admin/ProductOperations/AddProduct';
import EditProduct from './Components/Admin/ProductOperations/EditProduct';
import ProductList from './Components/Admin/ProductOperations/ProductList';
import Categories from './Components/Admin/ProductOperations/Categories';
//PRODUCT DETAILS
import ProductDetailsPage from './Components/Products/ProductDetails/ProductDetailPage';
import MenPage from './Components/Categories/MenPage';
import WomenPage from './Components/Categories/WomenPage';
//CART WISHLIST CHECKOUT PAGES
import WishlistPage from "./Components/Wishlist/WishlistPage"
import CartPage from './Components/Cart/CartPage/CartPage';
import CheckoutPage from "./Components/Checkout/CheckoutPage"
//CONTEXT IMPORT 
import AddProductContext from "./Components/Context/AddProductContext";
import CartContext from "./Components/Context/CartContext";
import WishlistContext from "./Components/Context/WishlistContext";
import TokenContext from './Components/Context/TokenContext';
import LoginContext from './Components/Context/LoginContext';
import LocationInfo from './Components/Context/LocationInfo'
import UserDetails from './Components/Context/UserDetails'
//AXIOS PCKG
import axios from 'axios';

const App = () => {


//const hostLink = "https://zeyrserver.noorularfeen.com";
const hostLink = "http://localhost:5000";
const path = "/dashboard";


//ETCHING ALL THE PRODUCTS

const [menProducts, setMenProducts] = useState([]);
const [womenProducts, setWomenProducts] = useState([]);
const [products,setProducts] = useState();

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${hostLink}/products`);
      setProducts(response.data);
      // Filter products for men
      const menProducts = response.data.filter((product) => product.categories.toLowerCase() === 'men');
      setMenProducts(menProducts)
      // Filter products for women
      const womenProducts = response.data.filter((product) => product.categories.toLowerCase() === 'women');
      setWomenProducts(womenProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  fetchProducts();
}, [hostLink]);



  return (
    <Router>
      <> 


    <WishlistContext>
      <CartContext>
      <TokenContext>
          <Header hostlink={hostLink} />
      </TokenContext>
      </CartContext>
    </WishlistContext>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/men" element={ 
          <WishlistContext>
            <CartContext>
              <MenPage  
                menProducts={menProducts} 
                hostlink={hostLink}
              />
              </CartContext>
          </WishlistContext>
          } />

          <Route path="/women" element={
          <WishlistContext>
            <CartContext>
                <WomenPage 
                  womenProducts={womenProducts} 
                  hostlink={hostLink}
                />

            </CartContext>
          </WishlistContext>
          } />

          <Route path="/wishlist" element={
          <WishlistContext >
            
              <WishlistPage hostLink={hostLink}/>
           
          </WishlistContext>
          } />
          

          <Route path="/contact" element={<ContactPage />} />

          
          <Route path={`/products/:productId`} element={
            <CartContext>
              <ProductDetailsPage hostlink={hostLink}/>
            </CartContext>
          } />
          
          
            <Route  path="/login" element={
              <LoginContext hostlink={hostLink}>
              <TokenContext>
                <LoginPage hostlink = {hostLink}/>
                </TokenContext>
                </LoginContext>
            } />
          

          <Route  path="/forgot-password" element={<ForgotPassword hostlink = {hostLink}/>} />
          <Route  path="/reset-password" element={<ResetPassword hostlink = {hostLink}/>} />
          <Route  path="/my-zf" element={
            <TokenContext>
            <UserDetails hostlink={hostLink}>
              <LocationInfo>
                
                  <MyAccount hostlink = {hostLink}/>
                
              </LocationInfo>
            </UserDetails>
            </TokenContext>
          } />
          <Route  path="/signup" element={<SignupForm hostlink = {hostLink}/>} />
          <Route  path="/view-addresses" element={
              <TokenContext>
                <UserDetails hostlink={hostLink}>
                  <ViewAddress hostlink = {hostLink}/>
                </UserDetails>
              </TokenContext>
          } />

          
          <Route exact path="/admin" element={<AdminLogin hostlink = {hostLink}/>} />
          <Route exact path="/admin-register" element={<AdminRegister hostlink = {hostLink}/>} />
          <Route exact path="/dashboard" element={<AdminDashboard hostlink = {hostLink}/>} />

          <Route 
          path={`${path}/add-product`} 
          element={
            <AddProductContext>
              <AddProduct/>

            </AddProductContext>
          } />

          
          {/* Add Route for editing a product */}
          <Route 
          path={`${path}/edit-product/:productId`} 
          element={
            <AddProductContext>
              <EditProduct hostLink={hostLink}/>
              
              </AddProductContext>
                    } />

          {/* Add Route for displaying all products with edit and delete buttons */}
          <Route path={`${path}/product-list`} element={<ProductList hostlink={hostLink} />} />

          {/* Add Route for categories */}
          <Route path={`${path}/categories`} element={<Categories hostlink={hostLink} />} />

          {/* CART & CHECKOUT PAGE */}
          <Route path="/cart" element={
           <CartContext>
            
                <CartPage  hostLink={hostLink}/>

            </CartContext>
          }/>
          <Route path="/checkout" element={<CheckoutPage hostlink={hostLink} />} />

        </Routes>
        <Footer/>
        <LoginContext hostlink={hostLink}>
        <LoginSidebar hostlink={hostLink}/>
        </LoginContext>
        
        <SearchModal  products={products} hostlink={hostLink} />
        
        <CartContext>

        <CartSidebar hostlink={hostLink} />

        </CartContext>

        <MobileHeader/>
						
      </>
    </Router>
  );
};

export default App;
