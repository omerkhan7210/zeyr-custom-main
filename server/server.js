import express from 'express';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import mysql from 'mysql';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads/'));


// MySQL connection pool configuration
const pool = mysql.createPool({
  host: 'localhost', // Update with your MySQL server host
  user: 'zeyr', // Update with your MySQL username
  password: '', // Update with your MySQL password
  database: 'zeyr-custom', // Update with your MySQL database name
});

// Function to create "addresses" table if it doesn't exist
async function createTable(query) {
  
  pool.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error creating "addresses" table:', error);
    } else {
    }
  });
}

// JWT secret key
const jwtSecret = 'secret-key';
const hostLink = "https://zeyrcustom.noorularfeen.com" 

// Generate a random 4-digit OTP code
function generateOTP() {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
}

// Store the OTP codes for verification
const otpCodes = {};


function sendOtpCodeToEmail(email,otpCode,subj,htmlEmailTemplate){
  
   const mailOptions = {
    from: 'omerfarooqkhan7210@gmail.com', // Update with your email
    to: email,
    subject: subj,
    html: htmlEmailTemplate,
  };

  // Create a transporter object with your Gmail account details
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'omerfarooqkhan7210@gmail.com', // Your Gmail email address
pass: 'eaermqekncdsjnsn', // Your Gmail password or app-specific password
},
});

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send password reset email' });
    }

    res.status(200).json({ message: 'Password reset email sent' });
  });
}

// Route for user signup
app.post('/signup', async (req, res) => {
  try {
    const { fname, email } = req.body;

    // Check if email is already taken
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

      // Check if email already exists
      if (results.length > 0) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      // Generate OTP code (4-digit code)
      const otpCode = generateOTP();

      // Store the OTP code in a temporary object
      otpCodes[email] = otpCode;

      const emailHtml = `
  <div style="  width:100%; display:block;">
  <h1 style="text-align: center; color: black; font-family: Arial, sans-serif; font-size: 24px;margin:0 0 10px 0;">ZEYR FINERI</h1>
    <h3 style="text-align: center; color: black; font-family: Arial, sans-serif; font-size: 20px; margin:0;">ACCOUNT CONFIRMATION</h3>

  <div style="margin-top: 20px; display:block; text-align:center;">
    <p style="color: white; font-family: Arial, sans-serif; font-size: 13px; text-align:center;">
      Hi ${fname}!
      <br> 
      Welcome, your customer account is now active! The next time you shop with us, you can save time at checkout by logging into your account.<br>
      Your OTP Code for account verification is ${otpCode}
    </p>

    <a href="${hostLink}/shop" style="color: white; text-decoration: none; font-family: Arial, sans-serif; font-size: 16px; background:black;padding:0.7rem 2rem;">Shop Now</a>
      
    <p>Thank You,<br>ZEYR FINERI</p>
    <br>
    <ul style="list-style-type: none; padding-left: 0; display:flex;>
       
      <li style="margin-right: 10px; border-right:1px solid grey;">
        <a href="${hostLink}/contact" style=" color: black; text-decoration: none; font-family: Arial, sans-serif; serif;  font-size: 16px;">CONTACT US</a>
      </li>
      <li style="margin-right: 10px; border-right:1px solid grey;">
        <a href="${hostLink}/shipping-returns" style=" color: black; text-decoration: none; font-family: Arial, sans-serif;  font-size: 16px;">SHIPPING & RETURNS</a>
      </li>
      <li>
        <a href="${hostLink}/careers" style=" color: black; text-decoration: none; font-family: Arial, sans-serif; font-size: 16px; ">CAREERS</a>
      </li>
    </ul>
  </div>
</div>
`;
      // Send the OTP code to the user's email (using your preferred email sending method/library)
      sendOtpCodeToEmail(email, otpCode,"Customer Account Confirmation",emailHtml); // Replace with your email sending logic
      return res.status(201).json({ message: 'Success', otpCode });
     

     
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route for verifying OTP
app.post('/verify-otp', async (req, res) => {
  try {
    const { fname,lname,email,password, otpCode } = req.body;
    
    // Check if the OTP code is valid for the given email
    if (otpCodes[email] === otpCode) {
      // Clear the OTP code from temporary storage
      delete otpCodes[email];

       // Hash the password
      const hashedPassword = await hash(password, 10);
       // Insert the user into the database
       pool.query(
        'INSERT INTO users (fname, lname, email, password) VALUES (?, ?, ?, ?)',
        [fname, lname, email, hashedPassword],
        (error) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
          }
          
        }
      );

      // Generate JWT token
      const token = jwt.sign({ email }, jwtSecret , { expiresIn: '2h' });

      return res.status(200).json({ message: 'OTP verification successful', token });
    } else {
      return res.status(400).json({ message: 'Invalid OTP code' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route for user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

      // Check if user exists
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const user = results[0];
      // Compare the password
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ email }, jwtSecret , { expiresIn: '2h' });

      res.cookie('token', token, { httpOnly: true });

      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route for password reset
app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

     // Generate OTP code
     const otpCode = generateOTP();

     // Store the OTP code for verification
     otpCodes[email] = otpCode;
 

    // Find the user in the database
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

      // Check if user exists
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];
      const resetToken = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });

      res.cookie('token', resetToken, { httpOnly: true });

      const emailHtml = `<div style="background-color: black; padding: 20px;">
  <h1 style="text-align: center; color: white; font-family: Arial, sans-serif; font-size: 24px;">Your Brand</h1>
  <div style="margin-top: 20px;">
    <p style="color: white; font-family: Arial, sans-serif; font-size: 16px;">
      Hello there! You have requested to reset your password.
      Please click on one of the following links to proceed:
    </p>
    <ul style="list-style-type: none; padding-left: 0;">
      <li style="margin-bottom: 10px;">
        <a href="#" style="color: white; text-decoration: none; font-family: Arial, sans-serif; font-size: 16px;">Reset Password</a>
      </li>
      <li style="margin-bottom: 10px;">
        <a href="#" style="color: white; text-decoration: none; font-family: Arial, sans-serif; font-size: 16px;">Update Account Details</a>
      </li>
      <li>
        <a href="#" style="color: white; text-decoration: none; font-family: Arial, sans-serif; font-size: 16px;">Contact Support</a>
      </li>
    </ul>
  </div>
</div>
`
      sendOtpCodeToEmail(email, otpCode,"Password Reset",emailHtml); // Replace with your email sending logic
      
     
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route for verifying OTP code and resetting password
app.post('/reset-password', async (req, res) => {
  try {
    const { email, otpCode, newPassword } = req.body;

    // Verify OTP code
    if (otpCodes[email] !== otpCode) {
      return res.status(400).json({ message: 'Invalid OTP code' });
    }

    // Find the user in the database
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

      // Check if user exists
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Hash the new password
      const hashedPassword = await hash(newPassword, 10);

      // Update the user's password in the database
      pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
        }

        // Clear the OTP code after successful verification
        delete otpCodes[email];

        res.status(200).json({ message: 'Password reset successful' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route for fetching user account details
app.get('/account-details', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the JWT token from the authorization header

    // Verify the JWT token and extract the user information
    const decoded = jwt.verify(token, jwtSecret);

    // Assuming you have a 'users' table in your MySQL database
    // Replace this query with your own logic to fetch the user account details
    const query = 'SELECT fname , lname , email FROM users WHERE email = ?';
    pool.query(query, [decoded.email], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];
      res.status(200).json({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
});


// Route for saving an address for the logged-in user
app.post('/address', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the JWT token from the authorization header

    // Verify the JWT token and extract the user information
    const decoded = jwt.verify(token, jwtSecret);

    // Get the address data from the request body
    const { firstName, lastName,company, addressLine1, addressLine2, city, country, zipCode,phone } = req.body;
    const queryTable = `
    CREATE TABLE IF NOT EXISTS addresses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(50) NOT NULL,
      firstName VARCHAR(50) NOT NULL,
      lastName VARCHAR(50) NOT NULL,
      company VARCHAR(50) NOT NULL,
      addressLine1 VARCHAR(255) NOT NULL,
      addressLine2 VARCHAR(255),
      city VARCHAR(50) NOT NULL,
      country VARCHAR(50) NOT NULL,
      zipCode VARCHAR(10) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      isDefault BOOLEAN DEFAULT false -- Add the 'isDefault' column
      )
  `;
    createTable(queryTable);
    const query = 'INSERT INTO addresses (email, firstName, lastName,company, addressLine1, addressLine2, city,country, zipCode,phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)';
    pool.query(query, [decoded.email, firstName, lastName,company, addressLine1, addressLine2, city, country, zipCode,phone], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

      // Return the newly added address data
      const newAddress = {
        _id: results.insertId,
        firstName,
        lastName,
        company,
        addressLine1,
        addressLine2,
        city,
        country,
        zipCode,
        phone
      };

      res.status(201).json({ message: 'Address added successfully', address: newAddress });
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Route for fetching addresses for the logged-in user
app.get('/retrieve-address', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the JWT token from the authorization header

    // Verify the JWT token and extract the user information
    const decoded = jwt.verify(token, jwtSecret);

    // Assuming you have a 'addresses' table in your MySQL database
    // Replace this query with your own logic to fetch the user's addresses
    const query = 'SELECT * FROM addresses WHERE email = ?';
    pool.query(query, [decoded.email, decoded.firstName], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

      res.status(200).json({ addresses: results });
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Delete an address
app.delete('/address/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the address from the database using the address ID
    pool.query('DELETE FROM addresses WHERE id = ?', [id]);

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit an address
app.put('/address/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAddress = req.body;

    // Update the address in the database using the address ID and the updated data
    pool.query('UPDATE addresses SET ? WHERE id = ?', [updatedAddress, id]);

    res.json({ message: 'Address updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Set an address as the default address
app.put('/address/:id/set-default', async (req, res) => {
  try {
    const { id } = req.params;

    // Set the specified address as the default address by updating the 'isDefault' property
    pool.query('UPDATE addresses SET isDefault = 1 WHERE id = ?', [id]);

    res.json({ message: 'Address set as default successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


//ADMIN REGISTER
app.post('/admin/register', async (req, res) => {

const queryTable3 = `CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
`
createTable(queryTable3);

  try {
    const { email, password } = req.body;

    // Check if the admin already exists
    const adminExists = pool.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (adminExists.length > 0) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    // Save admin details to the database
    pool.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashedPassword]);

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//ADMIN LOGIN
app.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    pool.query('SELECT * FROM admins WHERE email = ?', [email], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

      // Check if user exists
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const user = results[0];
      // Compare the password
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '4h' });

    res.status(200).json({ message: 'Admin login successful', token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post(
  "/products",
  async (req, res) => {
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
    }
  );

  
// Create a storage engine to save the uploaded files to the server's file system
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using the current timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

  app.post('/upload-images:productId',
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "thumbnailImages", maxCount: 10 },
  ]),
  (req,res)=>{
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
  })
  


// Assuming you have already set up your Express server and database connection
// Endpoint to get all products
app.get("/products", (req, res) => {
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
});



// Endpoint to get product details by productId
app.get("/products/:productId", (req, res) => {
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

      // Use Promise.all to fetch attributes for all variations in parallel
      Promise.all(variationsResult.map(fetchAttributes))
        .then((variationsWithAttributes) => {
          // Replace variationsResult with the variationsWithAttributes array
          product.variations = variationsWithAttributes;
          res.status(200).json({ product });
        })
        .catch((error) => {
          console.error("Error fetching variation attributes:", error);
          res.status(500).json({ message: "Failed to fetch variation attributes" });
        });
    });
  });
});



// Start the server
app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
