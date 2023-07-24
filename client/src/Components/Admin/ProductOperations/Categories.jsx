import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // Fetch all categories
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${hostlink}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${hostlink}/categories`, {
        name: newCategory,
      });
      console.log('Category added successfully:', response.data);
      // Clear the input field and update the categories list
      setNewCategory('');
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // Function to render hierarchical categories
  const renderCategories = (categories, parentCategoryId = null) => (
    <ul>
      {categories
        .filter((category) => category.parentId === parentCategoryId)
        .map((category) => (
          <li key={category._id}>
            {category.name}
            {renderCategories(categories, category._id)}
          </li>
        ))}
    </ul>
  );

  return (
    <div className='signup-container'>
      <h3  className='signup-heading'>Categories</h3>
      <form onSubmit={handleSubmit}  className='signup-form'>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter a new category"
          required
        />
        <button type="submit"  className='form-btn'>Add Category</button>
      </form>

      {renderCategories(categories)}
    </div>
  );
};

export default Categories;
