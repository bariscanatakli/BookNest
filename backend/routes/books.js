import { Router } from 'express';
import mongoose from 'mongoose';
const router = Router();
import Book from '../models/Book.js';

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().limit(50); // Find first 50 books
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving books' });
  }
});

// Search for books
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const regex = new RegExp(query, 'i');
    const books = await Book.find({
      $or: [
        { title: regex },
        { author: regex },
        { publisher: regex },
        { series: regex },
        // Add other fields you want to search here
      ]
    }).limit(20); // Limiting to 50 results for now
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error searching books' });
  }
});

// Get a book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving book' });
  }
});

// Create a new book
router.post('/', async (req, res) => {
  const bookData = req.body;
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    ...bookData,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating book', error: err.message });
  }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating book', error: err.message });
  }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting book' });
  }
});

export default router;
