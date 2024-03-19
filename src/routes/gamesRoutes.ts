import express, { Request, Response } from 'express';
import { GetApiError } from '../api-schema/error.t';
import { GameSchema } from '../api-schema/game.t';
import Game from '../models/game';

const router = express.Router();

/**
 * Route to create a new game.
 * Expects a body with 'usersId'.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 * @returns {GameSchema[]} Array of Mission objects.
 */
router.get(
  '/create',
  async (req: Request, res: Response<GameSchema | GetApiError>) => {
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
  }
);

/**
 * Route to retrieve a game by its UUID.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 * @returns {GameSchema[]} Array of Mission objects.
 */
router.get(
  '/:uuid',
  async (req: Request, res: Response<GameSchema | GetApiError>) => {
    try {
      const { uuid } = req.params;

      // Find the game by its UUID
      const game = await Game.findOne({ where: { id: uuid } });

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
  }
);

export default router;
