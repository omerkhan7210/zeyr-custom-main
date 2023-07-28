import React,{createContext,useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/HeaderFooter/Header';
import HomePage from './Components/Static/HomePage';
import AboutPage from './Components/Static/AboutPage';
import MenPage from './Components/Categories/MenPage';
import WomenPage from './Components/Categories/WomenPage';
import ContactPage from './Components/Static/ContactPage';
import LoginForm from './Components/User/LoginSignup/LoginForm';
import SignupForm from './Components/User/LoginSignup/SignupForm';
import ForgotPassword from './Components/User/LoginSignup/ForgotPassword';
import ResetPassword from './Components/User/LoginSignup/ResetPassword';
import MyAccount from './Components/User/UserAccount/MyAccount';
import ViewAddress from './Components/User/UserAccount/ViewAddress';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminRegister from './Components/Admin/AdminRegister';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AddProduct from './Components/Admin/ProductOperations/AddProduct';
import EditProduct from './Components/Admin/ProductOperations/EditProduct';
import ProductList from './Components/Admin/ProductOperations/ProductList';
import Categories from './Components/Admin/ProductOperations/Categories';
import axios from 'axios';
import ProductDetailsPage from './Components/Products/ProductDetailPage';
import Footer from './Components/HeaderFooter/Footer';
import MobileHeader from './Components/HeaderFooter/MobileHeader';
import SearchModal from './Components/HeaderFooter/SearchModal';
import CartSidebar from './Components/Cart/CartSidebar';
import LoginSidebar from "./Components/User/LoginSignup/LoginSidebar"



export const ProductContext = createContext();
export const CartContext = createContext();

const App = () => {
const hostLink = "https://zeyrserver.noorularfeen.com";
//const hostLink = "http://localhost:5000";
const path = "/dashboard";
   
const [formData, setFormData] = useState({
  name: '',
  price: '',
  categories: '',
  sku: '',
  isOnSale: false,
  isFeatured: false,
  featuredImage: null,
  thumbnailImages: [],
  videos: '',
  shortDescription: '',
  longDescription: '',
  attributes: [], // An array to hold product attributes (e.g., size, color, etc.)
    status: "draft", // Status can be either "draft" or "published"
    variations: [], // An array to hold different variations based on the selected attributes
});

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    // Convert variations array to a JSON string
    const variationsJson = JSON.stringify(formData.variations);

    // Create the final formData object to send to the server
    const formDataToSend = {
      ...formData,
      variations: variationsJson,
    };

    // Convert the thumbnail images array to a FormData object to handle file upload
    const formDataWithFiles = new FormData();
    for (const key in formData) {
      if (key === 'thumbnailImages') {
        for (const thumbnailImage of formData.thumbnailImages) {
          formDataWithFiles.append('thumbnailImages', thumbnailImage);
        }
      } else if (key === 'featuredImage' && formData.featuredImage) {
        formDataWithFiles.append('featuredImage', formData.featuredImage);
      } else {
        formDataWithFiles.append(key, formData[key]);
        
      }
      
    }


    // Send JSON data separately using 'application/json' content type
    const response = await axios.post(`${hostLink}/products`, formDataToSend, {
      headers: {
        'Content-Type': 'application/json', // Set the correct content type for JSON data
      },
    });

    const productId = response.data.productId;

    
    await axios.post(`${hostLink}/upload-images${productId}`, formDataWithFiles);

    window.location.href = '/dashboard/product-list';
  
}catch (error) {
  console.error(error);
}
  
  }

const handleSubmitEdit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.put(`${hostLink}/products/${productId}`, productData);
    console.log('Product updated successfully:', response.data);
    // Redirect or perform any other action after updating the product
  } catch (error) {
    console.error('Error updating product:', error);
  }
};


    
// Function to handle file input change and generate preview URLs
const handleFileChange = (e) => {
  const files = e.target.files;
  if (e.target.name === 'featuredImage') {
    setFormData({ ...formData, featuredImage: files[0] });
  } else if (e.target.name === 'thumbnailImages') {
    setFormData({ ...formData, thumbnailImages: [...files] });
  }
};
  
const handleImageRemove = (index) => {
  const newThumbnailImages = formData.thumbnailImages.filter((_, i) => i !== index);
  setFormData({ ...formData, thumbnailImages: newThumbnailImages });
};


//DISPLAY CART ITEMS
const initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const [cartItems, setCartItems] = useState(initialCartItems);
const [sidebarVisible, setSidebarVisible] = useState(false);

const addToCart = (product) => {
const existingItem = cartItems.find((item) => item.id === product.id);

if (existingItem) {
  // If the item already exists in the cart, update its quantity
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
} else {
  // If the item doesn't exist, add it to the cart with quantity 1
  setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
}

setSidebarVisible(true); // Show the sidebar when an item is added to the cart
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


const handleCloseSidebar = () => {
  setSidebarVisible(false);
};

useEffect(() => {
  // Save cart items to localStorage whenever they change
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);


//HEADER CART ICON
const [cartItemsCount, setCartItemsCount] = useState(0);
    const [showCartSidebar, setShowCartSidebar] = useState(false);

    useEffect(() => {
      // Load cart items from localStorage on component mount
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItemsCount(storedCartItems.length);
    }, []);

    // In your CartContext or App.js
const toggleCartSidebar = () => {
  setShowCartSidebar((prevState) => !prevState);
};



//ETCHING ALL THE PRODUCTS

const [menProducts, setMenProducts] = useState([]);
const [womenProducts, setWomenProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${hostLink}/products`);
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

      <CartContext.Provider value={{addToCart,removeFromCart,increaseQuantity,decreaseQuantity,handleCloseSidebar,cartItems,sidebarVisible,setSidebarVisible, cartItemsCount,showCartSidebar,toggleCartSidebar}}>
        <Header hostlink={hostLink} />
        </CartContext.Provider>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/men" element={ 
          <CartContext.Provider value={{addToCart,removeFromCart,increaseQuantity,decreaseQuantity,handleCloseSidebar,cartItems,sidebarVisible,setSidebarVisible,hostLink}}>
            <MenPage  menProducts={menProducts} hostlink={hostLink}/>
            </CartContext.Provider>
          } />

          <Route path="/women" element={
          <CartContext.Provider value={{addToCart,removeFromCart,increaseQuantity,decreaseQuantity,handleCloseSidebar,cartItems,sidebarVisible,setSidebarVisible,hostLink}}>
          <WomenPage womenProducts={womenProducts} hostlink={hostLink}/>
          </CartContext.Provider>
          } />

          <Route path="/contact" element={<ContactPage />} />

          <Route path={`/products/:productId`} element={<ProductDetailsPage hostlink={hostLink}/>} />

          <Route exact path="/login" element={<LoginForm hostlink = {hostLink}/>} />
          <Route exact path="/forgot-password" element={<ForgotPassword hostlink = {hostLink}/>} />
          <Route exact path="/reset-password" element={<ResetPassword hostlink = {hostLink}/>} />
          <Route exact path="/my-account" element={<MyAccount hostlink = {hostLink}/>} />
          <Route exact path="/signup" element={<SignupForm hostlink = {hostLink}/>} />
          <Route exact path="/view-addresses" element={<ViewAddress hostlink = {hostLink}/>} />

          
          <Route exact path="/admin" element={<AdminLogin hostlink = {hostLink}/>} />
          <Route exact path="/admin-register" element={<AdminRegister hostlink = {hostLink}/>} />
          <Route exact path="/dashboard" element={<AdminDashboard hostlink = {hostLink}/>} />

          <Route 
          path={`${path}/add-product`} 
          element={
            <ProductContext.Provider value={{handleSubmit,handleFileChange,handleImageRemove,formData,setFormData}}>
              <AddProduct/>
            </ProductContext.Provider>
          } />

          
          {/* Add Route for editing a product */}
          <Route 
          path={`${path}/edit-product/:productId`} 
          element={
            <ProductContext.Provider value={{handleSubmitEdit,handleFileChange,handleImageRemove,formData,setFormData}}>
              <EditProduct hostLink={hostLink}/>
            </ProductContext.Provider>
                    } />

          {/* Add Route for displaying all products with edit and delete buttons */}
          <Route path={`${path}/product-list`} element={<ProductList hostlink={hostLink} />} />

          {/* Add Route for categories */}
          <Route path={`${path}/categories`} element={<Categories hostlink={hostLink} />} />


         

        </Routes>
        <Footer/>
        <LoginSidebar hostlink={hostLink}/>
        <SearchModal/>
        <CartContext.Provider value={{addToCart,removeFromCart,increaseQuantity,decreaseQuantity,handleCloseSidebar,cartItems,sidebarVisible,setSidebarVisible, cartItemsCount,showCartSidebar,toggleCartSidebar}}>
        <CartSidebar hostlink={hostLink} />
        </CartContext.Provider>
        <MobileHeader/>
						
      </>
    </Router>
  );
};

export default App;
