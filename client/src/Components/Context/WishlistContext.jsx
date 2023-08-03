import React,{useState,useEffect,createContext} from 'react';

export const WishlistContextC = createContext();

 const WishlistContext = ({children}) => {

    const initialWishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const [wishlist, setWishlist] = useState(() => initialWishlistItems);
    const [wishlistItemsCount, setWishlistItemsCount] = useState(
      initialWishlistItems.length
    );
    
    const addToWishlist = (product) => {
      setWishlist((prevWishlist) => [...prevWishlist, product]);
    };
    
    const removeFromWishlist = (productId) => {
      setWishlist((prevWishlist) =>
        prevWishlist.filter((product) => product.id !== productId)
      );
    };
    
    useEffect(() => {
      // Save cart items to localStorage whenever they change
      
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setWishlistItemsCount(wishlist.length);
    }, [ wishlist,wishlistItemsCount]);
    

  return (
    <WishlistContextC.Provider value={{wishlist,wishlistItemsCount,addToWishlist,removeFromWishlist}}>
        {children}
    </WishlistContextC.Provider>
  )
}

export default WishlistContext;
