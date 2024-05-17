// models/User.js
import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 7
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving to database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});

// Compare provided password with hashed password in database
userSchema.methods.matchPassword = async function (providedPassword) {
  return await bcrypt.compare(providedPassword, this.password);
};

const User = model('User', userSchema);

export default User;
