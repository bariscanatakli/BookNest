import { Router } from 'express';
import mongoose from 'mongoose';
const router = Router();
import Book from '../models/Book.js';
import { getSimilarityScores } from '../utils/similarity.js';
import {  booksCache } from '../utils/cache.js';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // const token = req.headers.authorization;
  // console.log(token)
  // if (!token) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.userId = decoded.userId;
  //   next();
  // } catch (error) {
  //   return res.status(403).json({ message: 'Invalid token' });
  // }
  next()
};

// Get all books
router.get('/',verifyToken, async (req, res) => {
  try {
    const books = await Book.find().limit(20); // Find first 50 books
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving books' });
  }
});

// Search for books
router.get('/search',verifyToken, async (req, res) => {
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
    }).limit(regex == "/(?:)/i" ? 500 : 52427); // Limiting to 20 results for now
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error searching books' });
  }
});
// Search for books
router.get('/searchStartWith',verifyToken, async (req, res) => {
  try {
    const { query } = req.query;
    const regex = new RegExp('^' + query, 'i');
   
    const books = await Book.find({
      $or: [
        { title: regex },
        // Add other fields you want to search here
      ]
    }).limit(52427); // Limiting to 20 results for now
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error searching books' });
  }
});

// Get a book by ID
router.get('/:bookId',verifyToken, async (req, res) => {
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
router.post('/',verifyToken, async (req, res) => {
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
router.put('/:id',verifyToken, async (req, res) => {
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
router.delete('/:id',verifyToken, async (req, res) => {
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


// Get recommendations for a book by ID
router.get('/recommendations/:bookId', verifyToken, async (req, res) => {
  const { bookId } = req.params;

  try {
    // Find the book by its ID
    const book = await Book.findOne({ bookId });
    if (!book) {
      return res.status(404).send('Book not found');
    }

    // Log the retrieved book for debugging
    console.log('Found book:', book);

    console.log(booksCache.length)

    // Filter similarityCache entries by rating
    const allBooks = booksCache.filter(entry => entry.rating  >= book.rating - 0.5);

    // Log the filtered books for debugging
    console.log('Filtered books from cache:', allBooks.length);

    // Get recommendations based on similarity scores
    const similarityScore = req.body.similarityScore || 0.5; // Set the similarity threshold here
    const recommendations = await getSimilarityScores(book, allBooks, similarityScore);

    // Log recommendations for debugging
    console.log('Recommendations:', recommendations);

    // If recommendations are empty, handle accordingly
    if (recommendations.length === 0) {
      return res.status(404).json({ message: 'No recommendations found' });
    }

    // Function to fetch full book details from MongoDB
    const getBooksByIds = async (ids) => {
      const books = await Book.find({ _id: { $in: ids } });
      return books.map(book => book.toObject()); // Convert Mongoose documents to plain JavaScript objects
    };

    // Fetch recommended books by their IDs
    const recommendedBookIds = recommendations.map(rec => rec.book._id);
    const recommendedBooks = await getBooksByIds(recommendedBookIds);

    res.json(recommendedBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
});


export default router;
