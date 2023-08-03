import React, { useContext } from "react";
import SingleProductImage from "./SingleProductImage";
import { ProductDetailsContext } from "../ProductDetailPage";

const ProductImages = () => {

  const {product,hostlink} = useContext(ProductDetailsContext);

  const mobileImageCheck = ()=>{
    if(window.innerWidth <= 768) return true;
    return false;
  }

  const productImagesArray = JSON.parse(product.productImages);
  const prodName = product.name;

  return (
    <div className={!mobileImageCheck ? "product-gallery product-gallery--mobile hidden-lg hidden-md" : "product-gallery product-gallery--with-images product-gallery--columns-4 images lightbox-support hidden-sm hidden-xs"} data-columns="4">
      <figure className="product-gallery__wrapper">
        <div className="product-gallery__image">
          {productImagesArray && productImagesArray.length > 0 ? (
            productImagesArray.map((productImg, index) => ( // Added "index" to the map function
              <SingleProductImage key={index} productImg={productImg} prodName={prodName} hostlink={hostlink}/> // Added "key" prop to SingleProductImage
            ))
          ) : (
            <p>No Image</p>
          )}
        </div>
      </figure>
    </div>
  );
};

export default ProductImages;
