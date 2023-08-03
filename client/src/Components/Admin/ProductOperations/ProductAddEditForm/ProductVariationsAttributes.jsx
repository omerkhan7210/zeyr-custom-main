import React, { useContext, useState } from "react";
import { AddProductAdminContext } from "../../../Context/AddProductContext";

const ProductVariationsAttributes = () => {
  const { formData, setFormData } = useContext(AddProductAdminContext)
  const [showColor, setShowColor] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const handleAddVariation = () => {
    if (showColor && color.trim() !== "") {
      setFormData({
        ...formData,
        variations: [
          ...formData.variations,
          {
            attributeValues: { color },
            price: 0,
            stock: 0,
          },
        ],
      });
      setColor("");
    }

    if (showSize && size.trim() !== "") {
      setFormData({
        ...formData,
        variations: [
          ...formData.variations,
          {
            attributeValues: { size },
            price: 0,
            stock: 0,
          },
        ],
      });
      setSize("");
    }
  };

  const handleRemoveVariation = (index) => {
    setFormData({
      ...formData,
      variations: [
        ...formData.variations.slice(0, index),
        ...formData.variations.slice(index + 1),
      ],
    });
  };

  return (
    <div className="d-flex g2 flex-c">
      <div className="d-flex g2 align-center">
        <h3>Attributes</h3>
        <div className="color-container d-flex flex-c g2">
            <label  className="form-control">
            <input
                type="checkbox"
                checked={showColor}
                onChange={() => setShowColor(!showColor)}
            />
            Show Color
            </label>
            {showColor && (
            <div>
                <h4>Color</h4>
                <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                />
                <button type="button" className="form-btn" onClick={handleAddVariation}>
                    Add Variation
                </button>
        </div>
          
        )}
        </div>

        <div className="color-container d-flex flex-c g2">
                <label  className="form-control">
                <input
                    type="checkbox"
                    checked={showSize}
                    onChange={() => setShowSize(!showSize)}
                />
                Show Size
                </label>
                {showSize && (
                <div>
                    <h4>Size</h4>
                    <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    />
                    <button type="button" className="form-btn" onClick={handleAddVariation}>
                        Add Variation
                    </button>
                </div>
                )}
        </div>
      </div>

    
      <div className="position-r">
        <h3>Variations</h3>
        {formData.variations.map((variation, index) => (
          <div key={index}>
            {showColor && (
              <p>
                Color: {variation.attributeValues.color}
              </p>
              
            )}
            {showSize && (
              <p>
                Size: {variation.attributeValues.size}
              </p>
            )}
            <button className="remove-img-btn position-a" onClick={() => handleRemoveVariation(index)}>
              x
            </button>
            <input
              type="number"
              value={variation.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  variations: [
                    ...formData.variations.slice(0, index),
                    { ...variation, price: e.target.value },
                    ...formData.variations.slice(index + 1),
                  ],
                })
              }
            />
            <input
              type="number"
              value={variation.stock}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  variations: [
                    ...formData.variations.slice(0, index),
                    { ...variation, stock: e.target.value },
                    ...formData.variations.slice(index + 1),
                  ],
                })
              }
            />
            
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductVariationsAttributes;
