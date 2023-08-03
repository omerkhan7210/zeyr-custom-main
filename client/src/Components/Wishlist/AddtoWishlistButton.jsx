import {React,useContext} from "react";
import { WishlistContextC } from "../Context/WishlistContext";
import { Link } from "react-router-dom";

const AddtoWishlistButton = ({ product }) => {
	const { addToWishlist, wishlist } = useContext(WishlistContextC);
  
	const isAddedToWishlist = wishlist.some((item) => item.id === product.id);
  
	const handleClick = () => {
	  if (!isAddedToWishlist) {
		addToWishlist(product);
	  }
	};
  

    return (
        <Link  className={`button add-to-wishlist-button ${
			isAddedToWishlist ? 'added' : ''
		  }`}
		  rel="nofollow"
		  onClick={handleClick}>
									<span className="add-to-wishlist add">
										<span className="svg-icon icon-heart-o size-normal ">
										<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/></svg>
										</span>
										<span className="screen-reader-text button-text">Add to wishlist</span>
									</span>
									<span className="adding-to-wishlist adding">
										<span className="spinner"></span>
										<span className="screen-reader-text button-text">Adding to wishlist</span>
									</span>
									<span className="brow-wishlist added">
										<span className="svg-icon icon-heart size-normal ">
										<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/></svg>
										</span>
										<span className="screen-reader-text button-text">Added to wishlist</span>
									</span>
								</Link>

    )
}

export default AddtoWishlistButton;