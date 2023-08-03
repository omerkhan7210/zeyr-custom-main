import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../Db/database.js';

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




//ADMIN REGISTER
export const AdminRegister = async (req, res) => {

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
    };
    
export const AdminLogin = async (req, res) => {
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
  
        // Generate a JWT token
        const token = jwt.sign({ email }, jwtSecret , { expiresIn: '2h' });
  
        res.cookie('token', token, { httpOnly: true });
  
        res.status(200).json({ message: 'Admin Login successful', token });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
    