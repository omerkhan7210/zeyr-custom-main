import express from 'express';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();

// Enable CORS
app.use(cors());


// Middleware for parsing JSON
app.use(express.json());


const users = []; // Simulated user database (replace with a real database)

// Route for user registration
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username is already taken
    if (users.find((user) => user.username === username)) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Store the user in the database
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route for user login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, 'secret-key');

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});


