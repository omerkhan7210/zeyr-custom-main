import React, { useContext, useState } from "react";
import { ProductDetailsContext } from "../ProductDetailPage";
import ProductVariationsRow from "./ProductVariationsRow";

const ProductVariations = ({setPrice}) => {
  const { product } = useContext(ProductDetailsContext);

  const [selectedVariations, setSelectedVariations] = useState({});

  // Function to get the selected variation based on selectedVariations state
  const getSelectedVariation = () => {
    const selectedVariationIds = Object.values(selectedVariations);

    return product.variations.find((variation) =>
      selectedVariationIds.every((selectedId) => variation.id === parseInt(selectedId))
    );
  };

  const selectedVariation = getSelectedVariation();
  // Update the price when the selected variation changes
  if (selectedVariation) {
    setPrice(selectedVariation.price);
  }
  return (
    <>
      {product?.variations ?  (
        <form className="variations_form cart swatches-support" action="#" method="post">
          <ProductVariationsRow setSelectedVariations={setSelectedVariations} />

          <div className="single_variation_wrap">
            <div>
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


            <div className="product-variation-add-to-cart variations_button product-variation-add-to-cart-enabled">
              <div className="quantity">
                <label className="screen-reader-text">Quantity</label>
                <span className="svg-icon icon-minus size-normal qty-button decrease">
                  {/* Decrease quantity button SVG */}
                </span>
                <input type="number" className="input-text qty text" step="1" min="1" max="50" name="quantity" defaultValue="1" title="Qty" />
                <span className="svg-icon icon-plus size-normal qty-button increase">
                  {/* Increase quantity button SVG */}
                </span>
              </div>
              <button type="submit" className="single_add_to_cart_button button alt">
                Add to cart
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
};

export default ProductVariations;
