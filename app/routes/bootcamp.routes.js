import express from 'express'
import * as bootcampController from '../controllers/bootcamp.controller.js'
import { verifyToken } from '../middleware/auth.js';

const router = express.Router()

router.post('/bootcamp', verifyToken, async (req, res) => {
  try {
    const newBootcamp = await bootcampController.createBootcamp(req.body);
    res.status(201).json(newBootcamp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/bootcamp/:bootcampId/user/:userId', verifyToken, async (req, res) => {
  try {
    const { userId, bootcampId } = req.params;
    await bootcampController.addUser(userId, bootcampId);
    res.status(200).json({ message: `Usuario con id ${userId} añadido al bootcamp con id ${bootcampId}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/bootcamp/:id',verifyToken, async (req, res) => {
  try {
    const bootcampId = req.params.id;
    const bootcamp = await bootcampController.findBootcampById(bootcampId);
    if (bootcamp) {
      res.status(200).json(bootcamp);
    } else {
      res.status(404).json({ message: `Bootcamp con id ${bootcampId} no encontrado` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/bootcamp', async (req, res) => {
  try {
    const bootcamps = await bootcampController.findAllBootcamps();
    res.status(200).json(bootcamps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
