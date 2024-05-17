// models/Book.js
import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  _id: Schema.Types.ObjectId, // MongoDB ObjectId for unique identifier
  bookId: Number,
  title: String,
  series: String,
  author: String,
  rating: Number,
  description: String,
  language: String,
  isbn: String,
  genres: [String], // Array of strings
  characters: [String], // Array of strings
  bookFormat: String,
  edition: String,
  pages: Number,
  publisher: String,
  publishDate: Date,
  awards: [String], // Array of strings
  numRatings: Number,
  ratingsByStars: [String], // Array of strings
  likedPercent: Number,
  setting: [String], // Array of strings
  coverImg: String,
  bbeScore: Number,
  bbeVotes: Number,
  price: Number
});

const Book = model('Book', bookSchema);

export default Book;