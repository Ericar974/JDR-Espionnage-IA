import express, { Request, Response } from 'express';
import Game from '../../models/game';
import { GetApiError } from '../../api-schema/error';
import { GameSchema } from '../../api-schema/game';
import { UserSchema } from '../../api-schema/user';

const router = express.Router();

/**
 * GET route to get all games.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 * @returns {MissionSchema[]} Array of Game objects.
 */
router.get(
  '/getAll',
  async (req: Request, res: Response<GameSchema[] | GetApiError>) => {
    try {
      const games = await Game.findAll();
      res.json(games);
    } catch (error) {
      console.error('Error fetch games:', error);
      res.status(500).json({ message: 'Error fetch games.' });
    }
  }
);

/**
 * Route to create a new game.
 * Expects a body with 'users'.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 * @returns {GameSchema[]} Array of Mission objects.
 *
 */
router.post(
  '/create',
  async (
    req: Request<
      any,
      { gameId: string | null } | null | GetApiError,
      { user: UserSchema }
    >,
    res: Response<{ gameId: string | null } | null | GetApiError>
  ) => {
    try {
      const { user } = req.body; // Assuming 'users' is needed to create a game

      // Create a new game instance
      const game: GameSchema = await Game.create({
        gm: user,
        users: [],
        missions: [],
      });

      // If empty input
      if (!user) {
        return res.status(404).json({ message: 'Empty input' });
      }

      // Respond with the created game object
      res.json({
        gameId: game.id,
      });
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

      // If no game is found, respond with a 404
      if (!game) {
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

/**
 * Route to add a user to game by game UUID.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 * @returns {GameSchema[]} Array of Mission objects.
 */
router.put(
  '/:uuid/addUser',
  async (
    req: Request<
      any,
      string | null | GameSchema | GetApiError,
      { user: UserSchema }
    >,
    res: Response<string | null | GameSchema | GetApiError>
  ) => {
    try {
      const { uuid } = req.params;
      const { user } = req.body;

      // Find the game by its UUID
      const game = await Game.findOne({ where: { id: uuid } });

      // If no game is found, respond with a 404
      if (!game) {
        return res.status(404).json({ message: 'Game not found.' });
      }

      // If empty input
      if (!user || !user.id || !user.character) {
        return res.status(404).json({ message: 'Empty input' });
      }

      // Already user
      if (game.users.find((item) => item.id === user.id)) {
        return res.status(404).json({ message: 'User already registered.' });
      }

      // Update and save model to db
      game.users = [...game.users, user];
      await game.save();

      // Respond with the found game object
      res.json(game);
    } catch (error) {
      console.error('Error fetching game by UUID:', error);
      res.status(500).json({ message: 'Error fetching game by UUID.' });
    }
  }
);

/**
 * Route to get user games by user UUID.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 * @returns {GameSchema[]} Array of Mission objects.
 */
router.get(
  '/user/:uuid',
  async (req: Request, res: Response<GameSchema[] | GetApiError>) => {
    try {
      const { uuid } = req.params;

      // Get all games
      const games = await Game.findAll();

      // Filter games contain user (gm or simple user)
      games.filter((game) => {
        return (
          game.users?.find((item) => item.id === uuid) || game.gm.id === uuid
        );
      });

      res.json(games);
    } catch (error) {
      console.error('Error fetch games:', error);
      res.status(500).json({ message: 'Error fetch games.' });
    }
  }
);

export default router;
