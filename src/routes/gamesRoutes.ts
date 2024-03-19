import express from 'express';
import Game from '../models/game';

const router = express.Router();

/**
 * Route to create a new game.
 * Expects a body with 'usersId'.
 */
router.get('/create', async (req, res) => {
  try {
    const { usersId } = req.body; // Assuming 'usersId' is needed to create a game

    // Create a new game instance
    const game = await Game.create({ usersId });

    // Respond with the created game object
    res.json(game);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ message: 'Error creating game.' });
  }
});

/**
 * Route to retrieve a game by its UUID.
 */
router.get('/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;

    // Find the game by its UUID
    const game = await Game.findOne({ where: { uuid } });

    if (!game) {
      // If no game is found, respond with a 404
      return res.status(404).json({ message: 'Game not found.' });
    }

    // Respond with the found game object
    res.json(game);
  } catch (error) {
    console.error('Error fetching game by UUID:', error);
    res.status(500).json({ message: 'Error fetching game by UUID.' });
  }
});

export default router;
