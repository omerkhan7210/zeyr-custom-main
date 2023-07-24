// src/App.js
import React, { useState,useEffect,createContext } from 'react';
import ProductList from '../Products/ProductList';
import Cart from '../Cart/Cart';
import '../../assets/css/products.css';

export const AppContext = createContext();


const DisplayProducts = ({hostlink,products }) => {
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


  return (
    <div className='prod-wrapper'>

      <AppContext.Provider value={{addToCart,removeFromCart,increaseQuantity,decreaseQuantity,handleCloseSidebar,cartItems,sidebarVisible,setSidebarVisible}}>

      <ProductList hostlink={hostlink} products={products} />
      <Cart hostlink={hostlink} />
      </AppContext.Provider>
    </div>
  );
};

export default DisplayProducts;
