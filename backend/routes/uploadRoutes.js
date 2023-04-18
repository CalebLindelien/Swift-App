import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { isAdmin, isAuth } from '../utils.js';

// Create an instance of Multer
const upload = multer();

// Create an instance of the Express router
const uploadRouter = express.Router();

// Upload image to Cloudinary - ADMIN access only
uploadRouter.post(
  '/',
  isAuth,
  isAdmin,
  upload.single('file'), // Use multer middleware to handle single file upload
  async (req, res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Define a function to upload a file stream to Cloudinary
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    // Upload the file stream to Cloudinary and send the result back as the response
    const result = await streamUpload(req);
    res.send(result);
  }
);
export default uploadRouter;
