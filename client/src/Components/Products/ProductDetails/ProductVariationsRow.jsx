
import React, { useContext, useState } from "react";
import { ProductDetailsContext } from "../ProductDetailPage"; // Replace with your actual context import

const ProductVariationsRow = () => {
  const { product } = useContext(ProductDetailsContext);
  const [selectedVariation, setSelectedVariation] = useState(
    product.variations[0] // Set the default variation as the first one
  );

  const handleAttributeClick = (variation) => {
    setSelectedVariation(variation); // Update the selected variation when an attribute is clicked
  };

  return (
    <table>
      <tbody>
        {product.variations.map((variation) => (
          <tr key={variation.id}>
            <td className="label">
              <label>{variation.attributes[0].attributeValue}</label>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductVariationsRow;

