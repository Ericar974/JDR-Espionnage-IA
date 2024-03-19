import fs from 'fs';
import path from 'path';
import express, { Request, Response } from 'express';
import { GetApiError } from '../../api-schema/error.t';

const router = express.Router();

/**
 * GET route to get all character url images.
 *
 * This route asynchronously retrieves all image URLs from the characters directory
 * and returns them to the client.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 * @returns {Array<String>} Array of string image url.
 */
router.get(
  '/images',
  async (req: Request, res: Response<String[] | GetApiError>) => {
    // Define the directory path for character images
    const imagesDirectory = path.join(
      __dirname,
      '../../../public/images/characters'
    );

    // Read the directory contents
    fs.readdir(imagesDirectory, (err, files) => {
      if (err) {
        // Log and return an error message if reading the directory fails
        console.error('Error reading image directory:', err);
        return res
          .status(500)
          .json({ message: 'Error reading image directory.' });
      }

      // Filter the list to include only image files based on their extensions
      const imageFiles = files.filter((file) =>
        /\.(jpg|jpeg|png|gif)$/i.test(file)
      );

      // Construct URLs for each image file
      const urls = imageFiles.map(
        (file) =>
          `${req.protocol}://${req.get('host')}/images/characters/${file}`
      );

      // Return the list of image URLs to the client
      res.json(urls);
    });
  }
);

export default router;
