import React,{useContext} from 'react';
import { AppContext } from '../Categories/DisplayProducts';

const CartItem = ({ item,removeFromCart2,increaseQuantity2,decreaseQuantity2,hostlink}) => {

  const context = useContext(AppContext); 
  const removeFromCart = context?.removeFromCart || removeFromCart2;
  const increaseQuantity = context?.increaseQuantity || increaseQuantity2;
  const decreaseQuantity = context?.decreaseQuantity || decreaseQuantity2;

  return (
    <div className='sidebar-cart-item'>
      <img className='prod-cart-img' src={`${hostlink}/uploads/`+item.featuredImage} alt={item.name} />

      <div>
        <h3>{item.name}</h3>
        <p>Price: ${item.price}</p>
        <p>Quantity: {item.quantity}</p> {/* Display the quantity */}
        <div className="quantity-input">
          <button onClick={() => increaseQuantity(item.id)}>-</button> {/* Decrease button */}
          <span>{item.quantity}</span> {/* Display the quantity */}
          <button onClick={() => decreaseQuantity(item.id)}>+</button> {/* Increase button */}
        </div>
      </div>

      <button className='form-btn close-btn' onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;
