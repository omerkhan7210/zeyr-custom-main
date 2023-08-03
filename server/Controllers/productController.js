
import pool from '../Db/database.js';
// Function to create "addresses" table if it doesn't exist
async function createTable(query) {
  
  pool.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error creating "addresses" table:', error);
    } else {
    }
  });
}


export const InsertProducts = async (req, res) => {
      try {
    
        const queryTable4 = `CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          categories VARCHAR(255),
          sku VARCHAR(50),
          isOnSale BOOLEAN NOT NULL,
          isFeatured BOOLEAN NOT NULL,
          videos TEXT,
          shortDescription TEXT,
          longDescription TEXT,
          featuredImage VARCHAR(1000),
          productImages TEXT,
          status VARCHAR(100),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`
        createTable(queryTable4);
       
          const {
            name,
            price,
            categories,
            sku,
            isOnSale,
            isFeatured,
            videos,
            shortDescription,
            longDescription,
            status,
          } = req.body;
    
          // Save product data to the database
          const productData = {
            name,
            price,
            categories,
            sku,
            isOnSale: Boolean(isOnSale),
            isFeatured: Boolean(isFeatured),
            videos,
            shortDescription,
            longDescription,
            status
          };
    
          const insertProductQuery = "INSERT INTO products SET ?";
          pool.query(insertProductQuery, productData, async (error, productResult) => {
            if (error) {
              console.error("Error inserting product:", error);
              return res.status(500).json({ message: "Failed to create product" });
            }
    
            const productId = productResult.insertId;
            const variations = JSON.parse(req.body.variations);
    
            const insertVariationAttribute = (variationId, attributeId, attributeValue) => {
              const queryTable8 = `CREATE TABLE IF NOT EXISTS variation_attributes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                variationId INT NOT NULL,
                attributeId INT NOT NULL,
                attributeValue VARCHAR(255) NOT NULL,
                FOREIGN KEY (variationId) REFERENCES variations(id) ON DELETE CASCADE,
                FOREIGN KEY (attributeId) REFERENCES attributes(id) ON DELETE CASCADE
              );`;            
              createTable(queryTable8);
                      
              const insertVariationAttributeQuery =
                "INSERT INTO variation_attributes (variationId, attributeId, attributeValue) VALUES (?, ?, ?)";
              return new Promise((resolve, reject) => {
                pool.query(insertVariationAttributeQuery, [variationId, attributeId, attributeValue], (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                });
              });
            };
            
            const insertVariation = (productId, price, stock) => {
              const queryTable6 = `CREATE TABLE IF NOT EXISTS variations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                productId INT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                stock INT NOT NULL,
                FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
              );`;
              
              createTable(queryTable6);
  
              const insertVariationQuery = "INSERT INTO variations (productId, price, stock) VALUES (?, ?, ?)";
              return new Promise((resolve, reject) => {
                pool.query(insertVariationQuery, [productId, price, stock], (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result.insertId);
                  }
                });
              });
            };
            
            const insertAttribute = (productId, attributeType, attributeValue) => {
              const queryTable5 = `CREATE TABLE IF NOT EXISTS attributes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                productId INT NOT NULL,
                attributeType ENUM('color', 'size') NOT NULL, 
                attributeValue VARCHAR(255) NOT NULL,
                FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
              );
              `;
              
              createTable(queryTable5);
              const insertAttributeQuery = "INSERT INTO attributes (productId, attributeType, attributeValue) VALUES (?, ?, ?)";
              return new Promise((resolve, reject) => {
                pool.query(insertAttributeQuery, [productId, attributeType, attributeValue], (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result.insertId);
                  }
                });
              });
            };
            
            const processVariations = async (productId, variations) => {
              for (const variation of variations) {
                const { attributeValues, price, stock } = variation;
            
                // Determine the attributeType and attributeValue for the current variation
                let attributeType = null;
                let attributeValue = null;
                if (attributeValues.color) {
                  attributeType = "color";
                  attributeValue = attributeValues.color;
                } else if (attributeValues.size) {
                  attributeType = "size";
                  attributeValue = attributeValues.size;
                }
            
                let attributeId = null;
                let variationId = null;
            
                if (attributeType && attributeValue) {
                  // Insert the attribute and get the attributeId
                  try {
                    attributeId = await insertAttribute(productId, attributeType, attributeValue);
                  } catch (error) {
                    console.error("Error inserting attribute:", error);
                  }
                }
            
                // Insert the variation and get the variationId
                try {
                  variationId = await insertVariation(productId, price, stock);
                } catch (error) {
                  console.error("Error inserting variation:", error);
                }
                // Insert the variation attribute
                if (variationId && attributeId) {
                  try {
                    await insertVariationAttribute(variationId, attributeId, attributeValue);
                  } catch (error) {
                    console.error("Error inserting variation attribute:", error);
                  }
                }
              }
            };
  
            
    // Process the variations and insert into the database
    await processVariations(productId, variations);
            
            
            res.status(200).json({ message: "Product created successfully!" ,productId});
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Server error" });
        }
};

// POST /products/:productId/duplicate
export const DuplicateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch the product and its variations from the database
    pool.query('SELECT * FROM products WHERE id = ?', [productId], async (error, productData) => {
      if (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Failed to fetch products" });
      }

      if (!productData.length) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Duplicate the product
      const duplicatedProductData = { ...productData[0] };
      duplicatedProductData.name = `${duplicatedProductData.name} (copy)`;
      delete duplicatedProductData.id;

      // Save the duplicated product to the database
      pool.query('INSERT INTO products SET ?', duplicatedProductData,(err,duplicatedProductResult)=>{

      
      const duplicatedProductId = duplicatedProductResult.insertId;

      // Fetch the attributes associated with the original product
      pool.query('SELECT * FROM attributes WHERE productId = ?', [productId], async (err, attributes) => {
        // Duplicate each attribute and associate it with the duplicated product
        attributes.map(async (attribute) => {
          const { attributeType, attributeValue } = attribute;

          // Duplicate the attribute
          const duplicatedAttributeData = {
            productId: duplicatedProductId,
            attributeType,
            attributeValue,
          };
          delete duplicatedAttributeData.id;

          // Save the duplicated attribute to the database
          pool.query('INSERT INTO attributes SET ?', duplicatedAttributeData, (err, duplicatedAttributeResult) => {
            const duplicatedAttributeId = duplicatedAttributeResult.insertId;

            // Fetch the associated variation and attribute data
            pool.query('SELECT * FROM variation_attributes WHERE attributeId = ?', [attribute.id], (err,variationAttributes) => {


              // Duplicate each variation attribute and associate it with the duplicated attribute
              variationAttributes.map(async (variationAttribute) => {
                const { variationId, attributeValue } = variationAttribute;

                // Duplicate the variation attribute
                const duplicatedVariationAttributeData = {
                  variationId: variationId,
                  attributeId: duplicatedAttributeId,
                  attributeValue,
                };
                delete duplicatedVariationAttributeData.id;

                // Save the duplicated variation attribute to the database
                pool.query('INSERT INTO variation_attributes SET ?', duplicatedVariationAttributeData);

              });
            });
          });

        });

        // Fetch the variations associated with the original product
        pool.query('SELECT * FROM variations WHERE productId = ?', [productId], async (err, variations) => {
          // Duplicate each variation and associate it with the duplicated product
          variations.map(async (variation) => {
            const { price, stock } = variation;

            // Duplicate the variation
            const duplicatedVariationData = {
              productId: duplicatedProductId,
              price,
              stock,
            };
            delete duplicatedVariationData.id;

            // Save the duplicated variation to the database
            pool.query('INSERT INTO variations SET ?', duplicatedVariationData,(err,duplicatedVariationResult)=>{
              const duplicatedVariationId = duplicatedVariationResult.insertId;

              // Fetch the associated variation attributes from the database
              pool.query('SELECT * FROM variation_attributes WHERE variationId = ?', [variation.id],(err,variationAttributes)=>{
                  // Duplicate each variation attribute and associate it with the duplicated variation
                  variationAttributes.map(async (attribute) => {
                    const { attributeId, attributeValue } = attribute;

                    // Duplicate the variation attribute
                    const duplicatedAttributeData = {
                      variationId: duplicatedVariationId,
                      attributeId,
                      attributeValue,
                    };
                    delete duplicatedAttributeData.id;

                    // Save the duplicated attribute to the database
                    pool.query('INSERT INTO variation_attributes SET ?', duplicatedAttributeData);
                  });

              });
            });
          });


          res.status(200).json({ message: 'Product duplicated successfully!', productId: duplicatedProductId });
        });
      });
    });
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


 export const UploadImages =  (req,res)=>{
    try{
      const productId = req.params.productId; // Get the productId from the URL parameter
  
          // Save image filenames to the database or file system
          if (req.files["featuredImage"]) {
            const featuredImageFilename = req.files["featuredImage"][0].filename;
            // Save the filename to the database for the product's featured image
            const updateFeaturedImageQuery =
              "UPDATE products SET featuredImage = ? WHERE id = ?";
            pool.query(
              updateFeaturedImageQuery,
              [featuredImageFilename, productId],
              (error) => {
                if (error) {
                  console.error("Error updating featured image:", error);
                }
              }
            );
          }
  
          if (req.files["thumbnailImages"]) {
            const thumbnailImageFilenames = req.files["thumbnailImages"].map(
              (file) => file.filename
            );
  
            // Serialize the thumbnailImageFilenames array to a string
            const serializedFilenames = JSON.stringify(thumbnailImageFilenames);
  
            // Save the serialized filenames to the database for the product's thumbnail images
            const updateThumbnailImagesQuery =
              "UPDATE products SET productImages = ? WHERE id = ?";
            pool.query(
              updateThumbnailImagesQuery,
              [serializedFilenames, productId],
              (error) => {
                if (error) {
                  console.error("Error inserting thumbnail images:", error);
                }
              }
            );
          }
    }catch(error){
      console.log(error)
    }
};
    
export const GetProducts = (req, res) => {
    // Query to fetch all products from the database
    const getAllProductsQuery = "SELECT * FROM products";
    pool.query(getAllProductsQuery, (error, productsResult) => {
      if (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Failed to fetch products" });
      }
  
      // Fetch variations and attributes for each product
      const fetchProductDetails = (product) => {
        return new Promise((resolve, reject) => {
          const productId = product.id;
  
          // Query to fetch variations for the product
          const getVariationsQuery = "SELECT * FROM variations WHERE productId = ?";
          pool.query(getVariationsQuery, [productId], (error, variationsResult) => {
            if (error) {
              reject(error);
            }
  
            // Attach variations to the product object
            product.variations = variationsResult;
  
            // Fetch attributes for each variation
            const getAttributesQuery =
              "SELECT * FROM variation_attributes WHERE variationId = ?";
            const fetchAttributes = (variation) => {
              return new Promise((resolve, reject) => {
                pool.query(getAttributesQuery, [variation.id], (error, attributesResult) => {
                  if (error) {
                    reject(error);
                  }
                  variation.attributes = attributesResult;
                  resolve(variation);
                });
              });
            };
  
            // Use Promise.all to fetch attributes for all variations in parallel
            Promise.all(variationsResult.map(fetchAttributes))
              .then((variationsWithAttributes) => {
                // Replace variationsResult with the variationsWithAttributes array
                product.variations = variationsWithAttributes;
                resolve(product);
              })
              .catch((error) => {
                console.error("Error fetching variation attributes:", error);
                reject(error);
              });
          });
        });
      };
  
      // Use Promise.all to fetch product details for all products in parallel
      Promise.all(productsResult.map(fetchProductDetails))
        .then((productsWithDetails) => {
          res.status(200).json(productsWithDetails);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
          res.status(500).json({ message: "Failed to fetch product details" });
        });
    });
};
  
   
export const GetAProduct = (req, res) => {
    const productId = req.params.productId;
  
    // Query to fetch product details by productId
    const getProductQuery = "SELECT * FROM products WHERE id = ?";
    pool.query(getProductQuery, [productId], (error, productResult) => {
      if (error) {
        console.error("Error fetching product details:", error);
        return res.status(500).json({ message: "Failed to fetch product details" });
      }
  
      if (productResult.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const product = productResult[0];
  
      // Query to fetch variations for the product
      const getVariationsQuery = "SELECT * FROM variations WHERE productId = ?";
      pool.query(getVariationsQuery, [productId], (error, variationsResult) => {
        if (error) {
          console.error("Error fetching variations:", error);
          return res.status(500).json({ message: "Failed to fetch variations" });
        }
  
        // Attach variations to the product object
        product.variations = variationsResult;
  
        // Fetch attributes for each variation
        const getAttributesQuery =
          "SELECT * FROM variation_attributes WHERE variationId = ?";
        const fetchAttributes = (variation) => {
          return new Promise((resolve, reject) => {
            pool.query(getAttributesQuery, [variation.id], (error, attributesResult) => {
              if (error) {
                reject(error);
              }
              variation.attributes = attributesResult;
              resolve(variation);
            });
          });
        };
          // Fetch attribute type for each variation
          const getAttributesTypeQuery =
          "SELECT * FROM attributes WHERE productId = ?";
          const fetchAttributeType = (variation) => {
          return new Promise((resolve, reject) => {
            pool.query(getAttributesTypeQuery, [productId], (error, attributeTypeResult) => {
              if (error) {
                reject(error);
              }
              product.attributes = attributeTypeResult;
              resolve(variation);
            });
          });
          };
  
          // Use Promise.all to fetch attributes and attribute types for all variations in parallel
          Promise.all(variationsResult.map(fetchAttributes))
          .then((variationsWithAttributes) => {
            // Replace variationsResult with the variationsWithAttributes array
            product.variations = variationsWithAttributes;
            return Promise.all(variationsWithAttributes.map(fetchAttributeType));
          })
          .then((variationsWithAttributeTypes) => {
            // Replace variationsResult with the variationsWithAttributeTypes array
            product.variations = variationsWithAttributeTypes;
            res.status(200).json({ product });
          })
          .catch((error) => {
            console.error("Error fetching variation attributes:", error);
            res.status(500).json({ message: "Failed to fetch variation attributes" });
          });
      });
    });
};
  
  