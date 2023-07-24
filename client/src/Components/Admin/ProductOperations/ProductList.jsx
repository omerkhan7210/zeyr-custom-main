import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = ({ hostlink }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products from the server
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${hostlink}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle deletion of a product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${hostlink}/products/${productId}`);
      // Fetch updated product list from the server after deletion
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className='signup-container table-container'>
      {/* List of Products */}
      <h3 className='signup-heading'>Products</h3>
      <Link to='/dashboard'>Return to dashboard</Link>
      <table className='product-table'>
        <thead>
          <tr>
            <th>Product Featured Image</th>
            <th>Product Title</th>
            <th>Product Price</th>
            <th>Product Short Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={`${hostlink}/uploads/${product.featuredImage}`} alt="" className='thumbnail-img w25' />
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.shortDescription}</td>
              <td>
                 {/* Edit Button: Redirect to the edit product route */}
                 <Link to={`/dashboard/edit-product/${product.id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        
    </div>
  );
};

export default ProductList;
