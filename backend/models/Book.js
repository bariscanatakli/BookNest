// models/Book.js
import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  bookId: Number,
  title: String,
  series: String,
  author: String,
  rating: Number,
  description: String,
  language: String,
  isbn: String,
  genres: [String],
  characters: [String],
  bookFormat: String,
  edition: String,
  pages: Number,
  publisher: String,
  publishDate: Date,
  awards: [String],
  numRatings: Number,
  ratingsByStars: [String],
  likedPercent: Number,
  setting: [String],
  coverImg: String,
  bbeScore: Number,
  bbeVotes: Number,
  price: Number
}, { collection: 'books' }); // Ensure the collection name is 'books'

const Book = model('Book', bookSchema);

export default Book;
