import express, { Request, Response } from 'express';
import Mission from '../../models/mission';
import {MissionSchema} from "../../api-schema/mission.t";
import {GetApiError} from "../../api-schema/error.t";

const router = express.Router();

/**
 * GET route to get all missions.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 * @returns {MissionSchema[]} Array of Mission objects.
 */
router.get(
  '/',
  async (req: Request, res: Response<MissionSchema[] | GetApiError>) => {
    try {
      const missions = await Mission.findAll();
      res.json(missions);
    } catch (error) {
      console.error('Error fetch missions:', error);
      res.status(500).json({ message: 'Error fetch missions.' });
    }
  }
);

/**
 * GET route to get mission by UUID.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 * @returns {MissionSchema} Mission object.
 */
router.get(
  '/:uuid',
  async (req: Request, res: Response<MissionSchema | GetApiError>) => {
    try {
      const { uuid } = req.params;
      const mission = await Mission.findOne({ where: { id: uuid } });

      if (!mission) {
        return res.status(404).json({ message: 'Mission not found.' });
      }

      res.json(mission);
    } catch (error) {
      console.error('Error fetching mission by UUID:', error);
      res.status(500).json({ message: 'Error fetching mission by UUID.' });
    }
  }
);

export default router;
