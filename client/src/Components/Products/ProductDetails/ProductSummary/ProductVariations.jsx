import React, { useContext, useState,useEffect } from "react";
import ProductVariationsRow from "./ProductVariationsRow";
import { ProductDetailsContext } from "../ProductDetailPage";
import { CartContextC } from "../../../Context/CartContext";

const ProductVariations = () => {

  const {addToCart,cartItems} = useContext(CartContextC);
  const { product } = useContext(ProductDetailsContext)

  const [selectedVariations, setSelectedVariations] = useState({});
  const [allVariationsSelected, setAllVariationsSelected] = useState(false);
  const [quantity, setQuantity] = useState(1); // Default quantity is set to 1
  const isObjectEmpty = Object.keys(selectedVariations).length === 0;


    // Function to check if both color and size variations are selected
    const checkVariationsSelected = () => {
      return (
        selectedVariations.color !== undefined &&
        selectedVariations.size !== undefined
      );
    };
 // Update allVariationsSelected state whenever selectedVariations change
 useEffect(() => {
  setAllVariationsSelected(checkVariationsSelected());
}, [selectedVariations]);

const getSelectedVariationValues = () => {
  const selectedVariationValues = {};
  product.attributes.forEach((attribute) => {
    const attributeId = attribute.id.toString();
    if (selectedVariations[attribute.attributeType] === attributeId) {
      selectedVariationValues[attribute.attributeType] = attribute.attributeValue;
    }
  });
  return selectedVariationValues;
};
const selectedVariationValues = getSelectedVariationValues();

  const handleAddToCart = (event) => {
    event.preventDefault();
    // Your logic to add the product to the cart goes here
    // You can use the selectedVariation and the quantity from the form to add the product to the cart
    if (checkVariationsSelected()) {
      addToCart(product,selectedVariationValues,quantity);
      console.log("cart items:",cartItems)
      console.log("Product added to cart!");
      console.log("Selected Variation:", selectedVariations);
      console.log("Quantity:", quantity);
    } else {
      // Show an error or a notice to the user to select all variations first
      console.log("Please select all variations before adding to cart.");
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

 
  
  return (
    <>
      {product?.variations ?  (
        <form className="variations_form cart swatches-support" onSubmit={handleAddToCart}>

          {/* Show a notice if not all variations are selected */}
          {!allVariationsSelected && (
            <p style={{ color: "red" }}>Please select all variations before adding to cart.</p>
          )}

          <ProductVariationsRow selectedVariations={selectedVariations} setSelectedVariations={setSelectedVariations} />

          
          {!isObjectEmpty && (
          <div className="single_variation_wrap">
              <h3>Selected Variations:</h3>
              <ul>
                {Object.entries(selectedVariations).map(([attributeType, selectedVariationId]) => {
                  if (!selectedVariationId) return null;
                  const selectedVariation = product.variations.find(
                    (variation) => variation.id === parseInt(selectedVariationId)
                  );
                  return (
                    <li key={selectedVariation.id}>
                      {attributeType.toUpperCase()}: {selectedVariation.attributes[0].attributeValue}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}


            <div className="product-variation-add-to-cart variations_button product-variation-add-to-cart-enabled mt3">
              <div className="quantity">
                <label className="screen-reader-text">Quantity</label>
                <span className="svg-icon icon-minus size-normal qty-button decrease">
                  {/* Decrease quantity button SVG */}
                </span>
                <input type="number" className="input-text qty text" step="1" min="1" max="50" name="quantity" defaultValue="1" title="Qty"  onChange={handleQuantityChange} />
                <span className="svg-icon icon-plus size-normal qty-button increase">
                  {/* Increase quantity button SVG */}
                </span>
              </div>
              <button type="submit" className="single_add_to_cart_button button alt" disabled={!allVariationsSelected}>
                Add to cart
              </button>
            </div>
        </form>
      ) : null}
    </>
  );
};

export default ProductVariations;
