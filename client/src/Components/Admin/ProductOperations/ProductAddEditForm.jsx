import React,{useContext} from "react";
import { ProductContext } from "../../../App";
import ProductVariationsAttributes from "./ProductVariationsAttributes";

const ProductAddEditForm = ({handleSubmit,fetchProductDetails})=>{


    const {handleFileChange,handleImageRemove,setFormData,formData,variation,variationFormData,handleAddVariation,handleAttributeChange} = useContext(ProductContext)

    return (
        <form onSubmit={handleSubmit} className='signup-form product-add-form-container' encType='multipart/form-data'>
        <div className='d-flex label-container w100 justify-end g1'>
            <label className="form-control">
              <input
                type='checkbox'
                checked={formData.isOnSale}
                onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
              />
              On Sale
            </label>
            <label className="form-control">
              <input
                type='checkbox'
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              />
              Featured
            </label>
    
        <h3>Status</h3>
        <label>
          <input
            type="radio"
            value="draft"
            checked={formData.status === "draft"}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />
          Draft
        </label>
        <label>
          <input
            type="radio"
            value="published"
            checked={formData.status === "published"}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />
          Published
        </label>
      </div>
  
        <input
            type='text'
            placeholder='Product Name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type='number'
            placeholder='Price'
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
           <textarea
            placeholder='Short Description'
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          />
          <textarea
            placeholder='Long Description'
            value={formData.longDescription}
            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
          />
          
          <input
            type='text'
            placeholder='Categories'
            value={formData.categories}
            onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
          />
          <input
            type='text'
            placeholder='SKU Number'
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
          />

          <ProductVariationsAttributes />

         
          <div className='product-img-container-admin d-flex justify-evenly w100'>
            <div className='featured-img-container d-flex flex-c  justify-center align-center'>
                <input
                 id="file"
                  type='file'
                  name='featuredImage'
                  className='d-none'
                  accept='image/*'
                  onChange={handleFileChange}
                />
                <label htmlFor="file" className="btn-1">Upload Featured Image</label>
                {formData.featuredImage && (
                  <div  className='d-flex g2 position-r'>
                  <img src={URL.createObjectURL(formData.featuredImage)} alt='Featured' className='featured-img-admin mw100' />
                  <button className='remove-img-btn position-a' onClick={handleImageRemove}>x</button>
                  </div>
                )}
            </div>
  
            <div className='featured-img-container d-flex flex-c justify-center align-center'>
                
                <input
                type="file"
                  id='file2'
                  name='thumbnailImages'
                  className='d-none'
                  accept='image/*'
                  multiple
                  onChange={handleFileChange}
                />
                <label htmlFor="file2" className="btn-1">Upload Thumbnails</label>
                <div className='thumbnail-img-container'>
                {formData.thumbnailImages && formData.thumbnailImages.map((image, index) => (
                  <div key={index} className='d-flex g2  position-r'>
                  <img  src={URL.createObjectURL(image)} alt={`Thumbnail ${index + 1}`} className='thumbnail-img-admin mw100'/>
                  <button  className='remove-img-btn position-a' onClick={()=>handleImageRemove(index)}>x</button>
                  </div>
                ))}
                </div>
            </div>
          </div>
          <button type='submit' className='form-btn'>
            Add Product
          </button>
        </form>
    )
}

export default ProductAddEditForm;