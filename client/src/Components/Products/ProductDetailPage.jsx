import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductSummary from './ProductDetails/ProductSummary';
import SizeGuide from "./SizeGuide"
import RelatedProducts from "./RelatedProducts"
import ProductAdditionalInfo from "./ProductAddititonalInfo"
import ProductImages from "./ProductDetails/ProductImages"

export const ProductDetailsContext = createContext();

const ProductDetailsPage = ({ hostlink }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    // Fetch product details for the specific productId
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${hostlink}/products/${productId}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [hostlink, productId]);


  if (!product) {
    return <div>Loading...</div>;
  }

  return (

    <div id="content" className="site-content">
			<div className="site-content-container product-content-container konte-container">
				<div id="primary" className="content-area">
					<main id="main" className="site-main">

          <ProductDetailsContext.Provider value={{ product, hostlink }}>

						<div className="layout-v2 clearfix background-set product first instock has-post-thumbnail">

							
							<ProductImages />

							<ProductSummary/>

							<SizeGuide/>
						</div>

            <ProductAdditionalInfo />

            </ProductDetailsContext.Provider>

						{/* <RelatedProducts /> */}
					</main>
				</div>
			</div>
		</div>
    
  );
};

export default ProductDetailsPage;
