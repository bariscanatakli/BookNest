// Create folders for models, routes and db
// Modify server.js to import modules from these folders

// server.js
import express from 'express';
import cors from 'cors'; // Import cors module
const app = express();
const port = process.env.PORT || 5000;

import './db.js';
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
 
// Import routes from routes folder
import userRoutes from './routes/users.js';
import bookRoutes from './routes/books.js';

// Use cors middleware to enable cross-origin requests
app.use(cors());

// Use routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


