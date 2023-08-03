
import React, { createContext, useState } from 'react';

export const AddProductAdminContext = createContext();

 const AddProductContext = ({children}) => {

   
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        categories: '',
        sku: '',
        isOnSale: false,
        isFeatured: false,
        featuredImage: null,
        thumbnailImages: [],
        videos: '',
        shortDescription: '',
        longDescription: '',
        attributes: [], // An array to hold product attributes (e.g., size, color, etc.)
          status: "draft", // Status can be either "draft" or "published"
          variations: [], // An array to hold different variations based on the selected attributes
      });
      
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
      
          // Convert variations array to a JSON string
          const variationsJson = JSON.stringify(formData.variations);
      
          // Create the final formData object to send to the server
          const formDataToSend = {
            ...formData,
            variations: variationsJson,
          };
      
          // Convert the thumbnail images array to a FormData object to handle file upload
          const formDataWithFiles = new FormData();
          for (const key in formData) {
            if (key === 'thumbnailImages') {
              for (const thumbnailImage of formData.thumbnailImages) {
                formDataWithFiles.append('thumbnailImages', thumbnailImage);
              }
            } else if (key === 'featuredImage' && formData.featuredImage) {
              formDataWithFiles.append('featuredImage', formData.featuredImage);
            } else {
              formDataWithFiles.append(key, formData[key]);
              
            }
            
          }
      
      
          // Send JSON data separately using 'application/json' content type
          const response = await axios.post(`${hostLink}/products`, formDataToSend, {
            headers: {
              'Content-Type': 'application/json', // Set the correct content type for JSON data
            },
          });
      
          const productId = response.data.productId;
      
          
          await axios.post(`${hostLink}/upload-images${productId}`, formDataWithFiles);
      
          window.location.href = '/dashboard/product-list';
        
      }catch (error) {
        console.error(error);
      }
        
        }
      
      const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`${hostLink}/products/${productId}`, productData);
          console.log('Product updated successfully:', response.data);
          // Redirect or perform any other action after updating the product
        } catch (error) {
          console.error('Error updating product:', error);
        }
      };
          
      // Function to handle file input change and generate preview URLs
      const handleFileChange = (e) => {
        const files = e.target.files;
        if (e.target.name === 'featuredImage') {
          setFormData({ ...formData, featuredImage: files[0] });
        } else if (e.target.name === 'thumbnailImages') {
          setFormData({ ...formData, thumbnailImages: [...files] });
        }
      };
        
      const handleImageRemove = (index) => {
        const newThumbnailImages = formData.thumbnailImages.filter((_, i) => i !== index);
        setFormData({ ...formData, thumbnailImages: newThumbnailImages });
      };
      

  return (
    <AddProductContext.Provider
    value={{formData,handleFileChange,handleImageRemove,handleSubmit,handleSubmitEdit}}>
        {children}
    </AddProductContext.Provider>
  )
}

export default AddProductContext;
