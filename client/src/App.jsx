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


export const ProductContext = createContext();


const App = () => {
//const hostLink = "https://zeyrserver.noorularfeen.com";
const hostLink = "http://localhost:5000";
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


//ETCHING ALL THE PRODUCTS

const [menProducts, setMenProducts] = useState([]);
const [womenProducts, setWomenProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${hostLink}/products`);
      // Filter products for men
      const menProducts = response.data.filter((product) => product.categories.toLowerCase() === 'men');
      setMenProducts(menProducts);
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
        <Header hostlink={hostLink} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/men" element={<MenPage hostlink={hostLink} menProducts={menProducts}/>} />
          <Route path="/women" element={<WomenPage womenProducts={womenProducts} hostlink={hostLink}/>} />
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
      </>
    </Router>
  );
};

export default App;
