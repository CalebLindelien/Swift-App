import express from 'express'; // Importing express for creating the server
import path from 'path'; // Importing path for handling file paths
import mongoose from 'mongoose'; // Importing mongoose for connecting to MongoDB
import dotenv from 'dotenv'; // Importing dotenv for managing environment variables
import seedRouter from './routes/seedRoutes.js'; // Importing seedRoutes for handling seed data
import productRouter from './routes/productRoutes.js'; // Importing productRoutes for handling product data
import userRouter from './routes/userRoutes.js'; // Importing userRoutes for handling user data
import orderRouter from './routes/orderRoutes.js'; // Importing orderRoutes for handling order data
import uploadRouter from './routes/uploadRoutes.js'; // Importing uploadRoutes for handling file uploads

dotenv.config(); // Loading environment variables from .env file

mongoose
  .connect(process.env.MONGODB_URI) // Connecting to MongoDB using the MONGODB_URI from environment variables
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express(); // Creating an instance of the express application

app.use(express.json()); // Parsing JSON requests
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded requests with extended option set to true

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb'); // Sending PayPal client ID from environment variables or 'sb' (sandbox) as response
});

app.use('/api/upload', uploadRouter); // Using uploadRouter for handling file upload routes
app.use('/api/seed', seedRouter); // Using seedRouter for handling seed data routes
app.use('/api/products', productRouter); // Using productRouter for handling product data routes
app.use('/api/users', userRouter); // Using userRouter for handling user data routes
app.use('/api/orders', orderRouter); // Using orderRouter for handling order data routes

const __dirname = path.resolve(); // Resolving the current directory path
app.use(express.static(path.join(__dirname, '/frontend/build'))); // Serving static files from frontend/build directory
app.get(
  '*',
  (req, res) => res.sendFile(path.join(__dirname, '/frontend/build/index.html')) // Sending index.html file for all other routes to support client-side routing in a SPA (Single Page Application)
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message }); // Error handling middleware to send error message as response with 500 status code
});

const port = process.env.PORT || 3001; // Setting the port for the server to listen on, using the PORT from environment variables or defaulting to 3001
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`); // Logging a success message with the server URL when the server starts listening
});
