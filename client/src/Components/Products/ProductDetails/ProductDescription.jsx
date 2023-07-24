import React from 'react';

const ProductDescription = ({ product }) => {
  const { name, price, description } = product;

  return (
    <div className="product-description">
      <h1>{name}</h1>
      <p>Price: ${price}</p>
      <p>{description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ProductDescription;
