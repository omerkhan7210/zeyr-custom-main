import React,{createContext,useState,useEffect} from 'react'

export const CartContextC = createContext();

const CartContext = ({children}) => {
    
//DISPLAY CART ITEMS
const initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const [cartItems, setCartItems] = useState(initialCartItems);

//HEADER CART ICON
const [cartItemsCount, setCartItemsCount] = useState(initialCartItems.length);

// ADD TO CART
const addToCart = (product, selectedVariations, quantity) => {
  if (!quantity || quantity < 1) {
    quantity = 1; // Set the default quantity to 1 if not provided or invalid
  }

  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    // If the item already exists in the cart, update its quantity
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity,selectedVariations } : item
      )
    );
  } else {
    // If the item doesn't exist, add it to the cart with the specified quantity and selectedVariations
    setCartItems((prevItems) => [
      ...prevItems,
      { ...product, quantity, selectedVariations }
    ]);
  }
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


useEffect(() => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
      setCartItemsCount(cartItems.length);
    }, [cartItems,cartItemsCount]);

 

  return (
    <CartContextC.Provider value={{cartItems,cartItemsCount,addToCart,removeFromCart,increaseQuantity,decreaseQuantity}}>
        {children}    
    </CartContextC.Provider>
  )
}

export default CartContext;