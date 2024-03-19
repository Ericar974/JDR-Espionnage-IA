import express from 'express';
import Mission from '../models/mission';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const missions = await Mission.findAll();
    res.json(missions);
  } catch (error) {
    console.error('Error fetch missions:', error);
    res.status(500).json({ message: 'Error fetch missions.' });
  }
});

router.get('/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;
    const mission = await Mission.findOne({ where: { uuid } });

    if (!mission) {
      return res.status(404).json({ message: 'Mission not found.' });
    }

    res.json(mission);
  } catch (error) {
    console.error('Error fetching mission by UUID:', error);
    res.status(500).json({ message: 'Error fetching mission by UUID.' });
  }
});

export default router;
