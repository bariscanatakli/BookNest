import pkg from 'natural';
const { TfIdf } = pkg;
import { similarityCache } from './cache.js';

// Asynchronous feature extraction for a single book
async function extractFeatures(book) {
  // Check if genres is an array or convert to an empty array if undefined
  const genres = Array.isArray(book.genres) ? book.genres : [];

  const document = `${genres.join(' ')} ${book.description} ${book.author}`;
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

      if (similarityCache[book._id]) {
        return { bookId: book._id, features: similarityCache[book._id] };
      }

      const features = await extractFeatures(book);
      similarityCache[book._id] = features;
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

  const scores = allBooks.map(book => {
    const similarity = cosineSimilarity(targetFeatures, allBookFeatures[book._id]);
    return { book, similarity };
  });

  const filteredScores = scores.filter(({ similarity }) => similarity >= similarityScore);

  return filteredScores.sort((a, b) => b.similarity - a.similarity);
}

export { getSimilarityScores };