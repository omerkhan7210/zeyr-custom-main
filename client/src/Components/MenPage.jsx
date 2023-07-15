// ProductsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MenPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products data from an API endpoint
    axios.get('https://api.example.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <span>{product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenPage;
