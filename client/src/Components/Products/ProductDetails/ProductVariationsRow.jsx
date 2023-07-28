
import React, { useContext, useState } from "react";
import { ProductDetailsContext } from "../ProductDetailPage"; // Replace with your actual context import

const ProductVariationsRow = ({setSelectedVariations}) => {
  const { product } = useContext(ProductDetailsContext);
  
   // Group variations based on attribute types (color and size)
   const variationsByAttributeType = product.variations.reduce((acc, variation) => {
    const attributeType = product.attributes.find(
      (attr) => attr.id === variation.attributes[0].attributeId
    ).attributeType;

    if (!acc[attributeType]) {
      acc[attributeType] = [];
    }

    acc[attributeType].push(variation);
    return acc;
  }, {});

  // Function to handle selection change in dropdown
  const handleSelectChange = (attributeType, event) => {
    setSelectedVariations((prevSelected) => ({
      ...prevSelected,
      [attributeType]: event.target.value,
    }));
  };


  return (
      
          <div style={{borderBottom:'1px solid grey'}}>
      {Object.entries(variationsByAttributeType).map(([attributeType, variations]) => (
        <div key={attributeType} className="d-flex justify-between align-center">
          <p>{attributeType.toUpperCase()}</p>
          <select onChange={(e) => handleSelectChange(attributeType, e)}>
            <option defaultValue={null}>Choose an option</option>
            {variations.map((variation) => (
              <option key={variation.id} value={variation.id} >
                {variation.attributes[0].attributeValue}
              </option>
            ))}
          </select>
        </div>
      ))}

     
    </div>

  );
};

export default ProductVariationsRow;

