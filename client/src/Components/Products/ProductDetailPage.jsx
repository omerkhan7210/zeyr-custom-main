import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

  console.log(product)

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <img src={`${hostlink}/uploads/${product.featuredImage}`} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Short Description: {product.shortDescription}</p>
      <p>Long Description: {product.longDescription}</p>

      <h3>Variations:</h3>
      {product.variations.map((variation) => (
        <div key={variation.id}>
          

          <h4>Attributes:</h4>
          {variation.attributes.map((attribute) => (
            <div key={attribute.id}>
              <p>Attribute Value: {attribute.attributeValue}</p>
              <p>Price: ${variation.price}</p>
              <p>Stock: {variation.stock}</p>
              <hr />
            </div>
          ))}
        </div>
      ))} 
    </div>
  );
};

export default ProductDetailsPage;
