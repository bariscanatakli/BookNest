import { Router } from 'express';
import mongoose from 'mongoose';
const router = Router();
import Book from '../models/Book.js';
import { getSimilarityScores } from '../utils/similarity.js';

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().limit(500); // Find first 50 books
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
    }).limit(); // Limiting to 20 results for now
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error searching books' });
  }
});

// Get a book by ID
router.get('/:bookId', async (req, res) => {
  try {
    const book = await Book.findOne({ bookId: req.params.bookId });
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


router.get('/recommendations/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findOne({ bookId });
  const similarityScore = req.body.similarityScore || 0.5; // Set the similarity threshold here
  if (!book) {
    return res.status(404).send('Book not found');
  }

  // Fetch only necessary fields and filter books by rating
  const allBooks = await Book.find(
    { rating: { $gte: book.rating } },
    'bookId genres description author rating' // Only select necessary fields
  );

  const recommendations = await getSimilarityScores(book, allBooks, similarityScore);
  const recommendedBookIds = recommendations.map(rec => rec.book._id);
  const getBooksByIds = async (ids) => {
    const books = await Book.find({ _id: { $in: ids } });
    return books.map(book => book.toObject());
  }
  const recommendedBooks = await getBooksByIds(recommendedBookIds);
  res.json(recommendedBooks);
});


export default router;
