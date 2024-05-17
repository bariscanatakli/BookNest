import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI; // Replace with your MongoDB connection string

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

export default mongoose;

