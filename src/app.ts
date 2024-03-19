import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import countries from './countries';

import sequelize from './sequelize';
import Mission from './models/mission';
import Game from './models/game';

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

/**
 * GET route to retrieve missions.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 */
app.get('/api/missions', async (req, res) => {
  try {
    // Find all missions in database
    const missions = await Mission.findAll();
    res.json(missions);
  } catch (error) {
    // Log the error in case the request fails and return a 500 error message.
    console.error('Error fetch missions :', error);
    res.status(500).json({
      message: 'Error fetch missions.',
    });
  }
});

/**
 * GET route to retrieve a mission by its UUID.
 *
 * @param {string} uuid '/missions/:uuid' - The path of the route with 'uuid' as a parameter.
 * @param {Function} async (req, res) - The asynchronous route handler function.
 */
app.get('/api/missions/:uuid', async (req, res) => {
  try {
    // Extract the UUID from the route parameters.
    const { uuid } = req.params;

    // Search for the mission by its UUID in the database.
    const mission = await Mission.findOne({
      where: {
        uuid,
      },
    });

    // If the mission is not found, return a 404 error message.
    if (!mission) {
      return res.status(404).json({
        message: 'Mission not found.',
      });
    }

    // If the mission is found, return the mission to the client.
    res.json(mission);
  } catch (error) {
    // Log the error in case the request fails and return a 500 error message.
    console.error('Error fetching mission by UUID:', error);
    res.status(500).json({
      message: 'Error fetching mission by UUID.',
    });
  }
});

/**
 * GET route to create a game
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 */
app.get('/api/game/create', async (req, res) => {
  const body = req.body;

  const usersId = body.usersId;

  const game = await Game.create({
    usersId,
  });
  res.json(game);
});

/**
 * GET route to get a game by its UUID.
 *
 * @param {string} uuid '/game/:uuid' - The path of the route with 'uuid' as a parameter.
 * @param {Function} async (req, res) - The asynchronous route handler function.
 */
app.get('/api/game/:uuid', async (req, res) => {
  try {
    // Extract the UUID from the route parameters.
    const { uuid } = req.params;

    // Search for the game by its UUID in the database.
    const game = await Game.findOne({
      where: {
        uuid,
      },
    });

    // If the game is not found, return a 404 error message.
    if (!game) {
      return res.status(404).json({
        message: 'Game not found.',
      });
    }

    // If the game is found, return the game to the client.
    res.json(game);
  } catch (error) {
    // Log the error in case the request fails and return a 500 error message.
    console.error('Error fetching game by UUID:', error);
    res.status(500).json({
      message: 'Error fetching game by UUID.',
    });
  }
});

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
