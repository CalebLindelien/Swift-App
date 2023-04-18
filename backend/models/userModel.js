import mongoose from 'mongoose';

// This defines the schema for a user
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

export default User;
