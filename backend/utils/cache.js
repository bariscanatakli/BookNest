import Book from '../models/Book.js';
import { precomputeFeatures } from '../utils/similarity.js';
// Load similarityCache with precomputed features for all books
export const similarityCache = {};

export const booksCache = [] 

async function fetchBooksBatch(offset, limit) {
  return await Book.find({})
    .select('bookId genres description author rating')
    .skip(offset)
    .limit(limit)
    .lean();
}

export async function loadSimilarityCache() {
  try {
    console.log('Loading similarityCache...');

    const batchSize = 3000; // Number of documents per batch
    const concurrentRequests = 20; // Number of concurrent requests

    // Calculate total number of documents
    const totalDocuments = await Book.countDocuments();

    // Array to store promises of each batch request
    const promises = [];
    let totalLoaded = 0;

    // Initiate concurrent requests
    for (let i = 0; i < concurrentRequests; i++) {
      const promise = (async () => {
        let offset = i * batchSize;
        let booksBatch = [];

        while (offset < totalDocuments) {
          const limit = Math.min(batchSize, totalDocuments - offset);
          const books = await fetchBooksBatch(offset, limit);
          if (books.length === 0) break;

          booksBatch = booksBatch.concat(books);
          totalLoaded += books.length;
          offset += concurrentRequests * batchSize; // Move to next batch for this worker

          console.log(`Worker ${i + 1}: Loaded ${books.length} books. Total loaded: ${totalLoaded}`);
        }

        return booksBatch;
      })();

      promises.push(promise);
    }

    // Wait for all promises to resolve
    const results = await Promise.all(promises);

    // Flatten the results into a single array of books
    const allBooks = results.flat();

    Object.assign(booksCache, allBooks);

    const bookFeatures = await precomputeFeatures(allBooks);
    console.log("Book features loaded:", Object.keys(bookFeatures).length);

    Object.assign(similarityCache, bookFeatures);
    console.log("similarityCache loaded:", Object.keys(similarityCache).length);

    console.log('similarityCache loaded successfully');
  } catch (error) {
    console.error('Error loading similarityCache:', error);
  }
}

