/**
 * Main Application File: app.js
 *
 * This file initializes the Express application, sets up middleware for JSON parsing and serving static files,
 * and defines the application's routes. It imports mission and game routes from separate files for better organization,
 * and includes a route for dynamically serving character images from a specified directory. Additionally, it listens
 * on a port defined in the environment variables for incoming connections. This file also triggers the database
 * synchronization and initial data setup for missions.
 */

import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import countries from './countries';

import sequelize from './sequelize';
import Mission from './models/mission';

// Import routes
import missionsRoutes from './routes/missionsRoutes';
import gamesRoutes from './routes/gamesRoutes';

/**
 * Create express instance
 */
const app = express();

/**
 * Setup project launch port
 */
const PORT: number = +(process.env.PORT ?? 3000);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Use the imported routes
app.use('/api/missions', missionsRoutes);
app.use('/api/games', gamesRoutes);

/**
 * GET route to get all character url images.
 *
 * This route asynchronously retrieves all image URLs from the characters directory
 * and returns them to the client.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 */
app.get('/api/character-images', async (req, res) => {
  // Define the directory path for character images
  const imagesDirectory = path.join(__dirname, '../public/images/characters');

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
      (file) => `${req.protocol}://${req.get('host')}/images/characters/${file}`
    );

    // Return the list of image URLs to the client
    res.json(urls);
  });
});

app.listen(PORT, () => {
  console.log(`server launch on http://localhost:${PORT}`);
});

// Generate Fixtures
sequelize.sync({ force: true }).then(() => {
  const currentDate = new Date();
  Mission.create({
    country: countries.FR,
    place: 'Eiffel Tower',
    date: currentDate.setTime(currentDate.getTime() + 24 * 3600 * 1000),
  });
});
