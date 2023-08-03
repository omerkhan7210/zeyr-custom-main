

import pool from '../Db/database.js';
import jwt from 'jsonwebtoken';

// JWT secret key
const jwtSecret = 'secret-key';

// Function to create "addresses" table if it doesn't exist
async function createTable(query) {
  
  pool.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error creating "addresses" table:', error);
    } else {
    }
  });
}

  // Route for fetching user account details
  export const UserAccountDetails = async (req, res) => {
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
  };
  
  
  // Route for saving an address for the logged-in user
  export const CreateAddress = async (req, res) => {
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
  };
  
  // Route for fetching addresses for the logged-in user
  export const RetrieveAddress = async (req, res) => {
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
  };
  
  // Delete an address
  export const DeleteAddress = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Delete the address from the database using the address ID
      pool.query('DELETE FROM addresses WHERE id = ?', [id]);
  
      res.json({ message: 'Address deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Edit an address
  export const EditAddress = async (req, res) => {
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
  };
  
  // Set an address as the default address
  export const addressSetDefault = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Set the specified address as the default address by updating the 'isDefault' property
      pool.query('UPDATE addresses SET isDefault = 1 WHERE id = ?', [id]);
  
      res.json({ message: 'Address set as default successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
