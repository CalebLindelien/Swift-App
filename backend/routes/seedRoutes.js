import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

// Create an instance of the Express router
const seedRouter = express.Router();

// A GET request to this endpoint deletes all products and users from the database, then inserts new data from the `data.js` file
seedRouter.get('/', async (req, res) => {
  // Delete all products
  await Product.deleteMany({});

  // Insert new products from the `data.js` file
  const createdProducts = await Product.insertMany(data.products);

  // Delete all users
  await User.deleteMany({});

  // Insert new users from the `data.js` file
  const createdUsers = await User.insertMany(data.users);

  // Send a response with information about the created products and users
  res.send({ createdProducts, createdUsers });
});
export default seedRouter;
