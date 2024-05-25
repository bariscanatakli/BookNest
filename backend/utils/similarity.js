import pkg from 'natural';
const { TfIdf } = pkg;
import Book from '../models/Book.js';
// Load cache with precomputed features for all books
const cache = {};
export default async function loadCache() {
  try {
      console.log('Loading cache...');

      const allBooks = await Book.find({}, 'bookId genres description author rating');
      console.log('All books loaded:', allBooks.length);

      const bookFeatures = await precomputeFeatures(allBooks, cache);
      console.log("Book features loaded:", Object.keys(bookFeatures).length);

      Object.assign(cache, bookFeatures);
      console.log("Cache loaded:", Object.keys(cache).length);

      console.log('Cache loaded successfully');
  } catch (error) {
      console.error('Error loading cache:', error);
  }
}

await loadCache();
// Asynchronous feature extraction for a single book
async function extractFeatures(book) {
  const document = `${book.genres.join(' ')} ${book.description} ${book.author}`;
  if (!document.trim()) return {};

  const tfidf = new TfIdf();
  tfidf.addDocument(document);

  const features = {};
  tfidf.listTerms(0).forEach(term => {
    features[term.term] = term.tfidf;
  });

  return features;
}

// Asynchronously precompute features for all books with caching
export async function precomputeFeatures(allBooks) {
  try {
    const bookFeaturesPromises = allBooks.map(async book => {
      if (!book || !book._id) {
        return null; // Skip if book or book._id is null or undefined
      }

      if (cache[book._id]) {
        return { bookId: book._id, features: cache[book._id] };
      }

      const features = await extractFeatures(book);
      cache[book._id] = features;
      return { bookId: book._id, features };
    });

    const bookFeaturesArray = await Promise.all(bookFeaturesPromises);

    const bookFeatures = {};
    bookFeaturesArray
      .filter(bookFeature => bookFeature) // Filter out null or undefined book features
      .forEach(({ bookId, features }) => {
        bookFeatures[bookId] = features;
      });

    return bookFeatures;
  } catch (error) {
    console.error('Error precomputing features:', error);
    throw error; // Rethrow the error to propagate it
  }
}

// Compute cosine similarity
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0, magnitudeA = 0, magnitudeB = 0;

  for (const term in vecA) {
    const a = vecA[term] || 0;
    const b = vecB[term] || 0;
    dotProduct += a * b;
    magnitudeA += a * a;
    magnitudeB += b * b;
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
}

// Asynchronously get similarity scores for the target book
async function getSimilarityScores(targetBook, allBooks, similarityScore,) {
  const targetFeatures = await extractFeatures(targetBook);
  const allBookFeatures = await precomputeFeatures(allBooks);

  const scores = await Promise.all(allBooks.map(async book => {
    const similarity = cosineSimilarity(targetFeatures, allBookFeatures[book._id]);
    return { book, similarity };
  }));

  const filteredScores = scores.filter(({ similarity }) => similarity >= similarityScore);

  return filteredScores.sort((a, b) => b.similarity - a.similarity);
}

export { getSimilarityScores };